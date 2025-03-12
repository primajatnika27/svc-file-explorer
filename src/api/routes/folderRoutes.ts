import type Elysia from "elysia";
import type { FolderController } from "../controllers/FolderController";

interface CreateFolderBody {
  name: string;
  parentId: string;
}

export const folderRoutes = (app: Elysia, controller: FolderController) => {
  app.get("/api/v1/folders", async () => {
    return await controller.getAllFolders();
  });

  app.get("/api/v1/folders/:parentId", async (req) => {
    const { parentId } = req.params;
    return await controller.getSubfolders(parentId);
  });

  app.post("/api/v1/folders", async (req) => {
    const body = (await req.body) as CreateFolderBody;
    return await controller.createFolder(body.name, body.parentId);
  });

  app.put("/api/v1/folders/:id", async (req) => {
    const body = (await req.body) as CreateFolderBody;
    const { id } = req.params;
    return await controller.updateFolder(id, body.name);
  });

  app.delete("/api/v1/folders/:id", async (req) => {
    const { id } = req.params;
    return await controller.deleteFolder(id);
  });
};
