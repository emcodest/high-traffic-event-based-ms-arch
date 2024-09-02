ARG NODE_VERSION=18.18.0
FROM node:${NODE_VERSION}-alpine
WORKDIR /app
# WORKDIR /usr/src/app
# Copy the rest of the source files into the image.
COPY . .
RUN npm install
CMD ["npm", "start"]


