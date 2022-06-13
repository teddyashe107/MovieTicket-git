# express project
FROM node:lts-alpine AS build
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm install 
COPY . /app
CMD [ "npm", "start" ]