/*
  Warnings:

  - The `provider` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `type` to the `categories` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AuthProvider" AS ENUM ('LOCAL', 'GOOGLE', 'APPLE');

-- CreateEnum
CREATE TYPE "DevicePlatform" AS ENUM ('ANDROID', 'IOS', 'WEB');

-- AlterTable
ALTER TABLE "accounts" ADD COLUMN     "color" TEXT,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "icon" TEXT,
ADD COLUMN     "syncVersion" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "budgets" ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "syncVersion" INTEGER NOT NULL DEFAULT 1,
ALTER COLUMN "period" DROP DEFAULT;

-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "syncVersion" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "type" "TransactionType" NOT NULL;

-- AlterTable
ALTER TABLE "transactions" ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "installments" INTEGER,
ADD COLUMN     "isRecurring" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "lastDeviceId" TEXT,
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "parentTransactionId" TEXT,
ADD COLUMN     "receiptUrl" TEXT,
ADD COLUMN     "syncVersion" INTEGER NOT NULL DEFAULT 1,
ALTER COLUMN "type" DROP DEFAULT,
ALTER COLUMN "date" DROP DEFAULT;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "currency" TEXT NOT NULL DEFAULT 'BRL',
ADD COLUMN     "syncVersion" INTEGER NOT NULL DEFAULT 1,
DROP COLUMN "provider",
ADD COLUMN     "provider" "AuthProvider" NOT NULL DEFAULT 'LOCAL';

-- CreateTable
CREATE TABLE "sync_logs" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "deviceId" TEXT NOT NULL,
    "lastSyncAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sync_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "sync_logs_userId_idx" ON "sync_logs"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "sync_logs_userId_deviceId_key" ON "sync_logs"("userId", "deviceId");

-- CreateIndex
CREATE INDEX "accounts_userId_idx" ON "accounts"("userId");

-- CreateIndex
CREATE INDEX "budgets_userId_idx" ON "budgets"("userId");

-- CreateIndex
CREATE INDEX "transactions_userId_idx" ON "transactions"("userId");

-- CreateIndex
CREATE INDEX "transactions_accountId_idx" ON "transactions"("accountId");

-- CreateIndex
CREATE INDEX "transactions_categoryId_idx" ON "transactions"("categoryId");

-- CreateIndex
CREATE INDEX "transactions_date_idx" ON "transactions"("date");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");

-- AddForeignKey
ALTER TABLE "sync_logs" ADD CONSTRAINT "sync_logs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
