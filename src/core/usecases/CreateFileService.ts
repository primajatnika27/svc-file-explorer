import type { FileRepository } from "../interfaces/FileRepository";
import type { File } from "../models/File";

export class CreateFileService {
  constructor(private fileRepo: FileRepository) {}

  async createFile(
    name: string,
    extension: string,
    parentId: string
  ): Promise<File> {
    return this.fileRepo.createFile(name, extension, parentId);
  }

  async updateFile(id: string, name: string, extension: string): Promise<File> {
    return this.fileRepo.updateFile(id, name, extension);
  }

  async deleteFile(id: string): Promise<void> {
    return this.fileRepo.deleteFile(id);
  }
}
