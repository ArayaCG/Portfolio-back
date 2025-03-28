# Usamos Node.js como base
FROM node:18-alpine

# Configurar el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias de producción
RUN npm install

# Copiar el resto del código después de instalar dependencias
COPY . .

# Exponer el puerto en el que corre el backend
EXPOSE 3000

# Comando de inicio
CMD ["npm", "start"]
