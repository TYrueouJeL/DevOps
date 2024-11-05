FROM nginx:latest

# Copy dist directory
COPY dist /usr/share/nginx/html