FROM node:20-alpine AS builder

WORKDIR /app

# Copy root monorepo package files
COPY package.json package-lock.json tsconfig.json ./
COPY apps/backend-api/package.json ./apps/backend-api/

# Install dependencies
RUN npm ci

# Copy backend source code
COPY apps/backend-api ./apps/backend-api

# Build TypeScript code
RUN npm --prefix apps/backend-api run build

FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=4000

COPY package.json package-lock.json ./
COPY apps/backend-api/package.json ./apps/backend-api/

RUN npm ci --only=production

COPY --from=builder /app/apps/backend-api/dist ./apps/backend-api/dist

EXPOSE 4000

CMD ["node", "apps/backend-api/dist/app.js"]
