import Elysia from "elysia";
import { folderRoutes } from "../../api/routes/folderRoutes";
import { fileRoutes } from "../../api/routes/fileRoutes";
import { FolderController } from "../../api/controllers/FolderController";
import { FileController } from "../../api/controllers/FileController";
import { GetFoldersService } from "../../core/usecases/GetFoldersService";
import { CreateFoldersService } from "../../core/usecases/CreateFoldersService";
import { GetFilesService } from "../../core/usecases/GetFilesService";
import { CreateFileService } from "../../core/usecases/CreateFileService";
import { FolderRepositoryImpl } from "../database/FolderRepositoryImpl";
import { FileRepositoryImpl } from "../database/FileRepositoryImpl";
import { MinioStorage } from "../storage/MinioStorage";

// Storage
const storage = new MinioStorage();

// Repositories
const fileRepository = new FileRepositoryImpl(storage);
const folderRepository = new FolderRepositoryImpl(fileRepository);

// Services
const getFolderService = new GetFoldersService(folderRepository);
const createFolderService = new CreateFoldersService(folderRepository);
const getFileService = new GetFilesService(fileRepository);
const createFileService = new CreateFileService(fileRepository);

// Controllers
const folderController = new FolderController(
  getFolderService,
  createFolderService
);
const fileController = new FileController(getFileService, createFileService);

const app = new Elysia();

// Routes
folderRoutes(app, folderController);
fileRoutes(app, fileController);

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
