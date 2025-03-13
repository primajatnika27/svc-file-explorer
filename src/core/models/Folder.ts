import { File } from "./File";
import type { RootsNavigation } from "./RootsNavigation";

export class Folder {
  constructor(
    public name: string,
    public id: string = "",
    public parentId: string | null = null,
    public subFolders: Folder[] = [],
    public files: File[] = [],
    public rootNavigation: RootsNavigation[] = []
  ) {}
}
