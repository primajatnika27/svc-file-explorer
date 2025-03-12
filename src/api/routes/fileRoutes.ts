import type Elysia from "elysia";
import type { FileController } from "../controllers/FileController";
import { t } from "elysia";

interface CreateFileBody {
  name: string;
  extension: string;
}

export const fileRoutes = (app: Elysia, controller: FileController) => {
  app.get("/api/v1/folders/:parentId/files", async ({ params }) => {
    const { parentId } = params;
    return await controller.getFilesByParentId(parentId);
  });

  app.post("/api/v1/folders/:parentId/files", async (req) => {
    const body = (await req.body) as CreateFileBody;
    const { parentId } = req.params;
    return await controller.createFile(body.name, body.extension, parentId);
  });

  app.put("/api/v1/files/:id", async (req) => {
    const body = (await req.body) as CreateFileBody;
    const { id } = req.params;
    return await controller.updateFile(id, body.name, body.extension);
  });

  app.delete("/api/v1/files/:id", async ({ params }) => {
    const { id } = params;
    return await controller.deleteFile(id);
  });
};
