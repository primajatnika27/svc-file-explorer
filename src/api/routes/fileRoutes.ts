import type Elysia from "elysia";
import type { FileController } from "../controllers/FileController";
import { ApiResponseHandler } from "../common/ApiResponse";
import { t } from "elysia";

interface CreateFileBody {
  name: string;
  extension: string;
}

export const fileRoutes = (
  app: Elysia,
  controller: FileController,
  basePath: string
) => {
  app.group(basePath, (app) =>
    app
      .get("/files/:parentId", async ({ params }) => {
        const { parentId } = params;
        return await controller.getFilesByParentId(parentId);
      })

      .post(
        "/files/upload/:parentId",
        async ({ body, params }) => {
          const { file } = body;
          const { parentId } = params;

          if (!file) {
            return { error: "No file uploaded" };
          }

          const arrayBuffer = await file.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);

          const name = file.name.split(".")[0];
          const extension = file.name.split(".").pop() || "";
          console.log(buffer);

          await controller.createFile(
            name!,
            extension,
            parentId,
            buffer,
            file.type,
            file.size
          );

          return ApiResponseHandler.success({
            message: "File uploaded successfully",
          });
        },
        {
          body: t.Object({
            file: t.File(),
          }),
        }
      )

      .get("/files/url/:id", async ({ params }) => {
        const { id } = params;
        return await controller.getFileUrl(id);
      })

      .put("/files/:id", async (req) => {
        const body = (await req.body) as CreateFileBody;
        const { id } = req.params;
        return await controller.updateFile(id, body.name);
      })

      .delete("/files/:id", async ({ params }) => {
        const { id } = params;
        return await controller.deleteFile(id);
      })
  );
};
