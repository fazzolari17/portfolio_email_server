# FROM nginx

# RUN apt-get update
# RUN apt-get install nginx

# COPY nginx.conf /etc/nginx/nginx.conf

# CMD nginx

FROM node:16

WORKDIR /usr/src/app

COPY . .

# Change npm ci to npm install since we are going to be in development mode
RUN npm install

# npm start is the command to start the application in development mode
CMD ["npm", "run", "dev"]