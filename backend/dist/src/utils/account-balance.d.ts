import { Decimal } from "@prisma/client/runtime/library";
export declare function computeBalance(accountId: string): Promise<Decimal>;
export declare function computeRealBalance(accountId: string, initialBalance: Decimal): Promise<number>;
//# sourceMappingURL=account-balance.d.ts.map