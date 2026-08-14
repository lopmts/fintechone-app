import { Decimal } from "@prisma/client/runtime/library";
type FeedbackEmailPayload = {
    email: string;
    name: string;
    period: "semanal" | "mensal";
    startDate: Date;
    endDate: Date;
    summary: {
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
};
export declare function sendFeedbackEmail(payload: FeedbackEmailPayload): Promise<void>;
export {};
//# sourceMappingURL=feedback-mailer.service.d.ts.map