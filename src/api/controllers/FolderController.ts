import type { Folder } from "../../core/models/Folder";
import type { CreateFoldersService } from "../../core/usecases/CreateFoldersService";
import type { GetFoldersService } from "../../core/usecases/GetFoldersService";
import { ApiResponseHandler } from "../common/ApiResponse";

export class FolderController {
  constructor(
    private folderUsecase: GetFoldersService,
    private createFolderUsecase: CreateFoldersService
  ) {}

  async getAllFolders() {
    try {
      const folders = await this.folderUsecase.getAllFolders();
      return ApiResponseHandler.success(
        folders,
        "Folders retrieved successfully"
      );
    } catch (error) {
      if (error instanceof Error) {
        return ApiResponseHandler.error(error.message);
      }
      return ApiResponseHandler.error("Failed to retrieve folders");
    }
  }

  async getFolderById(id: string) {
    try {
      const folder = await this.folderUsecase.getFolderById(id);
      return ApiResponseHandler.success(
        folder,
        "Folder retrieved successfully"
      );
    } catch (error) {
      if (error instanceof Error) {
        return ApiResponseHandler.error(error.message);
      }
      return ApiResponseHandler.error("Failed to retrieve folder");
    }
  }

  async getSubfolders(parentId: string) {
    try {
      const folders = await this.folderUsecase.getSubfolders(parentId);
      return ApiResponseHandler.success(
        folders,
        "Subfolders retrieved successfully"
      );
    } catch (error) {
      if (error instanceof Error) {
        return ApiResponseHandler.error(error.message);
      }
      return ApiResponseHandler.error("Failed to retrieve subfolders");
    }
  }

  async createFolder(name: string, parentId: string) {
    try {
      if (!name?.trim()) {
        return ApiResponseHandler.badRequest("Folder name cannot be empty");
      }
      const folder = await this.createFolderUsecase.createFolder(
        name.trim(),
        parentId
      );
      return ApiResponseHandler.created(folder, "Folder created successfully");
    } catch (error) {
      if (error instanceof Error) {
        return ApiResponseHandler.error(
          `Failed to create folder: ${error.message}`
        );
      }
      return ApiResponseHandler.error("Failed to create folder: Unknown error");
    }
  }

  async updateFolder(id: string, name: string) {
    try {
      if (!name?.trim()) {
        return ApiResponseHandler.badRequest("Folder name cannot be empty");
      }
      const folder = await this.createFolderUsecase.updateFolder(
        name.trim(),
        id
      );
      return ApiResponseHandler.success(folder, "Folder updated successfully");
    } catch (error) {
      if (error instanceof Error) {
        return ApiResponseHandler.error(
          `Failed to update folder: ${error.message}`
        );
      }
    }
  }

  async deleteFolder(id: string) {
    try {
      await this.createFolderUsecase.deleteFolder(id);
      return ApiResponseHandler.success("Folder deleted successfully");
    } catch (error) {
      if (error instanceof Error) {
        return ApiResponseHandler.error(error.message);
      }
      return ApiResponseHandler.error("Failed to delete folder");
    }
  }
}
