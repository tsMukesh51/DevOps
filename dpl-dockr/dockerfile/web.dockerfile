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

COPY ./apps/web/package.json ./apps/web/package.json
RUN bun install

COPY ./apps/web/ ./apps/web/
RUN --mount=type=secret,id=DATABASE_URL,env=DATABASE_URL cd ./apps/web && bun run build


CMD [ "bun", "run", "start-web" ]