import type Elysia from "elysia";
import type { FolderController } from "../controllers/FolderController";

interface CreateFolderBody {
  name: string;
  parentId: string;
}

export const folderRoutes = (
  app: Elysia,
  controller: FolderController,
  basePath: string
) => {
  app.group(basePath, (app) =>
    app
      .get("/folders/root", async () => {
        return await controller.getAllFolders();
      })

      .get("/folders/:parentId", async (req) => {
        const { parentId } = req.params;
        return await controller.getFolderById(parentId);
      })

      .post("/folders", async (req) => {
        const body = (await req.body) as CreateFolderBody;
        return await controller.createFolder(body.name, body.parentId);
      })

      .put("/folders/:id", async (req) => {
        const body = (await req.body) as CreateFolderBody;
        const { id } = req.params;
        return await controller.updateFolder(id, body.name);
      })

      .delete("/folders/:id", async (req) => {
        const { id } = req.params;
        return await controller.deleteFolder(id);
      })
  );
};
