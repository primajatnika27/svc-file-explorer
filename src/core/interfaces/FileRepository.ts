import type { File } from "../models/File";

export interface FileRepository {
  getFilesByFolderId(folderId: string): Promise<File[]>;
  createFile(
    name: string,
    extension: string,
    parentId: string,
    fileBuffer: Buffer,
    mimeType: string,
    size: number
  ): Promise<File>;
  updateFile(id: string, name: string): Promise<File>;
  deleteFile(id: string): Promise<void>;
  getFileUrl(id: string): Promise<string>;
}
