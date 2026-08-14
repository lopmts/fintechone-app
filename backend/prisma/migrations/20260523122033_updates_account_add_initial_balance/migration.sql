/*
  Warnings:

  - Made the column `initialBalance` on table `accounts` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "accounts" ALTER COLUMN "initialBalance" SET NOT NULL;
