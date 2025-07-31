-- CreateTable
CREATE TABLE "dpldoc"."User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dpldoc"."Todo" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "done" BOOLEAN NOT NULL DEFAULT false,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Todo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "dpldoc"."User"("username");

-- AddForeignKey
ALTER TABLE "dpldoc"."Todo" ADD CONSTRAINT "Todo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "dpldoc"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
