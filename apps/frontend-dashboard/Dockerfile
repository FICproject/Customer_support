FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json tsconfig.json ./
COPY apps/frontend-dashboard/package.json ./apps/frontend-dashboard/

RUN npm ci

COPY apps/frontend-dashboard ./apps/frontend-dashboard

RUN npm --prefix apps/frontend-dashboard run build

FROM nginx:alpine AS runner

COPY --from=builder /app/apps/frontend-dashboard/dist /usr/share/nginx/html
COPY apps/frontend-dashboard/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
