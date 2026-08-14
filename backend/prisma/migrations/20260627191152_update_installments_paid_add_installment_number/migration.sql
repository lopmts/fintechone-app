/*
  Warnings:

  - Added the required column `installmentAmount` to the `financing` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "financing" ADD COLUMN     "installmentAmount" DECIMAL(12,2) NOT NULL,
ALTER COLUMN "interestRate" DROP NOT NULL;
