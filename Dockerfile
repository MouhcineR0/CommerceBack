FROM node:23-alpine

WORKDIR /app/backend

COPY . .

RUN npm i

EXPOSE 3060

CMD [ "nodemon","index.js" ]