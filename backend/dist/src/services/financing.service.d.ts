export interface Installment {
    number: number;
    amount: number;
    dueDate: Date;
    isPaid: boolean;
    paidAmount?: number;
    paidAt?: Date;
    daysLate?: number;
    lateFeeApplied?: number;
    lateInterestApplied?: number;
    totalWithPenalty?: number;
}
export interface FinancingWithInstallments {
    id: string;
    userId: string;
    title?: string | null;
    isActive: boolean;
    amount: number;
    installmentAmount: number;
    interestRate?: number | null;
    installments: number;
    startDate: Date;
    lateFeeRate?: number | null;
    lateInterestRate?: number | null;
    installmentsData: Installment[];
    totalPaid: number;
    remainingAmount: number;
    paidInstallments: number;
    remainingInstallments: number;
    totalPenaltiesAccrued: number;
}
export interface CreateFinancingInput {
    userId: string;
    title?: string | null;
    amount: number;
    installmentAmount: number;
    interestRate?: number | null;
    installments: number;
    startDate: Date;
    lateFeeRate?: number | null;
    lateInterestRate?: number | null;
}
export type UpdateFinancingInput = Partial<Omit<CreateFinancingInput, "userId">>;
export interface MarkInstallmentsPaidInput {
    financingId: string;
    installmentNumbers: number[];
    paidAt?: Date;
}
export type FinancingFilter = "all" | "paid" | "unpaid" | "overdue";
export declare function createFinancing(input: CreateFinancingInput): Promise<FinancingWithInstallments>;
export declare function getFinancings(userId: string, filter?: FinancingFilter): Promise<{
    financings: FinancingWithInstallments[];
    summary: {
        count: number;
        totalAmount: number;
        totalPayable: number;
        totalPaid: number;
        totalRemaining: number;
        totalPenaltiesAccrued: number;
    };
}>;
export declare function getFinancingById(userId: string, financingId: string): Promise<FinancingWithInstallments | null>;
export declare function updateFinancing(userId: string, financingId: string, input: UpdateFinancingInput): Promise<FinancingWithInstallments>;
/**
 * Marca múltiplas parcelas como pagas de uma vez.
 */
export declare function markInstallmentsPaid(userId: string, input: MarkInstallmentsPaidInput): Promise<FinancingWithInstallments>;
export declare function deleteFinancing(userId: string, financingId: string): Promise<boolean>;
//# sourceMappingURL=financing.service.d.ts.map