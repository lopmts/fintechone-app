export declare const CategoryKey: {
    readonly FOOD: "FOOD";
    readonly TRANSPORT: "TRANSPORT";
    readonly HOUSING: "HOUSING";
    readonly HEALTH: "HEALTH";
    readonly LEISURE: "LEISURE";
    readonly EDUCATION: "EDUCATION";
    readonly CLOTHING: "CLOTHING";
    readonly SALARY: "SALARY";
    readonly FREELANCE: "FREELANCE";
    readonly INVESTMENT: "INVESTMENT";
    readonly CARD: "CARD";
    readonly OTHER: "OTHER";
};
export type CategoryKey = (typeof CategoryKey)[keyof typeof CategoryKey];
export declare const BankType: {
    readonly NUBANK: "NUBANK";
    readonly ITAÚ: "ITAÚ";
    readonly BRADESCO: "BRADESCO";
    readonly SANTANDER: "SANTANDER";
    readonly CAIXA: "CAIXA";
    readonly BANCO_DO_BRASIL: "BANCO_DO_BRASIL";
    readonly INTER: "INTER";
    readonly C6_BANK: "C6_BANK";
    readonly PAGBANK: "PAGBANK";
    readonly NEXT: "NEXT";
    readonly ORIGINAL: "ORIGINAL";
    readonly OTHER: "OTHER";
};
export type BankType = (typeof BankType)[keyof typeof BankType];
export declare const TransactionType: {
    readonly EXPENSE: "EXPENSE";
    readonly INCOME: "INCOME";
    readonly TRANSFER: "TRANSFER";
};
export type TransactionType = (typeof TransactionType)[keyof typeof TransactionType];
export declare const BudgetPeriod: {
    readonly WEEKLY: "WEEKLY";
    readonly MONTHLY: "MONTHLY";
};
export type BudgetPeriod = (typeof BudgetPeriod)[keyof typeof BudgetPeriod];
export declare const AccountType: {
    readonly CHECKING: "CHECKING";
    readonly SAVINGS: "SAVINGS";
    readonly CREDIT: "CREDIT";
    readonly MAIN: "MAIN";
};
export type AccountType = (typeof AccountType)[keyof typeof AccountType];
export declare const AuthProvider: {
    readonly LOCAL: "LOCAL";
    readonly GOOGLE: "GOOGLE";
    readonly APPLE: "APPLE";
};
export type AuthProvider = (typeof AuthProvider)[keyof typeof AuthProvider];
export declare const DevicePlatform: {
    readonly ANDROID: "ANDROID";
    readonly IOS: "IOS";
    readonly WEB: "WEB";
};
export type DevicePlatform = (typeof DevicePlatform)[keyof typeof DevicePlatform];
//# sourceMappingURL=enums.d.ts.map