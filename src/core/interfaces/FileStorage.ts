export interface FileStorage {
  uploadFile(file: Buffer, filename: string, mimetype: string): Promise<string>;
  getFileUrl(filename: string): Promise<string>;
  deleteFile(filename: string): Promise<void>;
}
