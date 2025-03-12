import type { FileRepository } from "../interfaces/FileRepository";
import type { File } from "../models/File";

export class GetFilesService {
  constructor(private fileRepo: FileRepository) {}

  async getFilesByFolderId(folderId: string): Promise<File[]> {
    return this.fileRepo.getFilesByFolderId(folderId);
  }
}
