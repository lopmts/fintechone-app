export interface CreateFinancingInput {
    userId: string;
    amount: number;
    interestRate: number;
    installments: number;
    startDate: Date;
}
export interface MarkInstallmentsPaidInput {
    financingId: string;
    installmentNumbers: number[];
    paidAt?: Date;
}
export type FinancingFilter = "all" | "paid" | "unpaid" | "overdue";
export declare function createFinancing(input: CreateFinancingInput): Promise<{
    installmentAmount: number;
    totalPayable: number;
    amount: import("@prisma/client/runtime/library").Decimal;
    startDate: Date;
    isActive: boolean;
    id: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    interestRate: import("@prisma/client/runtime/library").Decimal;
    installments: number;
}>;
export declare function getFinancings(userId: string, filter?: FinancingFilter): Promise<{
    financings: {
        id: string;
        userId: string;
        isActive: boolean;
        amount: number;
        interestRate: number;
        installments: number;
        startDate: Date;
        createdAt: Date;
        installmentAmount: number;
        totalPayable: number;
        totalPaid: number;
        totalRemaining: number;
        paidCount: number;
        overdueCount: number;
        remainingCount: number;
        isFullyPaid: boolean;
        installmentsList: {
            installmentNumber: number;
            dueDate: Date;
            amount: number;
            paid: boolean;
            overdue: boolean;
            paidAt: Date | null;
        }[];
    }[];
    summary: {
        count: number;
        totalAmount: number;
        totalPayable: number;
        totalPaid: number;
        totalRemaining: number;
    };
}>;
export declare function getFinancingById(userId: string, financingId: string): Promise<{
    id: string;
    userId: string;
    isActive: boolean;
    amount: number;
    interestRate: number;
    installments: number;
    startDate: Date;
    createdAt: Date;
    installmentAmount: number;
    totalPayable: number;
    totalPaid: number;
    totalRemaining: number;
    paidCount: number;
    overdueCount: number;
    remainingCount: number;
    isFullyPaid: boolean;
    installmentsList: {
        installmentNumber: number;
        dueDate: Date;
        amount: number;
        paid: boolean;
        overdue: boolean;
        paidAt: Date | null;
    }[];
} | null>;
/**
 * Marca múltiplas parcelas como pagas de uma vez.
 * Ignora silenciosamente parcelas já pagas (idempotente).
 */
export declare function markInstallmentsPaid(input: MarkInstallmentsPaidInput): Promise<{
    created: number;
    message: string;
    installmentNumbers?: undefined;
} | {
    created: number;
    installmentNumbers: number[];
    message?: undefined;
}>;
export declare function deleteFinancing(userId: string, financingId: string): Promise<boolean>;
//# sourceMappingURL=financing.service.d.ts.map