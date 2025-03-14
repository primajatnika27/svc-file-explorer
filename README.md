# File Explorer Service

A modern file explorer service built with Elysia and Bun, providing robust file and folder management capabilities.

## Features

- **File Management**
  - Upload files
  - View files
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
MINIO_ENDPOINT=play.min.io
MINIO_PORT=443
MINIO_ACCESS_KEY=Q3AM3UQ867SPQQA43P2F
MINIO_SECRET_KEY=zuf+tfteSlswRu7BJ86wekitnifILbZam1KYY3TG
MINIO_BUCKET_NAME=file-explorer-bucket

# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/your-database-name?schema=public"
```

4. **Initialize Prisma**
```bash
# Generate Prisma Client
bun prisma generate

# Run database migrations
bun prisma migrate dev
```

The `DATABASE_URL` follows this format:
- `postgresql://` - Database protocol
- `username` - Your database username
- `password` - Your database password
- `localhost` - Database host
- `5432` - PostgreSQL default port
- `your-database-name` - Your database name
- `?schema=public` - Schema name (default is public)
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
