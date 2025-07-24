FROM node:22-alpine

WORKDIR /app

COPY ./package.json ./package.json
COPY ./pnpm-lock.yaml ./pnpm-lock.yaml
COPY ./pnpm-workspace.yaml ./pnpm-workspace.yaml

RUN corepack enable pnpm
RUN pnpm i

COPY . .

RUN pnpm exec prisma generate
RUN pnpm run build
RUN cp -R ./src/generated ./dist/generated

CMD [ "pnpm", "dockerRun" ]
