-- CreateEnum
CREATE TYPE "public"."WebsiteMonitoringStatus" AS ENUM ('active', 'inactive');

-- CreateEnum
CREATE TYPE "public"."WebsiteResponseStatus" AS ENUM ('Up', 'Down', 'Unknown');

-- CreateEnum
CREATE TYPE "public"."Regions" AS ENUM ('NorthAmerica', 'SouthAmerica', 'Europe', 'Africa', 'CentralAsia', 'IndianSubcontinent', 'EastAsia');

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "public"."Website" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "websiteMonitoring" "public"."WebsiteMonitoringStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Website_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."WebsiteConfig" (
    "id" SERIAL NOT NULL,
    "region" "public"."Regions" NOT NULL,
    "pullFrequency" INTEGER NOT NULL,
    "websiteId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WebsiteConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."WebsiteTickSeries" (
    "id" SERIAL NOT NULL,
    "responeStatus" "public"."WebsiteResponseStatus" NOT NULL,
    "responseTime" INTEGER NOT NULL,
    "polledAt" TIMESTAMP(3) NOT NULL,
    "websiteConfig" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WebsiteTickSeries_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Website" ADD CONSTRAINT "Website_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."WebsiteConfig" ADD CONSTRAINT "WebsiteConfig_websiteId_fkey" FOREIGN KEY ("websiteId") REFERENCES "public"."Website"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."WebsiteTickSeries" ADD CONSTRAINT "WebsiteTickSeries_websiteConfig_fkey" FOREIGN KEY ("websiteConfig") REFERENCES "public"."WebsiteConfig"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
