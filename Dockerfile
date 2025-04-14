FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm cache clean --force
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]