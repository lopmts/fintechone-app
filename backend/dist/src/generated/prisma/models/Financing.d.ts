import type * as runtime from "@prisma/client/runtime/library";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model Financing
 *
 */
export type FinancingModel = runtime.Types.Result.DefaultSelection<Prisma.$FinancingPayload>;
export type AggregateFinancing = {
    _count: FinancingCountAggregateOutputType | null;
    _avg: FinancingAvgAggregateOutputType | null;
    _sum: FinancingSumAggregateOutputType | null;
    _min: FinancingMinAggregateOutputType | null;
    _max: FinancingMaxAggregateOutputType | null;
};
export type FinancingAvgAggregateOutputType = {
    amount: runtime.Decimal | null;
    installmentAmount: runtime.Decimal | null;
    interestRate: runtime.Decimal | null;
    installments: number | null;
    lateFeeRate: runtime.Decimal | null;
    lateInterestRate: runtime.Decimal | null;
};
export type FinancingSumAggregateOutputType = {
    amount: runtime.Decimal | null;
    installmentAmount: runtime.Decimal | null;
    interestRate: runtime.Decimal | null;
    installments: number | null;
    lateFeeRate: runtime.Decimal | null;
    lateInterestRate: runtime.Decimal | null;
};
export type FinancingMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    isActive: boolean | null;
    title: string | null;
    amount: runtime.Decimal | null;
    installmentAmount: runtime.Decimal | null;
    interestRate: runtime.Decimal | null;
    installments: number | null;
    startDate: Date | null;
    lateFeeRate: runtime.Decimal | null;
    lateInterestRate: runtime.Decimal | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type FinancingMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    isActive: boolean | null;
    title: string | null;
    amount: runtime.Decimal | null;
    installmentAmount: runtime.Decimal | null;
    interestRate: runtime.Decimal | null;
    installments: number | null;
    startDate: Date | null;
    lateFeeRate: runtime.Decimal | null;
    lateInterestRate: runtime.Decimal | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type FinancingCountAggregateOutputType = {
    id: number;
    userId: number;
    isActive: number;
    title: number;
    amount: number;
    installmentAmount: number;
    interestRate: number;
    installments: number;
    startDate: number;
    lateFeeRate: number;
    lateInterestRate: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type FinancingAvgAggregateInputType = {
    amount?: true;
    installmentAmount?: true;
    interestRate?: true;
    installments?: true;
    lateFeeRate?: true;
    lateInterestRate?: true;
};
export type FinancingSumAggregateInputType = {
    amount?: true;
    installmentAmount?: true;
    interestRate?: true;
    installments?: true;
    lateFeeRate?: true;
    lateInterestRate?: true;
};
export type FinancingMinAggregateInputType = {
    id?: true;
    userId?: true;
    isActive?: true;
    title?: true;
    amount?: true;
    installmentAmount?: true;
    interestRate?: true;
    installments?: true;
    startDate?: true;
    lateFeeRate?: true;
    lateInterestRate?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type FinancingMaxAggregateInputType = {
    id?: true;
    userId?: true;
    isActive?: true;
    title?: true;
    amount?: true;
    installmentAmount?: true;
    interestRate?: true;
    installments?: true;
    startDate?: true;
    lateFeeRate?: true;
    lateInterestRate?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type FinancingCountAggregateInputType = {
    id?: true;
    userId?: true;
    isActive?: true;
    title?: true;
    amount?: true;
    installmentAmount?: true;
    interestRate?: true;
    installments?: true;
    startDate?: true;
    lateFeeRate?: true;
    lateInterestRate?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type FinancingAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Financing to aggregate.
     */
    where?: Prisma.FinancingWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Financings to fetch.
     */
    orderBy?: Prisma.FinancingOrderByWithRelationInput | Prisma.FinancingOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.FinancingWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Financings from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Financings.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Financings
    **/
    _count?: true | FinancingCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: FinancingAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: FinancingSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: FinancingMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: FinancingMaxAggregateInputType;
};
export type GetFinancingAggregateType<T extends FinancingAggregateArgs> = {
    [P in keyof T & keyof AggregateFinancing]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateFinancing[P]> : Prisma.GetScalarType<T[P], AggregateFinancing[P]>;
};
export type FinancingGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FinancingWhereInput;
    orderBy?: Prisma.FinancingOrderByWithAggregationInput | Prisma.FinancingOrderByWithAggregationInput[];
    by: Prisma.FinancingScalarFieldEnum[] | Prisma.FinancingScalarFieldEnum;
    having?: Prisma.FinancingScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: FinancingCountAggregateInputType | true;
    _avg?: FinancingAvgAggregateInputType;
    _sum?: FinancingSumAggregateInputType;
    _min?: FinancingMinAggregateInputType;
    _max?: FinancingMaxAggregateInputType;
};
export type FinancingGroupByOutputType = {
    id: string;
    userId: string;
    isActive: boolean;
    title: string | null;
    amount: runtime.Decimal;
    installmentAmount: runtime.Decimal;
    interestRate: runtime.Decimal | null;
    installments: number;
    startDate: Date;
    lateFeeRate: runtime.Decimal | null;
    lateInterestRate: runtime.Decimal | null;
    createdAt: Date;
    updatedAt: Date;
    _count: FinancingCountAggregateOutputType | null;
    _avg: FinancingAvgAggregateOutputType | null;
    _sum: FinancingSumAggregateOutputType | null;
    _min: FinancingMinAggregateOutputType | null;
    _max: FinancingMaxAggregateOutputType | null;
};
type GetFinancingGroupByPayload<T extends FinancingGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<FinancingGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof FinancingGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], FinancingGroupByOutputType[P]> : Prisma.GetScalarType<T[P], FinancingGroupByOutputType[P]>;
}>>;
export type FinancingWhereInput = {
    AND?: Prisma.FinancingWhereInput | Prisma.FinancingWhereInput[];
    OR?: Prisma.FinancingWhereInput[];
    NOT?: Prisma.FinancingWhereInput | Prisma.FinancingWhereInput[];
    id?: Prisma.StringFilter<"Financing"> | string;
    userId?: Prisma.StringFilter<"Financing"> | string;
    isActive?: Prisma.BoolFilter<"Financing"> | boolean;
    title?: Prisma.StringNullableFilter<"Financing"> | string | null;
    amount?: Prisma.DecimalFilter<"Financing"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    installmentAmount?: Prisma.DecimalFilter<"Financing"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    interestRate?: Prisma.DecimalNullableFilter<"Financing"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    installments?: Prisma.IntFilter<"Financing"> | number;
    startDate?: Prisma.DateTimeFilter<"Financing"> | Date | string;
    lateFeeRate?: Prisma.DecimalNullableFilter<"Financing"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    lateInterestRate?: Prisma.DecimalNullableFilter<"Financing"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdAt?: Prisma.DateTimeFilter<"Financing"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Financing"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    installmentsPaid?: Prisma.InstallmentsPaidListRelationFilter;
};
export type FinancingOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    title?: Prisma.SortOrderInput | Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    installmentAmount?: Prisma.SortOrder;
    interestRate?: Prisma.SortOrderInput | Prisma.SortOrder;
    installments?: Prisma.SortOrder;
    startDate?: Prisma.SortOrder;
    lateFeeRate?: Prisma.SortOrderInput | Prisma.SortOrder;
    lateInterestRate?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
    installmentsPaid?: Prisma.InstallmentsPaidOrderByRelationAggregateInput;
};
export type FinancingWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.FinancingWhereInput | Prisma.FinancingWhereInput[];
    OR?: Prisma.FinancingWhereInput[];
    NOT?: Prisma.FinancingWhereInput | Prisma.FinancingWhereInput[];
    userId?: Prisma.StringFilter<"Financing"> | string;
    isActive?: Prisma.BoolFilter<"Financing"> | boolean;
    title?: Prisma.StringNullableFilter<"Financing"> | string | null;
    amount?: Prisma.DecimalFilter<"Financing"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    installmentAmount?: Prisma.DecimalFilter<"Financing"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    interestRate?: Prisma.DecimalNullableFilter<"Financing"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    installments?: Prisma.IntFilter<"Financing"> | number;
    startDate?: Prisma.DateTimeFilter<"Financing"> | Date | string;
    lateFeeRate?: Prisma.DecimalNullableFilter<"Financing"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    lateInterestRate?: Prisma.DecimalNullableFilter<"Financing"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdAt?: Prisma.DateTimeFilter<"Financing"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Financing"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    installmentsPaid?: Prisma.InstallmentsPaidListRelationFilter;
}, "id">;
export type FinancingOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    title?: Prisma.SortOrderInput | Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    installmentAmount?: Prisma.SortOrder;
    interestRate?: Prisma.SortOrderInput | Prisma.SortOrder;
    installments?: Prisma.SortOrder;
    startDate?: Prisma.SortOrder;
    lateFeeRate?: Prisma.SortOrderInput | Prisma.SortOrder;
    lateInterestRate?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.FinancingCountOrderByAggregateInput;
    _avg?: Prisma.FinancingAvgOrderByAggregateInput;
    _max?: Prisma.FinancingMaxOrderByAggregateInput;
    _min?: Prisma.FinancingMinOrderByAggregateInput;
    _sum?: Prisma.FinancingSumOrderByAggregateInput;
};
export type FinancingScalarWhereWithAggregatesInput = {
    AND?: Prisma.FinancingScalarWhereWithAggregatesInput | Prisma.FinancingScalarWhereWithAggregatesInput[];
    OR?: Prisma.FinancingScalarWhereWithAggregatesInput[];
    NOT?: Prisma.FinancingScalarWhereWithAggregatesInput | Prisma.FinancingScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Financing"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"Financing"> | string;
    isActive?: Prisma.BoolWithAggregatesFilter<"Financing"> | boolean;
    title?: Prisma.StringNullableWithAggregatesFilter<"Financing"> | string | null;
    amount?: Prisma.DecimalWithAggregatesFilter<"Financing"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    installmentAmount?: Prisma.DecimalWithAggregatesFilter<"Financing"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    interestRate?: Prisma.DecimalNullableWithAggregatesFilter<"Financing"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    installments?: Prisma.IntWithAggregatesFilter<"Financing"> | number;
    startDate?: Prisma.DateTimeWithAggregatesFilter<"Financing"> | Date | string;
    lateFeeRate?: Prisma.DecimalNullableWithAggregatesFilter<"Financing"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    lateInterestRate?: Prisma.DecimalNullableWithAggregatesFilter<"Financing"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Financing"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Financing"> | Date | string;
};
export type FinancingCreateInput = {
    id?: string;
    isActive?: boolean;
    title?: string | null;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    installmentAmount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    interestRate?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    installments: number;
    startDate: Date | string;
    lateFeeRate?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    lateInterestRate?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutFinancingsInput;
    installmentsPaid?: Prisma.InstallmentsPaidCreateNestedManyWithoutFinancingInput;
};
export type FinancingUncheckedCreateInput = {
    id?: string;
    userId: string;
    isActive?: boolean;
    title?: string | null;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    installmentAmount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    interestRate?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    installments: number;
    startDate: Date | string;
    lateFeeRate?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    lateInterestRate?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    installmentsPaid?: Prisma.InstallmentsPaidUncheckedCreateNestedManyWithoutFinancingInput;
};
export type FinancingUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    title?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    installmentAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    interestRate?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    installments?: Prisma.IntFieldUpdateOperationsInput | number;
    startDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lateFeeRate?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    lateInterestRate?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutFinancingsNestedInput;
    installmentsPaid?: Prisma.InstallmentsPaidUpdateManyWithoutFinancingNestedInput;
};
export type FinancingUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    title?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    installmentAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    interestRate?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    installments?: Prisma.IntFieldUpdateOperationsInput | number;
    startDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lateFeeRate?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    lateInterestRate?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    installmentsPaid?: Prisma.InstallmentsPaidUncheckedUpdateManyWithoutFinancingNestedInput;
};
export type FinancingCreateManyInput = {
    id?: string;
    userId: string;
    isActive?: boolean;
    title?: string | null;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    installmentAmount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    interestRate?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    installments: number;
    startDate: Date | string;
    lateFeeRate?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    lateInterestRate?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type FinancingUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    title?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    installmentAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    interestRate?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    installments?: Prisma.IntFieldUpdateOperationsInput | number;
    startDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lateFeeRate?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    lateInterestRate?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FinancingUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    title?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    installmentAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    interestRate?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    installments?: Prisma.IntFieldUpdateOperationsInput | number;
    startDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lateFeeRate?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    lateInterestRate?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FinancingListRelationFilter = {
    every?: Prisma.FinancingWhereInput;
    some?: Prisma.FinancingWhereInput;
    none?: Prisma.FinancingWhereInput;
};
export type FinancingOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type FinancingCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    installmentAmount?: Prisma.SortOrder;
    interestRate?: Prisma.SortOrder;
    installments?: Prisma.SortOrder;
    startDate?: Prisma.SortOrder;
    lateFeeRate?: Prisma.SortOrder;
    lateInterestRate?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type FinancingAvgOrderByAggregateInput = {
    amount?: Prisma.SortOrder;
    installmentAmount?: Prisma.SortOrder;
    interestRate?: Prisma.SortOrder;
    installments?: Prisma.SortOrder;
    lateFeeRate?: Prisma.SortOrder;
    lateInterestRate?: Prisma.SortOrder;
};
export type FinancingMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    installmentAmount?: Prisma.SortOrder;
    interestRate?: Prisma.SortOrder;
    installments?: Prisma.SortOrder;
    startDate?: Prisma.SortOrder;
    lateFeeRate?: Prisma.SortOrder;
    lateInterestRate?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type FinancingMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    installmentAmount?: Prisma.SortOrder;
    interestRate?: Prisma.SortOrder;
    installments?: Prisma.SortOrder;
    startDate?: Prisma.SortOrder;
    lateFeeRate?: Prisma.SortOrder;
    lateInterestRate?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type FinancingSumOrderByAggregateInput = {
    amount?: Prisma.SortOrder;
    installmentAmount?: Prisma.SortOrder;
    interestRate?: Prisma.SortOrder;
    installments?: Prisma.SortOrder;
    lateFeeRate?: Prisma.SortOrder;
    lateInterestRate?: Prisma.SortOrder;
};
export type FinancingScalarRelationFilter = {
    is?: Prisma.FinancingWhereInput;
    isNot?: Prisma.FinancingWhereInput;
};
export type FinancingCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.FinancingCreateWithoutUserInput, Prisma.FinancingUncheckedCreateWithoutUserInput> | Prisma.FinancingCreateWithoutUserInput[] | Prisma.FinancingUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.FinancingCreateOrConnectWithoutUserInput | Prisma.FinancingCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.FinancingCreateManyUserInputEnvelope;
    connect?: Prisma.FinancingWhereUniqueInput | Prisma.FinancingWhereUniqueInput[];
};
export type FinancingUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.FinancingCreateWithoutUserInput, Prisma.FinancingUncheckedCreateWithoutUserInput> | Prisma.FinancingCreateWithoutUserInput[] | Prisma.FinancingUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.FinancingCreateOrConnectWithoutUserInput | Prisma.FinancingCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.FinancingCreateManyUserInputEnvelope;
    connect?: Prisma.FinancingWhereUniqueInput | Prisma.FinancingWhereUniqueInput[];
};
export type FinancingUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.FinancingCreateWithoutUserInput, Prisma.FinancingUncheckedCreateWithoutUserInput> | Prisma.FinancingCreateWithoutUserInput[] | Prisma.FinancingUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.FinancingCreateOrConnectWithoutUserInput | Prisma.FinancingCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.FinancingUpsertWithWhereUniqueWithoutUserInput | Prisma.FinancingUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.FinancingCreateManyUserInputEnvelope;
    set?: Prisma.FinancingWhereUniqueInput | Prisma.FinancingWhereUniqueInput[];
    disconnect?: Prisma.FinancingWhereUniqueInput | Prisma.FinancingWhereUniqueInput[];
    delete?: Prisma.FinancingWhereUniqueInput | Prisma.FinancingWhereUniqueInput[];
    connect?: Prisma.FinancingWhereUniqueInput | Prisma.FinancingWhereUniqueInput[];
    update?: Prisma.FinancingUpdateWithWhereUniqueWithoutUserInput | Prisma.FinancingUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.FinancingUpdateManyWithWhereWithoutUserInput | Prisma.FinancingUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.FinancingScalarWhereInput | Prisma.FinancingScalarWhereInput[];
};
export type FinancingUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.FinancingCreateWithoutUserInput, Prisma.FinancingUncheckedCreateWithoutUserInput> | Prisma.FinancingCreateWithoutUserInput[] | Prisma.FinancingUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.FinancingCreateOrConnectWithoutUserInput | Prisma.FinancingCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.FinancingUpsertWithWhereUniqueWithoutUserInput | Prisma.FinancingUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.FinancingCreateManyUserInputEnvelope;
    set?: Prisma.FinancingWhereUniqueInput | Prisma.FinancingWhereUniqueInput[];
    disconnect?: Prisma.FinancingWhereUniqueInput | Prisma.FinancingWhereUniqueInput[];
    delete?: Prisma.FinancingWhereUniqueInput | Prisma.FinancingWhereUniqueInput[];
    connect?: Prisma.FinancingWhereUniqueInput | Prisma.FinancingWhereUniqueInput[];
    update?: Prisma.FinancingUpdateWithWhereUniqueWithoutUserInput | Prisma.FinancingUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.FinancingUpdateManyWithWhereWithoutUserInput | Prisma.FinancingUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.FinancingScalarWhereInput | Prisma.FinancingScalarWhereInput[];
};
export type FinancingCreateNestedOneWithoutInstallmentsPaidInput = {
    create?: Prisma.XOR<Prisma.FinancingCreateWithoutInstallmentsPaidInput, Prisma.FinancingUncheckedCreateWithoutInstallmentsPaidInput>;
    connectOrCreate?: Prisma.FinancingCreateOrConnectWithoutInstallmentsPaidInput;
    connect?: Prisma.FinancingWhereUniqueInput;
};
export type FinancingUpdateOneRequiredWithoutInstallmentsPaidNestedInput = {
    create?: Prisma.XOR<Prisma.FinancingCreateWithoutInstallmentsPaidInput, Prisma.FinancingUncheckedCreateWithoutInstallmentsPaidInput>;
    connectOrCreate?: Prisma.FinancingCreateOrConnectWithoutInstallmentsPaidInput;
    upsert?: Prisma.FinancingUpsertWithoutInstallmentsPaidInput;
    connect?: Prisma.FinancingWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.FinancingUpdateToOneWithWhereWithoutInstallmentsPaidInput, Prisma.FinancingUpdateWithoutInstallmentsPaidInput>, Prisma.FinancingUncheckedUpdateWithoutInstallmentsPaidInput>;
};
export type FinancingCreateWithoutUserInput = {
    id?: string;
    isActive?: boolean;
    title?: string | null;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    installmentAmount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    interestRate?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    installments: number;
    startDate: Date | string;
    lateFeeRate?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    lateInterestRate?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    installmentsPaid?: Prisma.InstallmentsPaidCreateNestedManyWithoutFinancingInput;
};
export type FinancingUncheckedCreateWithoutUserInput = {
    id?: string;
    isActive?: boolean;
    title?: string | null;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    installmentAmount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    interestRate?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    installments: number;
    startDate: Date | string;
    lateFeeRate?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    lateInterestRate?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    installmentsPaid?: Prisma.InstallmentsPaidUncheckedCreateNestedManyWithoutFinancingInput;
};
export type FinancingCreateOrConnectWithoutUserInput = {
    where: Prisma.FinancingWhereUniqueInput;
    create: Prisma.XOR<Prisma.FinancingCreateWithoutUserInput, Prisma.FinancingUncheckedCreateWithoutUserInput>;
};
export type FinancingCreateManyUserInputEnvelope = {
    data: Prisma.FinancingCreateManyUserInput | Prisma.FinancingCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type FinancingUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.FinancingWhereUniqueInput;
    update: Prisma.XOR<Prisma.FinancingUpdateWithoutUserInput, Prisma.FinancingUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.FinancingCreateWithoutUserInput, Prisma.FinancingUncheckedCreateWithoutUserInput>;
};
export type FinancingUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.FinancingWhereUniqueInput;
    data: Prisma.XOR<Prisma.FinancingUpdateWithoutUserInput, Prisma.FinancingUncheckedUpdateWithoutUserInput>;
};
export type FinancingUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.FinancingScalarWhereInput;
    data: Prisma.XOR<Prisma.FinancingUpdateManyMutationInput, Prisma.FinancingUncheckedUpdateManyWithoutUserInput>;
};
export type FinancingScalarWhereInput = {
    AND?: Prisma.FinancingScalarWhereInput | Prisma.FinancingScalarWhereInput[];
    OR?: Prisma.FinancingScalarWhereInput[];
    NOT?: Prisma.FinancingScalarWhereInput | Prisma.FinancingScalarWhereInput[];
    id?: Prisma.StringFilter<"Financing"> | string;
    userId?: Prisma.StringFilter<"Financing"> | string;
    isActive?: Prisma.BoolFilter<"Financing"> | boolean;
    title?: Prisma.StringNullableFilter<"Financing"> | string | null;
    amount?: Prisma.DecimalFilter<"Financing"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    installmentAmount?: Prisma.DecimalFilter<"Financing"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    interestRate?: Prisma.DecimalNullableFilter<"Financing"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    installments?: Prisma.IntFilter<"Financing"> | number;
    startDate?: Prisma.DateTimeFilter<"Financing"> | Date | string;
    lateFeeRate?: Prisma.DecimalNullableFilter<"Financing"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    lateInterestRate?: Prisma.DecimalNullableFilter<"Financing"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdAt?: Prisma.DateTimeFilter<"Financing"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Financing"> | Date | string;
};
export type FinancingCreateWithoutInstallmentsPaidInput = {
    id?: string;
    isActive?: boolean;
    title?: string | null;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    installmentAmount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    interestRate?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    installments: number;
    startDate: Date | string;
    lateFeeRate?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    lateInterestRate?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutFinancingsInput;
};
export type FinancingUncheckedCreateWithoutInstallmentsPaidInput = {
    id?: string;
    userId: string;
    isActive?: boolean;
    title?: string | null;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    installmentAmount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    interestRate?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    installments: number;
    startDate: Date | string;
    lateFeeRate?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    lateInterestRate?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type FinancingCreateOrConnectWithoutInstallmentsPaidInput = {
    where: Prisma.FinancingWhereUniqueInput;
    create: Prisma.XOR<Prisma.FinancingCreateWithoutInstallmentsPaidInput, Prisma.FinancingUncheckedCreateWithoutInstallmentsPaidInput>;
};
export type FinancingUpsertWithoutInstallmentsPaidInput = {
    update: Prisma.XOR<Prisma.FinancingUpdateWithoutInstallmentsPaidInput, Prisma.FinancingUncheckedUpdateWithoutInstallmentsPaidInput>;
    create: Prisma.XOR<Prisma.FinancingCreateWithoutInstallmentsPaidInput, Prisma.FinancingUncheckedCreateWithoutInstallmentsPaidInput>;
    where?: Prisma.FinancingWhereInput;
};
export type FinancingUpdateToOneWithWhereWithoutInstallmentsPaidInput = {
    where?: Prisma.FinancingWhereInput;
    data: Prisma.XOR<Prisma.FinancingUpdateWithoutInstallmentsPaidInput, Prisma.FinancingUncheckedUpdateWithoutInstallmentsPaidInput>;
};
export type FinancingUpdateWithoutInstallmentsPaidInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    title?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    installmentAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    interestRate?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    installments?: Prisma.IntFieldUpdateOperationsInput | number;
    startDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lateFeeRate?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    lateInterestRate?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutFinancingsNestedInput;
};
export type FinancingUncheckedUpdateWithoutInstallmentsPaidInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    title?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    installmentAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    interestRate?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    installments?: Prisma.IntFieldUpdateOperationsInput | number;
    startDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lateFeeRate?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    lateInterestRate?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FinancingCreateManyUserInput = {
    id?: string;
    isActive?: boolean;
    title?: string | null;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    installmentAmount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    interestRate?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    installments: number;
    startDate: Date | string;
    lateFeeRate?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    lateInterestRate?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type FinancingUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    title?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    installmentAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    interestRate?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    installments?: Prisma.IntFieldUpdateOperationsInput | number;
    startDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lateFeeRate?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    lateInterestRate?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    installmentsPaid?: Prisma.InstallmentsPaidUpdateManyWithoutFinancingNestedInput;
};
export type FinancingUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    title?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    installmentAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    interestRate?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    installments?: Prisma.IntFieldUpdateOperationsInput | number;
    startDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lateFeeRate?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    lateInterestRate?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    installmentsPaid?: Prisma.InstallmentsPaidUncheckedUpdateManyWithoutFinancingNestedInput;
};
export type FinancingUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    title?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    installmentAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    interestRate?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    installments?: Prisma.IntFieldUpdateOperationsInput | number;
    startDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lateFeeRate?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    lateInterestRate?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
/**
 * Count Type FinancingCountOutputType
 */
export type FinancingCountOutputType = {
    installmentsPaid: number;
};
export type FinancingCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    installmentsPaid?: boolean | FinancingCountOutputTypeCountInstallmentsPaidArgs;
};
/**
 * FinancingCountOutputType without action
 */
export type FinancingCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FinancingCountOutputType
     */
    select?: Prisma.FinancingCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * FinancingCountOutputType without action
 */
export type FinancingCountOutputTypeCountInstallmentsPaidArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.InstallmentsPaidWhereInput;
};
export type FinancingSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    isActive?: boolean;
    title?: boolean;
    amount?: boolean;
    installmentAmount?: boolean;
    interestRate?: boolean;
    installments?: boolean;
    startDate?: boolean;
    lateFeeRate?: boolean;
    lateInterestRate?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    installmentsPaid?: boolean | Prisma.Financing$installmentsPaidArgs<ExtArgs>;
    _count?: boolean | Prisma.FinancingCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["financing"]>;
export type FinancingSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    isActive?: boolean;
    title?: boolean;
    amount?: boolean;
    installmentAmount?: boolean;
    interestRate?: boolean;
    installments?: boolean;
    startDate?: boolean;
    lateFeeRate?: boolean;
    lateInterestRate?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["financing"]>;
export type FinancingSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    isActive?: boolean;
    title?: boolean;
    amount?: boolean;
    installmentAmount?: boolean;
    interestRate?: boolean;
    installments?: boolean;
    startDate?: boolean;
    lateFeeRate?: boolean;
    lateInterestRate?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["financing"]>;
export type FinancingSelectScalar = {
    id?: boolean;
    userId?: boolean;
    isActive?: boolean;
    title?: boolean;
    amount?: boolean;
    installmentAmount?: boolean;
    interestRate?: boolean;
    installments?: boolean;
    startDate?: boolean;
    lateFeeRate?: boolean;
    lateInterestRate?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type FinancingOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "isActive" | "title" | "amount" | "installmentAmount" | "interestRate" | "installments" | "startDate" | "lateFeeRate" | "lateInterestRate" | "createdAt" | "updatedAt", ExtArgs["result"]["financing"]>;
export type FinancingInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    installmentsPaid?: boolean | Prisma.Financing$installmentsPaidArgs<ExtArgs>;
    _count?: boolean | Prisma.FinancingCountOutputTypeDefaultArgs<ExtArgs>;
};
export type FinancingIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type FinancingIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $FinancingPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Financing";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
        installmentsPaid: Prisma.$InstallmentsPaidPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        isActive: boolean;
        title: string | null;
        amount: runtime.Decimal;
        installmentAmount: runtime.Decimal;
        interestRate: runtime.Decimal | null;
        installments: number;
        startDate: Date;
        lateFeeRate: runtime.Decimal | null;
        lateInterestRate: runtime.Decimal | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["financing"]>;
    composites: {};
};
export type FinancingGetPayload<S extends boolean | null | undefined | FinancingDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$FinancingPayload, S>;
export type FinancingCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<FinancingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: FinancingCountAggregateInputType | true;
};
export interface FinancingDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Financing'];
        meta: {
            name: 'Financing';
        };
    };
    /**
     * Find zero or one Financing that matches the filter.
     * @param {FinancingFindUniqueArgs} args - Arguments to find a Financing
     * @example
     * // Get one Financing
     * const financing = await prisma.financing.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FinancingFindUniqueArgs>(args: Prisma.SelectSubset<T, FinancingFindUniqueArgs<ExtArgs>>): Prisma.Prisma__FinancingClient<runtime.Types.Result.GetResult<Prisma.$FinancingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one Financing that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FinancingFindUniqueOrThrowArgs} args - Arguments to find a Financing
     * @example
     * // Get one Financing
     * const financing = await prisma.financing.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FinancingFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, FinancingFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__FinancingClient<runtime.Types.Result.GetResult<Prisma.$FinancingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Financing that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FinancingFindFirstArgs} args - Arguments to find a Financing
     * @example
     * // Get one Financing
     * const financing = await prisma.financing.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FinancingFindFirstArgs>(args?: Prisma.SelectSubset<T, FinancingFindFirstArgs<ExtArgs>>): Prisma.Prisma__FinancingClient<runtime.Types.Result.GetResult<Prisma.$FinancingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Financing that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FinancingFindFirstOrThrowArgs} args - Arguments to find a Financing
     * @example
     * // Get one Financing
     * const financing = await prisma.financing.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FinancingFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, FinancingFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__FinancingClient<runtime.Types.Result.GetResult<Prisma.$FinancingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Financings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FinancingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Financings
     * const financings = await prisma.financing.findMany()
     *
     * // Get first 10 Financings
     * const financings = await prisma.financing.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const financingWithIdOnly = await prisma.financing.findMany({ select: { id: true } })
     *
     */
    findMany<T extends FinancingFindManyArgs>(args?: Prisma.SelectSubset<T, FinancingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FinancingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a Financing.
     * @param {FinancingCreateArgs} args - Arguments to create a Financing.
     * @example
     * // Create one Financing
     * const Financing = await prisma.financing.create({
     *   data: {
     *     // ... data to create a Financing
     *   }
     * })
     *
     */
    create<T extends FinancingCreateArgs>(args: Prisma.SelectSubset<T, FinancingCreateArgs<ExtArgs>>): Prisma.Prisma__FinancingClient<runtime.Types.Result.GetResult<Prisma.$FinancingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Financings.
     * @param {FinancingCreateManyArgs} args - Arguments to create many Financings.
     * @example
     * // Create many Financings
     * const financing = await prisma.financing.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends FinancingCreateManyArgs>(args?: Prisma.SelectSubset<T, FinancingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Financings and returns the data saved in the database.
     * @param {FinancingCreateManyAndReturnArgs} args - Arguments to create many Financings.
     * @example
     * // Create many Financings
     * const financing = await prisma.financing.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Financings and only return the `id`
     * const financingWithIdOnly = await prisma.financing.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends FinancingCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, FinancingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FinancingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a Financing.
     * @param {FinancingDeleteArgs} args - Arguments to delete one Financing.
     * @example
     * // Delete one Financing
     * const Financing = await prisma.financing.delete({
     *   where: {
     *     // ... filter to delete one Financing
     *   }
     * })
     *
     */
    delete<T extends FinancingDeleteArgs>(args: Prisma.SelectSubset<T, FinancingDeleteArgs<ExtArgs>>): Prisma.Prisma__FinancingClient<runtime.Types.Result.GetResult<Prisma.$FinancingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one Financing.
     * @param {FinancingUpdateArgs} args - Arguments to update one Financing.
     * @example
     * // Update one Financing
     * const financing = await prisma.financing.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends FinancingUpdateArgs>(args: Prisma.SelectSubset<T, FinancingUpdateArgs<ExtArgs>>): Prisma.Prisma__FinancingClient<runtime.Types.Result.GetResult<Prisma.$FinancingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Financings.
     * @param {FinancingDeleteManyArgs} args - Arguments to filter Financings to delete.
     * @example
     * // Delete a few Financings
     * const { count } = await prisma.financing.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends FinancingDeleteManyArgs>(args?: Prisma.SelectSubset<T, FinancingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Financings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FinancingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Financings
     * const financing = await prisma.financing.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends FinancingUpdateManyArgs>(args: Prisma.SelectSubset<T, FinancingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Financings and returns the data updated in the database.
     * @param {FinancingUpdateManyAndReturnArgs} args - Arguments to update many Financings.
     * @example
     * // Update many Financings
     * const financing = await prisma.financing.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Financings and only return the `id`
     * const financingWithIdOnly = await prisma.financing.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends FinancingUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, FinancingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FinancingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one Financing.
     * @param {FinancingUpsertArgs} args - Arguments to update or create a Financing.
     * @example
     * // Update or create a Financing
     * const financing = await prisma.financing.upsert({
     *   create: {
     *     // ... data to create a Financing
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Financing we want to update
     *   }
     * })
     */
    upsert<T extends FinancingUpsertArgs>(args: Prisma.SelectSubset<T, FinancingUpsertArgs<ExtArgs>>): Prisma.Prisma__FinancingClient<runtime.Types.Result.GetResult<Prisma.$FinancingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Financings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FinancingCountArgs} args - Arguments to filter Financings to count.
     * @example
     * // Count the number of Financings
     * const count = await prisma.financing.count({
     *   where: {
     *     // ... the filter for the Financings we want to count
     *   }
     * })
    **/
    count<T extends FinancingCountArgs>(args?: Prisma.Subset<T, FinancingCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], FinancingCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a Financing.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FinancingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FinancingAggregateArgs>(args: Prisma.Subset<T, FinancingAggregateArgs>): Prisma.PrismaPromise<GetFinancingAggregateType<T>>;
    /**
     * Group by Financing.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FinancingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
    **/
    groupBy<T extends FinancingGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: FinancingGroupByArgs['orderBy'];
    } : {
        orderBy?: FinancingGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, FinancingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFinancingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Financing model
     */
    readonly fields: FinancingFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for Financing.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__FinancingClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    installmentsPaid<T extends Prisma.Financing$installmentsPaidArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Financing$installmentsPaidArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$InstallmentsPaidPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
/**
 * Fields of the Financing model
 */
export interface FinancingFieldRefs {
    readonly id: Prisma.FieldRef<"Financing", 'String'>;
    readonly userId: Prisma.FieldRef<"Financing", 'String'>;
    readonly isActive: Prisma.FieldRef<"Financing", 'Boolean'>;
    readonly title: Prisma.FieldRef<"Financing", 'String'>;
    readonly amount: Prisma.FieldRef<"Financing", 'Decimal'>;
    readonly installmentAmount: Prisma.FieldRef<"Financing", 'Decimal'>;
    readonly interestRate: Prisma.FieldRef<"Financing", 'Decimal'>;
    readonly installments: Prisma.FieldRef<"Financing", 'Int'>;
    readonly startDate: Prisma.FieldRef<"Financing", 'DateTime'>;
    readonly lateFeeRate: Prisma.FieldRef<"Financing", 'Decimal'>;
    readonly lateInterestRate: Prisma.FieldRef<"Financing", 'Decimal'>;
    readonly createdAt: Prisma.FieldRef<"Financing", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Financing", 'DateTime'>;
}
/**
 * Financing findUnique
 */
export type FinancingFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Financing
     */
    select?: Prisma.FinancingSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Financing
     */
    omit?: Prisma.FinancingOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FinancingInclude<ExtArgs> | null;
    /**
     * Filter, which Financing to fetch.
     */
    where: Prisma.FinancingWhereUniqueInput;
};
/**
 * Financing findUniqueOrThrow
 */
export type FinancingFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Financing
     */
    select?: Prisma.FinancingSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Financing
     */
    omit?: Prisma.FinancingOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FinancingInclude<ExtArgs> | null;
    /**
     * Filter, which Financing to fetch.
     */
    where: Prisma.FinancingWhereUniqueInput;
};
/**
 * Financing findFirst
 */
export type FinancingFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Financing
     */
    select?: Prisma.FinancingSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Financing
     */
    omit?: Prisma.FinancingOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FinancingInclude<ExtArgs> | null;
    /**
     * Filter, which Financing to fetch.
     */
    where?: Prisma.FinancingWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Financings to fetch.
     */
    orderBy?: Prisma.FinancingOrderByWithRelationInput | Prisma.FinancingOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Financings.
     */
    cursor?: Prisma.FinancingWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Financings from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Financings.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Financings.
     */
    distinct?: Prisma.FinancingScalarFieldEnum | Prisma.FinancingScalarFieldEnum[];
};
/**
 * Financing findFirstOrThrow
 */
export type FinancingFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Financing
     */
    select?: Prisma.FinancingSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Financing
     */
    omit?: Prisma.FinancingOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FinancingInclude<ExtArgs> | null;
    /**
     * Filter, which Financing to fetch.
     */
    where?: Prisma.FinancingWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Financings to fetch.
     */
    orderBy?: Prisma.FinancingOrderByWithRelationInput | Prisma.FinancingOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Financings.
     */
    cursor?: Prisma.FinancingWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Financings from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Financings.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Financings.
     */
    distinct?: Prisma.FinancingScalarFieldEnum | Prisma.FinancingScalarFieldEnum[];
};
/**
 * Financing findMany
 */
export type FinancingFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Financing
     */
    select?: Prisma.FinancingSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Financing
     */
    omit?: Prisma.FinancingOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FinancingInclude<ExtArgs> | null;
    /**
     * Filter, which Financings to fetch.
     */
    where?: Prisma.FinancingWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Financings to fetch.
     */
    orderBy?: Prisma.FinancingOrderByWithRelationInput | Prisma.FinancingOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Financings.
     */
    cursor?: Prisma.FinancingWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Financings from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Financings.
     */
    skip?: number;
    distinct?: Prisma.FinancingScalarFieldEnum | Prisma.FinancingScalarFieldEnum[];
};
/**
 * Financing create
 */
export type FinancingCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Financing
     */
    select?: Prisma.FinancingSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Financing
     */
    omit?: Prisma.FinancingOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FinancingInclude<ExtArgs> | null;
    /**
     * The data needed to create a Financing.
     */
    data: Prisma.XOR<Prisma.FinancingCreateInput, Prisma.FinancingUncheckedCreateInput>;
};
/**
 * Financing createMany
 */
export type FinancingCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many Financings.
     */
    data: Prisma.FinancingCreateManyInput | Prisma.FinancingCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * Financing createManyAndReturn
 */
export type FinancingCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Financing
     */
    select?: Prisma.FinancingSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Financing
     */
    omit?: Prisma.FinancingOmit<ExtArgs> | null;
    /**
     * The data used to create many Financings.
     */
    data: Prisma.FinancingCreateManyInput | Prisma.FinancingCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FinancingIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * Financing update
 */
export type FinancingUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Financing
     */
    select?: Prisma.FinancingSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Financing
     */
    omit?: Prisma.FinancingOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FinancingInclude<ExtArgs> | null;
    /**
     * The data needed to update a Financing.
     */
    data: Prisma.XOR<Prisma.FinancingUpdateInput, Prisma.FinancingUncheckedUpdateInput>;
    /**
     * Choose, which Financing to update.
     */
    where: Prisma.FinancingWhereUniqueInput;
};
/**
 * Financing updateMany
 */
export type FinancingUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update Financings.
     */
    data: Prisma.XOR<Prisma.FinancingUpdateManyMutationInput, Prisma.FinancingUncheckedUpdateManyInput>;
    /**
     * Filter which Financings to update
     */
    where?: Prisma.FinancingWhereInput;
    /**
     * Limit how many Financings to update.
     */
    limit?: number;
};
/**
 * Financing updateManyAndReturn
 */
export type FinancingUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Financing
     */
    select?: Prisma.FinancingSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Financing
     */
    omit?: Prisma.FinancingOmit<ExtArgs> | null;
    /**
     * The data used to update Financings.
     */
    data: Prisma.XOR<Prisma.FinancingUpdateManyMutationInput, Prisma.FinancingUncheckedUpdateManyInput>;
    /**
     * Filter which Financings to update
     */
    where?: Prisma.FinancingWhereInput;
    /**
     * Limit how many Financings to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FinancingIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * Financing upsert
 */
export type FinancingUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Financing
     */
    select?: Prisma.FinancingSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Financing
     */
    omit?: Prisma.FinancingOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FinancingInclude<ExtArgs> | null;
    /**
     * The filter to search for the Financing to update in case it exists.
     */
    where: Prisma.FinancingWhereUniqueInput;
    /**
     * In case the Financing found by the `where` argument doesn't exist, create a new Financing with this data.
     */
    create: Prisma.XOR<Prisma.FinancingCreateInput, Prisma.FinancingUncheckedCreateInput>;
    /**
     * In case the Financing was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.FinancingUpdateInput, Prisma.FinancingUncheckedUpdateInput>;
};
/**
 * Financing delete
 */
export type FinancingDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Financing
     */
    select?: Prisma.FinancingSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Financing
     */
    omit?: Prisma.FinancingOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FinancingInclude<ExtArgs> | null;
    /**
     * Filter which Financing to delete.
     */
    where: Prisma.FinancingWhereUniqueInput;
};
/**
 * Financing deleteMany
 */
export type FinancingDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Financings to delete
     */
    where?: Prisma.FinancingWhereInput;
    /**
     * Limit how many Financings to delete.
     */
    limit?: number;
};
/**
 * Financing.installmentsPaid
 */
export type Financing$installmentsPaidArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InstallmentsPaid
     */
    select?: Prisma.InstallmentsPaidSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the InstallmentsPaid
     */
    omit?: Prisma.InstallmentsPaidOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.InstallmentsPaidInclude<ExtArgs> | null;
    where?: Prisma.InstallmentsPaidWhereInput;
    orderBy?: Prisma.InstallmentsPaidOrderByWithRelationInput | Prisma.InstallmentsPaidOrderByWithRelationInput[];
    cursor?: Prisma.InstallmentsPaidWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.InstallmentsPaidScalarFieldEnum | Prisma.InstallmentsPaidScalarFieldEnum[];
};
/**
 * Financing without action
 */
export type FinancingDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Financing
     */
    select?: Prisma.FinancingSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Financing
     */
    omit?: Prisma.FinancingOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FinancingInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=Financing.d.ts.map