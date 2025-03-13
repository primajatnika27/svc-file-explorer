import type { CreateFileService } from "../../core/usecases/CreateFileService";
import type { GetFilesService } from "../../core/usecases/GetFilesService";
import { ApiResponseHandler } from "../common/ApiResponse";

export class FileController {
  constructor(
    private getFileUsecase: GetFilesService,
    private createFileUsecase: CreateFileService
  ) {}

  async getFilesByParentId(parentId: string) {
    try {
      const files = await this.getFileUsecase.getFilesByFolderId(parentId);
      return ApiResponseHandler.success(files, "Files retrieved successfully");
    } catch (error) {
      if (error instanceof Error) {
        return ApiResponseHandler.error(error.message);
      }
      return ApiResponseHandler.error("Failed to retrieve files");
    }
  }

  async createFile(
    name: string,
    extension: string,
    parentId: string,
    fileBuffer: Buffer,
    mimeType: string,
    size: number
  ) {
    try {
      if (!name?.trim()) {
        return ApiResponseHandler.badRequest("File name cannot be empty");
      }
      if (!extension?.trim()) {
        return ApiResponseHandler.badRequest("File extension cannot be empty");
      }
      const file = await this.createFileUsecase.createFile(
        name.trim(),
        extension.trim(),
        parentId,
        fileBuffer,
        mimeType,
        size
      );
      return ApiResponseHandler.created(file, "File created successfully");
    } catch (error) {
      if (error instanceof Error) {
        return ApiResponseHandler.error(
          `Failed to create file: ${error.message}`
        );
      }
      return ApiResponseHandler.error("Failed to create file: Unknown error");
    }
  }

  async updateFile(id: string, name: string) {
    try {
      if (!name?.trim()) {
        return ApiResponseHandler.badRequest("File name cannot be empty");
      }

      const file = await this.createFileUsecase.updateFile(id, name.trim());
      return ApiResponseHandler.success(file, "File updated successfully");
    } catch (error) {
      if (error instanceof Error) {
        return ApiResponseHandler.error(
          `Failed to update file: ${error.message}`
        );
      }
      return ApiResponseHandler.error("Failed to update file: Unknown error");
    }
  }

  async deleteFile(id: string) {
    try {
      await this.createFileUsecase.deleteFile(id);
      return ApiResponseHandler.success(null, "File deleted successfully");
    } catch (error) {
      if (error instanceof Error) {
        return ApiResponseHandler.error(
          `Failed to delete file: ${error.message}`
        );
      }
      return ApiResponseHandler.error("Failed to delete file: Unknown error");
    }
  }

  async getFileUrl(id: string) {
    try {
      const url = await this.createFileUsecase.getFileUrl(id);
      return ApiResponseHandler.success(
        { url },
        "File URL generated successfully"
      );
    } catch (error) {
      if (error instanceof Error) {
        return ApiResponseHandler.error(
          `Failed to get file URL: ${error.message}`
        );
      }
      return ApiResponseHandler.error("Failed to get file URL: Unknown error");
    }
  }
}
