FROM node:23-alpine

WORKDIR /app/backend

COPY . .

RUN npm i

EXPOSE 3000

CMD [ "nodemon","index.js" ]