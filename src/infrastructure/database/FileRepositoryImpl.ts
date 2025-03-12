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
}
