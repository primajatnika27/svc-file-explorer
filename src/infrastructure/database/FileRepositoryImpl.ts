import { PrismaClient } from "@prisma/client";
import type { FileRepository } from "../../core/interfaces/FileRepository";
import { File } from "../../core/models/File";

const prisma = new PrismaClient();

export class FileRepositoryImpl implements FileRepository {
  async getFilesByFolderId(folderId: string): Promise<File[]> {
    const files = await prisma.file.findMany({
      where: {
        parentId: folderId,
      },
    });

    return files.map((f) => new File(f.id, f.name, f.extension, f.parentId));
  }

  async createFile(
    name: string,
    extension: string,
    parentId: string
  ): Promise<File> {
    const file = await prisma.file.create({
      data: {
        name,
        extension,
        parentId,
      },
    });

    return new File(file.id, file.name, file.extension, file.parentId);
  }

  async updateFile(id: string, name: string, extension: string): Promise<File> {
    const file = await prisma.file.update({
      where: { id },
      data: {
        name,
        extension,
      },
    });

    return new File(file.id, file.name, file.extension, file.parentId);
  }

  async deleteFile(id: string): Promise<void> {
    await prisma.file.delete({
      where: { id },
    });
  }
}
