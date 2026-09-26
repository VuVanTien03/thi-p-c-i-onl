# ==========================================
# STAGE 1: Build React Vite App
# ==========================================
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package.json và cài đặt dependencies
COPY package*.json ./
RUN npm ci || npm install

# Copy toàn bộ mã nguồn và build production bundle
COPY . .
RUN npm run build

# ==========================================
# STAGE 2: Serve Production bằng Nginx Alpine
# ==========================================
FROM nginx:alpine

# Copy file cấu hình Nginx tối ưu cho SPA
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy build files từ stage 1 sang thư mục html của Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
