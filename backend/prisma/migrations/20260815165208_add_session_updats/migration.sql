-- CreateEnum
CREATE TYPE "BankType" AS ENUM ('NUBANK', 'ITAÚ', 'BRADESCO', 'SANTANDER', 'CAIXA', 'BANCO_DO_BRASIL', 'INTER', 'C6_BANK', 'PAGBANK', 'NEXT', 'ORIGINAL', 'OTHER');

-- AlterEnum
ALTER TYPE "TransactionType" ADD VALUE 'TRANSFER';

-- AlterTable
ALTER TABLE "accounts" ADD COLUMN     "bank" "BankType" NOT NULL DEFAULT 'OTHER';

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "refreshTokenHash" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "revokedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUsedAt" TIMESTAMP(3),

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Session_userId_idx" ON "Session"("userId");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
