FROM node:20-slim

# Instalar OpenSSL — obrigatório para node:slim com Prisma
RUN apt-get update -y && apt-get install -y openssl

WORKDIR /app

COPY package.json package-lock.json ./
COPY prisma ./prisma
COPY prisma.config.ts ./

RUN npm ci

RUN DATABASE_URL="postgresql://dummy:dummy@localhost/dummy" npx prisma generate

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate deploy && node dist/index.js"]