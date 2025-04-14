FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN echo "Node.js version: $(node -v)"
RUN echo "npm version: $(npm -v)"
RUN ls -al /app
RUN cat package.json
RUN cat tsconfig.json

RUN grep -r "import.*Repository.*from" src/services/

RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]