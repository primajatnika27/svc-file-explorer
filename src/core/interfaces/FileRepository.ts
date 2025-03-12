import type { File } from "../models/File";

export interface FileRepository {
  getFilesByFolderId(folderId: string): Promise<File[]>;
  createFile(name: string, extension: string, parentId: string): Promise<File>;
  updateFile(id: string, name: string, extension: string): Promise<File>;
  deleteFile(id: string): Promise<void>;
}
