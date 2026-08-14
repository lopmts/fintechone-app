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
    readonly OTHER: "OTHER";
};
export type CategoryKey = (typeof CategoryKey)[keyof typeof CategoryKey];
export declare const TransactionType: {
    readonly EXPENSE: "EXPENSE";
    readonly INCOME: "INCOME";
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
//# sourceMappingURL=enums.d.ts.map