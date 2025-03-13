import { PrismaClient } from "@prisma/client";
import type { FileRepository } from "../../core/interfaces/FileRepository";
import type { FileStorage } from "../../core/interfaces/FileStorage";
import { File } from "../../core/models/File";

const prisma = new PrismaClient();

export class FileRepositoryImpl implements FileRepository {
  constructor(private storage: FileStorage) {}

  async getFilesByFolderId(folderId: string): Promise<File[]> {
    const files = await prisma.file.findMany({
      where: {
        parentId: folderId,
      },
    });

    return files.map(
      (f) =>
        new File(
          f.id,
          f.name,
          f.extension,
          f.parentId,
          f.storageKey,
          f.mimeType,
          f.size
        )
    );
  }

  async createFile(
    name: string,
    extension: string,
    parentId: string,
    fileBuffer: Buffer,
    mimeType: string,
    size: number
  ): Promise<File> {
    // Upload to storage first
    const storageKey = await this.storage.uploadFile(
      fileBuffer,
      `${name}.${extension}`,
      mimeType
    );

    // Then create database record
    const file = await prisma.file.create({
      data: {
        name,
        extension,
        parentId,
        storageKey,
        mimeType,
        size,
      },
    });

    return new File(
      file.id,
      file.name,
      file.extension,
      file.parentId,
      file.storageKey,
      file.mimeType,
      file.size
    );
  }

  async updateFile(id: string, name: string): Promise<File> {
    const file = await prisma.file.update({
      where: { id },
      data: {
        name,
      },
    });

    return new File(
      file.id,
      file.name,
      file.extension,
      file.parentId,
      file.storageKey,
      file.mimeType,
      file.size
    );
  }

  async deleteFile(id: string): Promise<void> {
    const file = await prisma.file.findUnique({
      where: { id },
    });

    if (!file) return;

    // Delete from storage first
    // await this.storage.deleteFile(file.storageKey);

    // Then delete database record
    await prisma.file.delete({
      where: { id },
    });
  }

  async getFileUrl(id: string): Promise<string> {
    const file = await prisma.file.findUnique({
      where: { id },
    });

    if (!file) {
      throw new Error("File not found");
    }

    return this.storage.getFileUrl(file.storageKey);
  }
}
