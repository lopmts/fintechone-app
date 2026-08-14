-- CreateEnum
CREATE TYPE "AccountType" AS ENUM ('CHECKING', 'SAVINGS', 'CREDIT', 'MAIN');

-- AlterTable
ALTER TABLE "accounts" ADD COLUMN     "type" "AccountType" NOT NULL DEFAULT 'CHECKING';

-- AlterTable
ALTER TABLE "budgets" ALTER COLUMN "period" SET DEFAULT 'MONTHLY';

-- AlterTable
ALTER TABLE "transactions" ALTER COLUMN "type" SET DEFAULT 'EXPENSE';
