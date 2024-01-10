-- CreateEnum
CREATE TYPE "Libraries" AS ENUM ('BIGDATA');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('MANAGER', 'SUPPORT', 'EMPLOYEE', 'ADMIN', 'CLIENT');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ACTIVE', 'INACTIVE', 'BLOCKED', 'CREATED');

-- CreateEnum
CREATE TYPE "StatusSecurityCode" AS ENUM ('ACTIVE', 'CHECKED', 'CANCELED');

-- CreateEnum
CREATE TYPE "TypeEmailConfirm" AS ENUM ('UNCONFIRMED', 'CONFIRMED');

-- CreateTable
CREATE TABLE "Categories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "created_id" INTEGER,
    "custom_value" DOUBLE PRECISION,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoriesOnModules" (
    "id" SERIAL NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "moduleId" INTEGER NOT NULL,

    CONSTRAINT "CategoriesOnModules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Modules" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Modules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Resources" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "library" "Libraries" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Resources_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResourcesOnModules" (
    "id" SERIAL NOT NULL,
    "moduleId" INTEGER NOT NULL,
    "resourceId" INTEGER NOT NULL,

    CONSTRAINT "ResourcesOnModules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsersOnCategories" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UsersOnCategories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "security_code" (
    "id" SERIAL NOT NULL,
    "id_user" INTEGER NOT NULL,
    "code" TEXT NOT NULL,
    "date_expiration" TIMESTAMP(3) NOT NULL,
    "status" "StatusSecurityCode" NOT NULL DEFAULT 'ACTIVE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "security_code_pkey" PRIMARY KEY ("id")
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

-- CreateTable
CREATE TABLE "user_configuration" (
    "id" SERIAL NOT NULL,
    "id_user" INTEGER NOT NULL,
    "pix_encoded_pixcopypaste" TEXT,
    "pix_qrcode" TEXT,
    "pix_transaction_id" TEXT,
    "pix_key" TEXT,
    "pix_validation_code" TEXT,
    "twofactor_code" TEXT,
    "fee_service_fixed" DECIMAL(16,2) NOT NULL DEFAULT 0.00,
    "fee_service_percent" DECIMAL(5,2) NOT NULL DEFAULT 0.00,
    "fee_pix" DECIMAL(16,2) NOT NULL DEFAULT 0.00,
    "baas_key" TEXT,
    "baas_secret" TEXT,
    "baas_name" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_configuration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "id_user" INTEGER,
    "status" "Status" NOT NULL DEFAULT 'ACTIVE',
    "email" TEXT NOT NULL,
    "password" TEXT,
    "username" TEXT,
    "role" "Role" NOT NULL,
    "access_token" TEXT,
    "seed" TEXT,
    "integration_token" TEXT,
    "onetime_token" TEXT,
    "two_factor_active" BOOLEAN NOT NULL DEFAULT false,
    "access_allowed" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email_code" TEXT,
    "email_status" "TypeEmailConfirm" NOT NULL DEFAULT 'UNCONFIRMED',
    "password_code" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_configuration_id_user_key" ON "user_configuration"("id_user");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_seed_key" ON "users"("seed");

-- AddForeignKey
ALTER TABLE "Categories" ADD CONSTRAINT "Categories_created_id_fkey" FOREIGN KEY ("created_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriesOnModules" ADD CONSTRAINT "CategoriesOnModules_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriesOnModules" ADD CONSTRAINT "CategoriesOnModules_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Modules"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResourcesOnModules" ADD CONSTRAINT "ResourcesOnModules_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Modules"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResourcesOnModules" ADD CONSTRAINT "ResourcesOnModules_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "Resources"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnCategories" ADD CONSTRAINT "UsersOnCategories_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnCategories" ADD CONSTRAINT "UsersOnCategories_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "security_code" ADD CONSTRAINT "security_code_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "token_managements" ADD CONSTRAINT "token_managements_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_configuration" ADD CONSTRAINT "user_configuration_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

