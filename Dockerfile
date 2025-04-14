# Usamos Node.js como base
FROM node:18-alpine

# Configurar el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias (incluye las de desarrollo por ahora)
RUN npm install

# Copiar el resto del código
COPY . .

# Compilar el código TypeScript
RUN npm run build

# Exponer el puerto de la app
EXPOSE 3000

# Ejecutar el código compilado
CMD ["npm", "start"]
