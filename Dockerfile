FROM node:slim

RUN npm install -g ts-node

WORKDIR /src/app

COPY package*.json ./
COPY . .

RUN npm install

ENV NODE_ENV=production

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
