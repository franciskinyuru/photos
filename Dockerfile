FROM node:19-alpine

WORKDIR /app

COPY package.json /app

COPY package-lock.json /app

RUN npm install

COPY . .

EXPOSE 3000

CMD npm start