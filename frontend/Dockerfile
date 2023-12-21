FROM node:alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY src ./src
COPY public ./public

COPY .env ./

EXPOSE 3000

CMD ["npm", "start"]
