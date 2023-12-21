FROM node:alpine

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./tsconfig.json
COPY tsconfig.build.json ./tsconfig.build.json
RUN npm install

COPY src src/

COPY .env ./

EXPOSE 3001

CMD ["npm", "start"]
