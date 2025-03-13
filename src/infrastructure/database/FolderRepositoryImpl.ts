import { PrismaClient } from "@prisma/client";
import type { FolderRepository } from "../../core/interfaces/FolderRepository";
import { Folder } from "../../core/models/Folder";
import type { FileRepository } from "../../core/interfaces/FileRepository";
import { RootsNavigation } from "../../core/models/RootsNavigation";

const prisma = new PrismaClient();

export class FolderRepositoryImpl implements FolderRepository {
  constructor(private fileRepo: FileRepository) {}

  async createFolder(folder: Folder): Promise<Folder> {
    const createdFolder = await prisma.folder.create({
      data: {
        name: folder.name,
        parentId: folder.parentId,
      },
    });
    return new Folder(
      createdFolder.name,
      createdFolder.id,
      createdFolder.parentId,
      [],
      []
    );
  }

  async updateFolder(folder: Folder): Promise<Folder> {
    const updatedFolder = await prisma.folder.update({
      where: {
        id: folder.id,
      },
      data: {
        name: folder.name,
      },
    });
    return new Folder(
      updatedFolder.name,
      updatedFolder.id,
      updatedFolder.parentId,
      [],
      []
    );
  }
  async deleteFolder(folderId: string): Promise<void> {
    await prisma.$transaction(async (tx) => {
      // First delete all child folders recursively
      const childFolders = await tx.folder.findMany({
        where: {
          parentId: folderId,
        },
      });

      // Recursively delete child folders
      for (const child of childFolders) {
        // Delete all files in the child folder
        await tx.file.deleteMany({
          where: {
            parentId: child.id,
          },
        });
      }

      // Delete all files in the current folder
      await tx.file.deleteMany({
        where: {
          parentId: folderId,
        },
      });

      // Delete all child folders
      await tx.folder.deleteMany({
        where: {
          parentId: folderId,
        },
      });

      // Delete the folder itself
      await tx.folder.delete({
        where: {
          id: folderId,
        },
      });
    });
  }

  async getAllFolders(): Promise<Folder[]> {
    const folders = await prisma.folder.findMany({
      where: {
        parentId: null,
      },
    });

    return Promise.all(
      folders.map(async (f) => {
        const files = await this.fileRepo.getFilesByFolderId(f.id);
        const subFolders = await this.getSubFolders(f.id);

        return new Folder(f.name, f.id, f.parentId, subFolders, files);
      })
    );
  }

  async getFolderById(id: string): Promise<Folder> {
    const folder = await prisma.folder.findUnique({
      where: {
        id: id,
      },
    });

    if (!folder) {
      throw new Error("Folder not found");
    }

    const files = await this.fileRepo.getFilesByFolderId(folder.id);
    const subFolders = await this.getSubFolders(folder.id);
    const rootNavigation = await this.getRootNavigationById(folder.id);

    return new Folder(
      folder.name,
      folder.id,
      folder.parentId,
      subFolders,
      files,
      rootNavigation
    );
  }

  async getSubFolders(parentId: string): Promise<Folder[]> {
    const folders = await prisma.folder.findMany({
      where: {
        parentId: parentId,
      },
    });

    return Promise.all(
      folders.map(async (f) => {
        const files = await this.fileRepo.getFilesByFolderId(f.id);
        const subFolders = await this.getSubFolders(f.id);

        return new Folder(f.name, f.id, f.parentId, subFolders, files);
      })
    );
  }

  async getRootNavigationById(parentId: string): Promise<RootsNavigation[]> {
    const result = [];

    let currentFolder = await prisma.folder.findFirst({
      where: { id: parentId },
    });

    while (currentFolder) {
      result.unshift(new RootsNavigation(currentFolder.name, currentFolder.id));

      if (currentFolder.parentId) {
        currentFolder = await prisma.folder.findFirst({
          where: { id: currentFolder.parentId },
        });
      } else {
        break;
      }
    }

    return result;
  }
}
