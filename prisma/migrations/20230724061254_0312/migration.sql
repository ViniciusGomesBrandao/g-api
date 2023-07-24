-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ACTIVE', 'INACTIVE', 'BLOCKED');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('MANAGER', 'SUPPORT', 'EMPLOYEE', 'ADMIN', 'CLIENT');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "id_user" INTEGER,
    "status" "Status" NOT NULL DEFAULT 'ACTIVE',
    "email" VARCHAR(255),
    "password" VARCHAR(255),
    "username" VARCHAR(255),
    "role" "Role" NOT NULL,
    "access_token" TEXT,
    "seed" TEXT,
    "integration_token" TEXT,
    "onetime_token" TEXT,
    "two_factor_active" BOOLEAN NOT NULL DEFAULT false,
    "access_allowed" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "token_managements" (
    "id" SERIAL NOT NULL,
    "id_user" INTEGER,
    "origin" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expiration" TIMESTAMP(3) NOT NULL,
    "data" JSONB,
    "status" "Status" NOT NULL DEFAULT 'INACTIVE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "token_managements_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "token_managements" ADD CONSTRAINT "token_managements_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
