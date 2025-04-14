FROM node:18-alpine

WORKDIR /app

# Copiar package.json y instalar dependencias
COPY package*.json ./
RUN npm install

# Copiar el código fuente
COPY . .

# Verificar que los imports sean correctos (esto es solo informativo)
RUN grep -r "import.*Repository.*from" src/services/

# Compilar el proyecto
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]