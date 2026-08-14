/*
  Warnings:

  - You are about to alter the column `salary` on the `accounts` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(12,2)`.
  - You are about to alter the column `initialBalance` on the `accounts` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(12,2)`.
  - You are about to alter the column `amount` on the `budgets` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(12,2)`.
  - You are about to alter the column `amount` on the `transactions` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(12,2)`.

*/
-- AlterTable
ALTER TABLE "accounts" ALTER COLUMN "salary" SET DATA TYPE DECIMAL(12,2),
ALTER COLUMN "initialBalance" DROP DEFAULT,
ALTER COLUMN "initialBalance" SET DATA TYPE DECIMAL(12,2);

-- AlterTable
ALTER TABLE "budgets" ALTER COLUMN "amount" SET DATA TYPE DECIMAL(12,2);

-- AlterTable
ALTER TABLE "transactions" ALTER COLUMN "amount" SET DATA TYPE DECIMAL(12,2);

-- CreateTable
CREATE TABLE "financing" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "amount" DECIMAL(12,2) NOT NULL,
    "interestRate" DECIMAL(5,2) NOT NULL,
    "installments" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "financing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "installments_paid" (
    "id" TEXT NOT NULL,
    "financingId" TEXT NOT NULL,
    "installmentNumber" INTEGER NOT NULL,
    "amount" DECIMAL(12,2) NOT NULL,
    "paidAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "installments_paid_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "installments_paid_financingId_installmentNumber_key" ON "installments_paid"("financingId", "installmentNumber");

-- AddForeignKey
ALTER TABLE "financing" ADD CONSTRAINT "financing_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "installments_paid" ADD CONSTRAINT "installments_paid_financingId_fkey" FOREIGN KEY ("financingId") REFERENCES "financing"("id") ON DELETE CASCADE ON UPDATE CASCADE;
