FROM node:alpine

LABEL maintainer = "Sunil sunilgaddi9177@gmail.com"

LABEL description = "This is the Client Image!"

WORKDIR /usr/app

COPY package*.json ./

RUN npm install -qy

COPY . .

EXPOSE 3000

CMD [ "npm","start" ]
