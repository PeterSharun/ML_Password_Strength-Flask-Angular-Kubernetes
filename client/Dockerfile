# Stage 1

#Download Node Alpine image
FROM node:12.16.1-alpine as build

#Setup the working directory
WORKDIR /usr/src/ng-app

#Copy package.json
COPY package.json package-lock.json ./

#Install dependencies
RUN npm install

#Copy other files and folder to working directory
COPY . .

#Build Angular application in PROD mode
RUN npm run build

# -----------------------------------

# Stage 2

#Download NGINX Image
FROM nginx:1.15.8-alpine

#Copy built angular app files to NGINX HTML folder
COPY --from=build /usr/src/ng-app/dist/client/ /usr/share/nginx/html