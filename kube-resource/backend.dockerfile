FROM oven/bun

WORKDIR /app

COPY . .

RUN bun i

CMD [ "bun", "index.ts" ]
