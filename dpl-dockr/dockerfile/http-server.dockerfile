FROM oven/bun

WORKDIR /app

RUN apt-get update -y && apt-get install -y openssl

COPY ./turbo.json ./turbo.json
COPY ./bun.lock ./bun.lock
COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json

RUN bun install

COPY ./packages ./packages
RUN cd packages/db && bunx prisma generate

COPY ./apps/http-server/package.json ./apps/http-server/package.json
RUN bun install

COPY ./apps/http-server/ ./apps/http-server/


CMD [ "bun", "run", "./apps/http-server/index.ts" ]