import { File } from "../models/File";
export interface FileRepository {
  getFilesByFolderId(folderId: string): Promise<File[]>;
}
