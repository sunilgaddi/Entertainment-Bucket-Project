FROM node:alpine

LABEL maintainer="Sunil sunilgaddi917@gmail.com"

LABEL description="This is the Server Image!"

WORKDIR /usr/app

COPY package*.json ./

RUN npm install -qyg nodemon@2.0.7

RUN npm install -qy

COPY . .

EXPOSE 8000

CMD [ "npm","run","dev" ]