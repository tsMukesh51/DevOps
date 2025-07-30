## Manual Setup

 - Install Nodejs locally
 - Clone the repo
 - Install dependencies (pnpm i)
 - Start Postgre db and add url to .env
 - pnpm exec prisma migrate dev
 - pnpm exec prisma generate
 - pnpm run build
 - pnpm run start

 ## Docker

 - Install docker
 - Create network using `docker network create docker-comp-net` 
 - Start postgres, or run below command run postgres in docker. `docker run --network docker-comp-net -e POSTGRES_PASSWORD=sEcure -v docker-comp-vl=/var/lib/postgresql/data --name docker-comp-pg_db -d postgres`
 - Build the image - `docker build -t docker-compose .`
 - Start the image - `docker run --network docker-comp-net -e DATABASE_URL="postgres://postgres:sEcure@docker-comp-pg_db:5432/docker" -p 3000:3000 docker-compose`

## Docker Compose

 - Install docker
 - Run `docker compose up`


**Now you can interact with API at port `3000`**