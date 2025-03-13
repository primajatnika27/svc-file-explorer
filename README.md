# File Explorer Service

A modern file explorer service built with Elysia and Bun, providing robust file and folder management capabilities.

## Features

- **File Management**
  - Upload files
  - Download files
  - Delete files
  - List files in folders
  - Get file details

- **Folder Management**
  - Create folders
  - List folders
  - Navigate folder hierarchy
  - Delete folders

- **Storage Integration**
  - MinIO object storage integration
  - Scalable file storage
  - Secure file handling

## Prerequisites

Before you begin, ensure you have the following installed:
- [Bun](https://bun.sh) (Latest version)
- [MinIO](https://min.io) (for object storage)

## Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd svc-file-explorer
```

2. **Install dependencies**
```bash
bun install
```

3. **Configure environment variables**
Create a `.env` file in the root directory:
```env
MINIO_ENDPOINT=your-minio-endpoint
MINIO_PORT=9000
MINIO_ACCESS_KEY=your-access-key
MINIO_SECRET_KEY=your-secret-key
MINIO_BUCKET_NAME=your-bucket-name
```

## Usage

1. **Start the server**
```bash
bun run dev
```

2. **API Endpoints**

- **Files**
  - `POST /api/v1/folders/:parentId/files` - Upload a file
  - `GET /api/v1/files/:id` - Get file details
  - `DELETE /api/v1/files/:id` - Delete a file

- **Folders**
  - `POST /api/v1/folders` - Create a folder
  - `GET /api/v1/folders` - List root folders
  - `GET /api/v1/folders/:id` - Get folder details

## Development

### Project Structure

```bash
bun install
```

To run:

```bash
bun run src/infrastructure/server/ElysiaServer.ts
```

This project was created using `bun init` in bun v1.2.5. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
