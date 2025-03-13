import type { FolderRepository } from "../interfaces/FolderRepository";
import type { Folder } from "../models/Folder";

export class GetFoldersService {
  constructor(private folderRepo: FolderRepository) {}

  async getAllFolders(): Promise<Folder[]> {
    return this.folderRepo.getAllFolders();
  }

  async getFolderById(id: string): Promise<Folder> {
    return await this.folderRepo.getFolderById(id);
  }

  async getSubfolders(parentId: String): Promise<Folder[]> {
    return await this.folderRepo.getSubFolders(parentId);
  }
}
