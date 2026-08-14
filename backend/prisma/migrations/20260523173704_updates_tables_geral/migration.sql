/*
  Warnings:

  - You are about to drop the column `balance` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `categories` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[key]` on the table `categories` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `key` to the `categories` table without a default value. This is not possible if the table is not empty.
  - Made the column `icon` on table `categories` required. This step will fail if there are existing NULL values in that column.
  - Made the column `color` on table `categories` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "CategoryKey" AS ENUM ('FOOD', 'TRANSPORT', 'HOUSING', 'HEALTH', 'LEISURE', 'EDUCATION', 'CLOTHING', 'SALARY', 'FREELANCE', 'INVESTMENT', 'OTHER');

-- AlterTable
ALTER TABLE "accounts" DROP COLUMN "balance";

-- AlterTable
ALTER TABLE "categories" DROP COLUMN "createdAt",
ADD COLUMN     "key" "CategoryKey" NOT NULL,
ALTER COLUMN "icon" SET NOT NULL,
ALTER COLUMN "color" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "categories_key_key" ON "categories"("key");
