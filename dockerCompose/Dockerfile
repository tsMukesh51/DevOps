FROM node:22-alpine

WORKDIR /app

COPY ./package.json ./package.json
COPY ./pnpm-lock.yaml ./pnpm-lock.yaml
COPY ./pnpm-workspace.yaml ./pnpm-workspace.yaml

RUN corepack enable pnpm
RUN pnpm i

COPY ./prisma ./prisma
RUN pnpm exec prisma generate
RUN mkdir ./dist && cp -R ./src/generated ./dist/generated

COPY . .
RUN pnpm run build

CMD [ "pnpm", "dockerRun" ]
