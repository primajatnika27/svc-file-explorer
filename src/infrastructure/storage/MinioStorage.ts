import { Client } from "minio";
import type { FileStorage } from "../../core/interfaces/FileStorage";
import { randomUUID } from "crypto";

export class MinioStorage implements FileStorage {
  private client: Client;
  private bucketName: string = process.env.MINIO_BUCKET_NAME || "files";

  constructor() {
    console.log("Initializing Minio client with configuration:");
    console.log(`Endpoint: ${process.env.MINIO_ENDPOINT || "play.min.io"}`);
    console.log(`Port: ${parseInt(process.env.MINIO_PORT || "443")}`);
    console.log(`Use SSL: ${process.env.MINIO_USE_SSL === "true"}`);
    console.log(`Access Key: ${process.env.MINIO_ACCESS_KEY || "minioadmin"}`);
    console.log(`Secret Key: ${process.env.MINIO_SECRET_KEY || "minioadmin"}`);
    console.log(`Region: ${process.env.MINIO_REGION || "us-east-1"}`);
    console.log(`Bucket Name: ${this.bucketName}`);

    this.client = new Client({
      endPoint: process.env.MINIO_ENDPOINT || "play.min.io",
      port: parseInt(process.env.MINIO_PORT || "443"),
      useSSL: process.env.MINIO_USE_SSL === "true",
      accessKey: process.env.MINIO_ACCESS_KEY || "minioadmin",
      secretKey: process.env.MINIO_SECRET_KEY || "minioadmin",
      region: process.env.MINIO_REGION || "us-east-1",
    });

    // Ensure bucket exists
    this.initBucket().catch((error) => {
      console.error("Failed to initialize bucket:", error);
      // Don't throw here to allow the application to start
      // Individual operations will fail if bucket is not available
    });
  }

  private async initBucket(): Promise<void> {
    try {
      const exists = await this.client.bucketExists(this.bucketName);
      if (!exists) {
        await this.client.makeBucket(this.bucketName, "us-east-1");
        console.log(`Bucket ${this.bucketName} created successfully`);

        // For play.min.io, we don't need to set bucket policy as it's handled differently
      } else {
        console.log(`Bucket ${this.bucketName} already exists`);
      }
    } catch (error) {
      console.error(`Failed to initialize bucket: ${this.bucketName}`, error);
      // Log additional error details
      if (error instanceof Error) {
        console.error(`Error message: ${error.message}`);
        console.error(`Error stack: ${error.stack}`);
      }
      throw error;
    }
  }

  async uploadFile(
    file: Buffer,
    originalFilename: string,
    mimetype: string
  ): Promise<string> {
    try {
      const extension = originalFilename.split(".").pop() || "";
      const filename = `${randomUUID()}.${extension}`;

      await this.client.putObject(
        this.bucketName,
        filename,
        file,
        file.length,
        { "Content-Type": mimetype }
      );

      return filename;
    } catch (error) {
      console.error("Failed to upload file:", error);
      throw error;
    }
  }

  async getFileUrl(filename: string): Promise<string> {
    try {
      return await this.client.presignedGetObject(
        this.bucketName,
        filename,
        60 * 60 // 1 hour expiry
      );
    } catch (error) {
      console.error("Failed to get file URL:", error);
      throw error;
    }
  }

  async deleteFile(filename: string): Promise<void> {
    try {
      await this.client.removeObject(this.bucketName, filename);
    } catch (error) {
      console.error("Failed to delete file:", error);
      throw error;
    }
  }
}
