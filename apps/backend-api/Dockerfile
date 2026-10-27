FROM node:22-alpine AS builder

WORKDIR /app

# Copy backend package and config files
COPY apps/backend-api/package*.json ./
COPY apps/backend-api/tsconfig.json ./

# Install dependencies
RUN npm install

# Copy source code and build TypeScript
COPY apps/backend-api/src ./src
RUN npm run build

FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=4000

COPY apps/backend-api/package*.json ./

RUN npm install --omit=dev

COPY --from=builder /app/dist ./dist

EXPOSE 4000

CMD ["node", "dist/app.js"]
