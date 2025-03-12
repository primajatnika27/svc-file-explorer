import type { Folder } from "../models/Folder";

export interface FolderRepository {
  getAllFolders(): Promise<Folder[]>;
  getSubFolders(parentId: String): Promise<Folder[]>;

  createFolder(folder: Folder): Promise<Folder>;
  updateFolder(folder: Folder): Promise<Folder>;
  deleteFolder(folderId: string): Promise<void>;
}
