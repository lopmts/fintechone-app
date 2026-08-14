import { Decimal } from "@prisma/client/runtime/library";
type PeriodSummary = {
    totalIncome: Decimal;
    totalExpense: Decimal;
    net: Decimal;
    byCategory: {
        name: string;
        icon: string;
        color: string;
        total: Decimal;
    }[];
};
export declare function calcSummary(userId: string, from: Date, to: Date): Promise<PeriodSummary>;
export declare function sendWeeklyReport(): Promise<void>;
export declare function sendMonthlyReport(): Promise<void>;
export {};
//# sourceMappingURL=feedbackReport.service.d.ts.map