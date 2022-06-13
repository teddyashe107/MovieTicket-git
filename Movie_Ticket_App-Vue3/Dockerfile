# Build Vue Project
FROM node:lts-alpine AS build 
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm install --force
COPY . .
RUN npm run build

# Create Nginx server
FROM nginx:alpine AS prod-stage
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


