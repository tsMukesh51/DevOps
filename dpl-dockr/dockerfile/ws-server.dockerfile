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

COPY ./apps/ws-server/package.json ./apps/ws-server/package.json
RUN bun install

COPY ./apps/ws-server/ ./apps/ws-server/


CMD [ "bun", "run", "start-ws-server" ]