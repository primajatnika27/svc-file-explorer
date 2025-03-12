import Elysia from "elysia";
import { folderRoutes } from "../../api/routes/folderRoutes";
import { FolderController } from "../../api/controllers/FolderController";
import { GetFoldersService } from "../../core/usecases/GetFoldersService";
import { FolderRepositoryImpl } from "../database/FolderRepositoryImpl";
import { FileRepositoryImpl } from "../database/FileRepositoryImpl";
import { CreateFoldersService } from "../../core/usecases/CreateFoldersService";

const fileRepository = new FileRepositoryImpl();
const folderRepository = new FolderRepositoryImpl(fileRepository);
const folderService = new GetFoldersService(folderRepository);
const createFolderService = new CreateFoldersService(folderRepository);
const folderController = new FolderController(
  folderService,
  createFolderService
);

const app = new Elysia();

folderRoutes(app, folderController);

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
