# Use an official Nginx image as the base image for serving content
FROM nginx:1.25.3

COPY ./nginx/default.conf /etc/nginx/conf.d/
# CMD ["nginx", "-g", "daemon off;"]