FROM node:18-slim AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY tsconfig.json ./
COPY src ./src
COPY package.json ./

RUN echo "--- Listing /app directory in builder ---" && ls -R /app

RUN rm -rf /app/dist

RUN npx tsc --noEmitOnError false

FROM node:18-slim

WORKDIR /app

COPY --from=builder /app/package*.json ./
RUN npm install --omit=dev --production

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/src ./src

ENV NODE_ENV=production

EXPOSE 3000

CMD ["node", "dist/index.js"]