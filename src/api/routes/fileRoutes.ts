import type Elysia from "elysia";
import type { FileController } from "../controllers/FileController";
import { ApiResponseHandler } from "../common/ApiResponse";

interface CreateFileBody {
  name: string;
  extension: string;
}

export const fileRoutes = (app: Elysia, controller: FileController) => {
  app.get("/api/v1/folders/:parentId/files", async ({ params }) => {
    const { parentId } = params;
    return await controller.getFilesByParentId(parentId);
  });

  app.post("/api/v1/folders/:parentId/files", async ({ body, params }) => {
    if (!body || typeof body !== "object") {
      return ApiResponseHandler.error("Invalid request body", 400);
    }

    const file = (body as any).file;
    console.log(file);
    console.log(file.buffer);
    console.log(file.mimetype);
    console.log(file.size);

    if (!file || !file.buffer) {
      return ApiResponseHandler.error("No file uploaded", 400);
    }

    const name = file.name.split(".")[0];
    const extension = file.name.split(".").pop() || "";
    const { parentId } = params;

    return await controller.createFile(
      name,
      extension,
      parentId,
      file.buffer,
      file.mimetype,
      file.size
    );
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

  app.get("/api/v1/files/:id/url", async ({ params }) => {
    const { id } = params;
    return await controller.getFileUrl(id);
  });
};
