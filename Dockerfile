# Step 1: Build Angular
FROM node:20-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

# Accept build configuration from workflow (default: production)
ARG BUILD_CONFIG=production
RUN npm run build -- --configuration=$BUILD_CONFIG

# Step 2: Serve with Nginx
FROM nginx:alpine

# Clean default Nginx HTML
RUN rm -rf /usr/share/nginx/html/*

# Use custom Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy Angular build output (path may differ based on your Angular project name)
COPY --from=build /app/dist/sakai-ng/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
