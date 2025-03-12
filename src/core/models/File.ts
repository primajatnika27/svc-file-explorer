export class File {
  constructor(
    public id: string,
    public name: string,
    public extension: string,
    public parentId: string,
    public storageKey: string,
    public mimeType: string,
    public size: number
  ) {}
}
