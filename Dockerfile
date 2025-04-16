FROM node:18-slim AS builder

WORKDIR /app

# Copia solo los archivos de dependencias primero para aprovechar la caché de Docker
COPY package*.json ./
RUN npm ci

# Copia el resto de los archivos
COPY . .

# Forzar la recompilación completa añadiendo una marca de tiempo al build
RUN echo "Build timestamp: $(date)" > build-timestamp.txt

# Compilar TypeScript
RUN npx tsc

# Etapa de producción
FROM node:18-slim

WORKDIR /app

COPY --from=builder /app/package*.json ./
RUN npm ci --production

COPY --from=builder /app/dist ./dist

# Añade un archivo de versión para verificar qué versión está desplegada
COPY --from=builder /app/build-timestamp.txt ./

ENV NODE_ENV=production

EXPOSE 3000

# Agrega healthcheck
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

CMD ["node", "dist/index.js"]