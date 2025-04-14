FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npx tsc --project tsconfig.json

EXPOSE 3000
CMD ["node", "dist/index.js"]
