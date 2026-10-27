FROM node:22-alpine AS builder

WORKDIR /app

# Copy dashboard package and config files
COPY apps/frontend-dashboard/package*.json ./
COPY apps/frontend-dashboard/tsconfig*.json ./
COPY apps/frontend-dashboard/vite.config.ts ./
COPY apps/frontend-dashboard/index.html ./

# Install frontend dependencies
RUN npm install

# Copy frontend source code and public assets
COPY apps/frontend-dashboard/src ./src
COPY apps/frontend-dashboard/public ./public

# Build Vite production bundle
RUN npm run build

FROM nginx:alpine AS runner

COPY --from=builder /app/dist /usr/share/nginx/html
COPY apps/frontend-dashboard/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
