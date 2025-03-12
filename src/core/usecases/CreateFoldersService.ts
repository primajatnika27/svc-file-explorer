import type { FolderRepository } from "../interfaces/FolderRepository";
import { Folder } from "../models/Folder";

export class CreateFoldersService {
  constructor(private folderRepo: FolderRepository) {}

  async createFolder(name: string, parentId: string): Promise<Folder> {
    const folder = new Folder(name, "", parentId);
    return this.folderRepo.createFolder(folder);
  }

  async updateFolder(name: string, id: string): Promise<Folder> {
    const folder = new Folder(name, id);
    return this.folderRepo.updateFolder(folder);
  }

  async deleteFolder(folderId: string): Promise<void> {
    return this.folderRepo.deleteFolder(folderId);
  }
}
