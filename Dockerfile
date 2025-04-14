FROM node:18-alpine

WORKDIR /app

# Instalar herramientas para diagnóstico
RUN apk add --no-cache bash

# Copiar solo package.json primero para aprovechar el caché
COPY package*.json ./
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Ejecutar TypeScript directamente y redirigir la salida a un archivo
RUN npx tsc > typescript_build_output.log 2>&1 || (cat typescript_build_output.log && false)

# Verificar que la compilación fue exitosa mostrando archivos generados
RUN ls -la dist/ || echo "¡La carpeta dist no se creó!"

EXPOSE 3000
CMD ["npm", "start"]