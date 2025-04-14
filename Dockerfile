# Usamos Node.js como base
FROM node:18-alpine

# Instalamos herramientas de diagnóstico
RUN apk add --no-cache bash

# Configurar el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar todas las dependencias (incluidas las de desarrollo)
RUN npm install

# Copiar el resto del código
COPY . .

# Ver contenido del directorio para diagnóstico
RUN ls -la
RUN echo "Contenido de tsconfig.json:" && cat tsconfig.json

# Compilar con salida detallada
RUN npm run build --verbose

# Exponer el puerto de la app
EXPOSE 3000

# Ejecutar el código compilado
CMD ["npm", "start"]