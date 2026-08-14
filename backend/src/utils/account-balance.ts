import { Decimal } from "@prisma/client/runtime/library";
import { prisma } from "../lib/prisma";

export async function computeBalance(accountId: string): Promise<Decimal> {
  const [income, expense] = await Promise.all([
    prisma.transaction.aggregate({
      where: { accountId, type: "INCOME" },
      _sum: { amount: true },
    }),
    prisma.transaction.aggregate({
      where: { accountId, type: "EXPENSE" },
      _sum: { amount: true },
    }),
  ]);

  const totalIncome = income._sum.amount ?? new Decimal(0);
  const totalExpense = expense._sum.amount ?? new Decimal(0);

  return totalIncome.minus(totalExpense);
}

export async function computeRealBalance(
  accountId: string,
  initialBalance: Decimal,
): Promise<number> {
  const txBalance = await computeBalance(accountId);
  return initialBalance.plus(txBalance).toNumber();
}
