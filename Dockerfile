# Step 1: Build Angular
FROM node:20.19-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# Accept build configuration from workflow (default: production)
ARG BUILD_CONFIG=production
RUN npm run build -- --configuration=$BUILD_CONFIG

# Step 2: Serve with Nginx
FROM nginx:1.27-alpine

# Use custom Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy Angular build output (project name in angular.json is "sakai-ng")
COPY --from=build /app/dist/sakai-ng/browser /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget -q -O /dev/null http://127.0.0.1:80/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
