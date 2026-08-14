-- AlterTable
ALTER TABLE "financing" ADD COLUMN     "lateFeeRate" DECIMAL(5,2),
ADD COLUMN     "lateInterestRate" DECIMAL(5,2);
