# Build stage
FROM oven/bun:1 as builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN bun install

# Copy project files
COPY . .

# Generate Prisma client
RUN bunx prisma generate

# Production stage
FROM oven/bun:1-slim

WORKDIR /app

# Copy package files and install production dependencies
COPY package*.json ./
RUN bun install --production

# Copy source files and prisma
COPY --from=builder /app/src ./src
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/tsconfig.json ./tsconfig.json

# Expose the port your app runs on
EXPOSE 3000

# Command to run migrations and start the application
CMD ["sh", "-c", "bunx prisma migrate deploy && bun run src/infrastructure/server/ElysiaServer.ts"] 