import type { FileRepository } from "../interfaces/FileRepository";
import type { File } from "../models/File";

export class CreateFileService {
  constructor(private fileRepo: FileRepository) {}

  async createFile(
    name: string,
    extension: string,
    parentId: string,
    fileBuffer: Buffer,
    mimeType: string,
    size: number
  ): Promise<File> {
    return this.fileRepo.createFile(
      name,
      extension,
      parentId,
      fileBuffer,
      mimeType,
      size
    );
  }

  async updateFile(id: string, name: string, extension: string): Promise<File> {
    return this.fileRepo.updateFile(id, name, extension);
  }

  async deleteFile(id: string): Promise<void> {
    return this.fileRepo.deleteFile(id);
  }

  async getFileUrl(id: string): Promise<string> {
    return this.fileRepo.getFileUrl(id);
  }
}
