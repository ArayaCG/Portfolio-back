FROM node:18-slim

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Añade una variable de entorno para saltarse los errores de tipos en Node
ENV NODE_OPTIONS=--no-warnings

RUN npm run build

ENV NODE_ENV=production

EXPOSE 3000

# Añade una verificación de salud
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD node -e "require('http').request({ host: 'localhost', port: 3000, path: '/health', timeout: 5000 }, (r) => { r.on('data', () => {}); r.on('end', () => { process.exit(r.statusCode === 200 ? 0 : 1); }); }).end()"

CMD ["npm", "start"]