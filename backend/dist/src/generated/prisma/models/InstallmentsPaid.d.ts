import type * as runtime from "@prisma/client/runtime/library";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model InstallmentsPaid
 *
 */
export type InstallmentsPaidModel = runtime.Types.Result.DefaultSelection<Prisma.$InstallmentsPaidPayload>;
export type AggregateInstallmentsPaid = {
    _count: InstallmentsPaidCountAggregateOutputType | null;
    _avg: InstallmentsPaidAvgAggregateOutputType | null;
    _sum: InstallmentsPaidSumAggregateOutputType | null;
    _min: InstallmentsPaidMinAggregateOutputType | null;
    _max: InstallmentsPaidMaxAggregateOutputType | null;
};
export type InstallmentsPaidAvgAggregateOutputType = {
    installmentNumber: number | null;
    amount: runtime.Decimal | null;
};
export type InstallmentsPaidSumAggregateOutputType = {
    installmentNumber: number | null;
    amount: runtime.Decimal | null;
};
export type InstallmentsPaidMinAggregateOutputType = {
    id: string | null;
    financingId: string | null;
    installmentNumber: number | null;
    amount: runtime.Decimal | null;
    paidAt: Date | null;
    createdAt: Date | null;
};
export type InstallmentsPaidMaxAggregateOutputType = {
    id: string | null;
    financingId: string | null;
    installmentNumber: number | null;
    amount: runtime.Decimal | null;
    paidAt: Date | null;
    createdAt: Date | null;
};
export type InstallmentsPaidCountAggregateOutputType = {
    id: number;
    financingId: number;
    installmentNumber: number;
    amount: number;
    paidAt: number;
    createdAt: number;
    _all: number;
};
export type InstallmentsPaidAvgAggregateInputType = {
    installmentNumber?: true;
    amount?: true;
};
export type InstallmentsPaidSumAggregateInputType = {
    installmentNumber?: true;
    amount?: true;
};
export type InstallmentsPaidMinAggregateInputType = {
    id?: true;
    financingId?: true;
    installmentNumber?: true;
    amount?: true;
    paidAt?: true;
    createdAt?: true;
};
export type InstallmentsPaidMaxAggregateInputType = {
    id?: true;
    financingId?: true;
    installmentNumber?: true;
    amount?: true;
    paidAt?: true;
    createdAt?: true;
};
export type InstallmentsPaidCountAggregateInputType = {
    id?: true;
    financingId?: true;
    installmentNumber?: true;
    amount?: true;
    paidAt?: true;
    createdAt?: true;
    _all?: true;
};
export type InstallmentsPaidAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which InstallmentsPaid to aggregate.
     */
    where?: Prisma.InstallmentsPaidWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of InstallmentsPaids to fetch.
     */
    orderBy?: Prisma.InstallmentsPaidOrderByWithRelationInput | Prisma.InstallmentsPaidOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.InstallmentsPaidWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` InstallmentsPaids from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` InstallmentsPaids.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned InstallmentsPaids
    **/
    _count?: true | InstallmentsPaidCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: InstallmentsPaidAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: InstallmentsPaidSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: InstallmentsPaidMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: InstallmentsPaidMaxAggregateInputType;
};
export type GetInstallmentsPaidAggregateType<T extends InstallmentsPaidAggregateArgs> = {
    [P in keyof T & keyof AggregateInstallmentsPaid]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateInstallmentsPaid[P]> : Prisma.GetScalarType<T[P], AggregateInstallmentsPaid[P]>;
};
export type InstallmentsPaidGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.InstallmentsPaidWhereInput;
    orderBy?: Prisma.InstallmentsPaidOrderByWithAggregationInput | Prisma.InstallmentsPaidOrderByWithAggregationInput[];
    by: Prisma.InstallmentsPaidScalarFieldEnum[] | Prisma.InstallmentsPaidScalarFieldEnum;
    having?: Prisma.InstallmentsPaidScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: InstallmentsPaidCountAggregateInputType | true;
    _avg?: InstallmentsPaidAvgAggregateInputType;
    _sum?: InstallmentsPaidSumAggregateInputType;
    _min?: InstallmentsPaidMinAggregateInputType;
    _max?: InstallmentsPaidMaxAggregateInputType;
};
export type InstallmentsPaidGroupByOutputType = {
    id: string;
    financingId: string;
    installmentNumber: number;
    amount: runtime.Decimal;
    paidAt: Date;
    createdAt: Date;
    _count: InstallmentsPaidCountAggregateOutputType | null;
    _avg: InstallmentsPaidAvgAggregateOutputType | null;
    _sum: InstallmentsPaidSumAggregateOutputType | null;
    _min: InstallmentsPaidMinAggregateOutputType | null;
    _max: InstallmentsPaidMaxAggregateOutputType | null;
};
type GetInstallmentsPaidGroupByPayload<T extends InstallmentsPaidGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<InstallmentsPaidGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof InstallmentsPaidGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], InstallmentsPaidGroupByOutputType[P]> : Prisma.GetScalarType<T[P], InstallmentsPaidGroupByOutputType[P]>;
}>>;
export type InstallmentsPaidWhereInput = {
    AND?: Prisma.InstallmentsPaidWhereInput | Prisma.InstallmentsPaidWhereInput[];
    OR?: Prisma.InstallmentsPaidWhereInput[];
    NOT?: Prisma.InstallmentsPaidWhereInput | Prisma.InstallmentsPaidWhereInput[];
    id?: Prisma.StringFilter<"InstallmentsPaid"> | string;
    financingId?: Prisma.StringFilter<"InstallmentsPaid"> | string;
    installmentNumber?: Prisma.IntFilter<"InstallmentsPaid"> | number;
    amount?: Prisma.DecimalFilter<"InstallmentsPaid"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    paidAt?: Prisma.DateTimeFilter<"InstallmentsPaid"> | Date | string;
    createdAt?: Prisma.DateTimeFilter<"InstallmentsPaid"> | Date | string;
    financing?: Prisma.XOR<Prisma.FinancingScalarRelationFilter, Prisma.FinancingWhereInput>;
};
export type InstallmentsPaidOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    financingId?: Prisma.SortOrder;
    installmentNumber?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    paidAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    financing?: Prisma.FinancingOrderByWithRelationInput;
};
export type InstallmentsPaidWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    financingId_installmentNumber?: Prisma.InstallmentsPaidFinancingIdInstallmentNumberCompoundUniqueInput;
    AND?: Prisma.InstallmentsPaidWhereInput | Prisma.InstallmentsPaidWhereInput[];
    OR?: Prisma.InstallmentsPaidWhereInput[];
    NOT?: Prisma.InstallmentsPaidWhereInput | Prisma.InstallmentsPaidWhereInput[];
    financingId?: Prisma.StringFilter<"InstallmentsPaid"> | string;
    installmentNumber?: Prisma.IntFilter<"InstallmentsPaid"> | number;
    amount?: Prisma.DecimalFilter<"InstallmentsPaid"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    paidAt?: Prisma.DateTimeFilter<"InstallmentsPaid"> | Date | string;
    createdAt?: Prisma.DateTimeFilter<"InstallmentsPaid"> | Date | string;
    financing?: Prisma.XOR<Prisma.FinancingScalarRelationFilter, Prisma.FinancingWhereInput>;
}, "id" | "financingId_installmentNumber">;
export type InstallmentsPaidOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    financingId?: Prisma.SortOrder;
    installmentNumber?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    paidAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.InstallmentsPaidCountOrderByAggregateInput;
    _avg?: Prisma.InstallmentsPaidAvgOrderByAggregateInput;
    _max?: Prisma.InstallmentsPaidMaxOrderByAggregateInput;
    _min?: Prisma.InstallmentsPaidMinOrderByAggregateInput;
    _sum?: Prisma.InstallmentsPaidSumOrderByAggregateInput;
};
export type InstallmentsPaidScalarWhereWithAggregatesInput = {
    AND?: Prisma.InstallmentsPaidScalarWhereWithAggregatesInput | Prisma.InstallmentsPaidScalarWhereWithAggregatesInput[];
    OR?: Prisma.InstallmentsPaidScalarWhereWithAggregatesInput[];
    NOT?: Prisma.InstallmentsPaidScalarWhereWithAggregatesInput | Prisma.InstallmentsPaidScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"InstallmentsPaid"> | string;
    financingId?: Prisma.StringWithAggregatesFilter<"InstallmentsPaid"> | string;
    installmentNumber?: Prisma.IntWithAggregatesFilter<"InstallmentsPaid"> | number;
    amount?: Prisma.DecimalWithAggregatesFilter<"InstallmentsPaid"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    paidAt?: Prisma.DateTimeWithAggregatesFilter<"InstallmentsPaid"> | Date | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"InstallmentsPaid"> | Date | string;
};
export type InstallmentsPaidCreateInput = {
    id?: string;
    installmentNumber: number;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    paidAt?: Date | string;
    createdAt?: Date | string;
    financing: Prisma.FinancingCreateNestedOneWithoutInstallmentsPaidInput;
};
export type InstallmentsPaidUncheckedCreateInput = {
    id?: string;
    financingId: string;
    installmentNumber: number;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    paidAt?: Date | string;
    createdAt?: Date | string;
};
export type InstallmentsPaidUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    installmentNumber?: Prisma.IntFieldUpdateOperationsInput | number;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    paidAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    financing?: Prisma.FinancingUpdateOneRequiredWithoutInstallmentsPaidNestedInput;
};
export type InstallmentsPaidUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    financingId?: Prisma.StringFieldUpdateOperationsInput | string;
    installmentNumber?: Prisma.IntFieldUpdateOperationsInput | number;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    paidAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InstallmentsPaidCreateManyInput = {
    id?: string;
    financingId: string;
    installmentNumber: number;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    paidAt?: Date | string;
    createdAt?: Date | string;
};
export type InstallmentsPaidUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    installmentNumber?: Prisma.IntFieldUpdateOperationsInput | number;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    paidAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InstallmentsPaidUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    financingId?: Prisma.StringFieldUpdateOperationsInput | string;
    installmentNumber?: Prisma.IntFieldUpdateOperationsInput | number;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    paidAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InstallmentsPaidListRelationFilter = {
    every?: Prisma.InstallmentsPaidWhereInput;
    some?: Prisma.InstallmentsPaidWhereInput;
    none?: Prisma.InstallmentsPaidWhereInput;
};
export type InstallmentsPaidOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type InstallmentsPaidFinancingIdInstallmentNumberCompoundUniqueInput = {
    financingId: string;
    installmentNumber: number;
};
export type InstallmentsPaidCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    financingId?: Prisma.SortOrder;
    installmentNumber?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    paidAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type InstallmentsPaidAvgOrderByAggregateInput = {
    installmentNumber?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
};
export type InstallmentsPaidMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    financingId?: Prisma.SortOrder;
    installmentNumber?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    paidAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type InstallmentsPaidMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    financingId?: Prisma.SortOrder;
    installmentNumber?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    paidAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type InstallmentsPaidSumOrderByAggregateInput = {
    installmentNumber?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
};
export type InstallmentsPaidCreateNestedManyWithoutFinancingInput = {
    create?: Prisma.XOR<Prisma.InstallmentsPaidCreateWithoutFinancingInput, Prisma.InstallmentsPaidUncheckedCreateWithoutFinancingInput> | Prisma.InstallmentsPaidCreateWithoutFinancingInput[] | Prisma.InstallmentsPaidUncheckedCreateWithoutFinancingInput[];
    connectOrCreate?: Prisma.InstallmentsPaidCreateOrConnectWithoutFinancingInput | Prisma.InstallmentsPaidCreateOrConnectWithoutFinancingInput[];
    createMany?: Prisma.InstallmentsPaidCreateManyFinancingInputEnvelope;
    connect?: Prisma.InstallmentsPaidWhereUniqueInput | Prisma.InstallmentsPaidWhereUniqueInput[];
};
export type InstallmentsPaidUncheckedCreateNestedManyWithoutFinancingInput = {
    create?: Prisma.XOR<Prisma.InstallmentsPaidCreateWithoutFinancingInput, Prisma.InstallmentsPaidUncheckedCreateWithoutFinancingInput> | Prisma.InstallmentsPaidCreateWithoutFinancingInput[] | Prisma.InstallmentsPaidUncheckedCreateWithoutFinancingInput[];
    connectOrCreate?: Prisma.InstallmentsPaidCreateOrConnectWithoutFinancingInput | Prisma.InstallmentsPaidCreateOrConnectWithoutFinancingInput[];
    createMany?: Prisma.InstallmentsPaidCreateManyFinancingInputEnvelope;
    connect?: Prisma.InstallmentsPaidWhereUniqueInput | Prisma.InstallmentsPaidWhereUniqueInput[];
};
export type InstallmentsPaidUpdateManyWithoutFinancingNestedInput = {
    create?: Prisma.XOR<Prisma.InstallmentsPaidCreateWithoutFinancingInput, Prisma.InstallmentsPaidUncheckedCreateWithoutFinancingInput> | Prisma.InstallmentsPaidCreateWithoutFinancingInput[] | Prisma.InstallmentsPaidUncheckedCreateWithoutFinancingInput[];
    connectOrCreate?: Prisma.InstallmentsPaidCreateOrConnectWithoutFinancingInput | Prisma.InstallmentsPaidCreateOrConnectWithoutFinancingInput[];
    upsert?: Prisma.InstallmentsPaidUpsertWithWhereUniqueWithoutFinancingInput | Prisma.InstallmentsPaidUpsertWithWhereUniqueWithoutFinancingInput[];
    createMany?: Prisma.InstallmentsPaidCreateManyFinancingInputEnvelope;
    set?: Prisma.InstallmentsPaidWhereUniqueInput | Prisma.InstallmentsPaidWhereUniqueInput[];
    disconnect?: Prisma.InstallmentsPaidWhereUniqueInput | Prisma.InstallmentsPaidWhereUniqueInput[];
    delete?: Prisma.InstallmentsPaidWhereUniqueInput | Prisma.InstallmentsPaidWhereUniqueInput[];
    connect?: Prisma.InstallmentsPaidWhereUniqueInput | Prisma.InstallmentsPaidWhereUniqueInput[];
    update?: Prisma.InstallmentsPaidUpdateWithWhereUniqueWithoutFinancingInput | Prisma.InstallmentsPaidUpdateWithWhereUniqueWithoutFinancingInput[];
    updateMany?: Prisma.InstallmentsPaidUpdateManyWithWhereWithoutFinancingInput | Prisma.InstallmentsPaidUpdateManyWithWhereWithoutFinancingInput[];
    deleteMany?: Prisma.InstallmentsPaidScalarWhereInput | Prisma.InstallmentsPaidScalarWhereInput[];
};
export type InstallmentsPaidUncheckedUpdateManyWithoutFinancingNestedInput = {
    create?: Prisma.XOR<Prisma.InstallmentsPaidCreateWithoutFinancingInput, Prisma.InstallmentsPaidUncheckedCreateWithoutFinancingInput> | Prisma.InstallmentsPaidCreateWithoutFinancingInput[] | Prisma.InstallmentsPaidUncheckedCreateWithoutFinancingInput[];
    connectOrCreate?: Prisma.InstallmentsPaidCreateOrConnectWithoutFinancingInput | Prisma.InstallmentsPaidCreateOrConnectWithoutFinancingInput[];
    upsert?: Prisma.InstallmentsPaidUpsertWithWhereUniqueWithoutFinancingInput | Prisma.InstallmentsPaidUpsertWithWhereUniqueWithoutFinancingInput[];
    createMany?: Prisma.InstallmentsPaidCreateManyFinancingInputEnvelope;
    set?: Prisma.InstallmentsPaidWhereUniqueInput | Prisma.InstallmentsPaidWhereUniqueInput[];
    disconnect?: Prisma.InstallmentsPaidWhereUniqueInput | Prisma.InstallmentsPaidWhereUniqueInput[];
    delete?: Prisma.InstallmentsPaidWhereUniqueInput | Prisma.InstallmentsPaidWhereUniqueInput[];
    connect?: Prisma.InstallmentsPaidWhereUniqueInput | Prisma.InstallmentsPaidWhereUniqueInput[];
    update?: Prisma.InstallmentsPaidUpdateWithWhereUniqueWithoutFinancingInput | Prisma.InstallmentsPaidUpdateWithWhereUniqueWithoutFinancingInput[];
    updateMany?: Prisma.InstallmentsPaidUpdateManyWithWhereWithoutFinancingInput | Prisma.InstallmentsPaidUpdateManyWithWhereWithoutFinancingInput[];
    deleteMany?: Prisma.InstallmentsPaidScalarWhereInput | Prisma.InstallmentsPaidScalarWhereInput[];
};
export type InstallmentsPaidCreateWithoutFinancingInput = {
    id?: string;
    installmentNumber: number;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    paidAt?: Date | string;
    createdAt?: Date | string;
};
export type InstallmentsPaidUncheckedCreateWithoutFinancingInput = {
    id?: string;
    installmentNumber: number;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    paidAt?: Date | string;
    createdAt?: Date | string;
};
export type InstallmentsPaidCreateOrConnectWithoutFinancingInput = {
    where: Prisma.InstallmentsPaidWhereUniqueInput;
    create: Prisma.XOR<Prisma.InstallmentsPaidCreateWithoutFinancingInput, Prisma.InstallmentsPaidUncheckedCreateWithoutFinancingInput>;
};
export type InstallmentsPaidCreateManyFinancingInputEnvelope = {
    data: Prisma.InstallmentsPaidCreateManyFinancingInput | Prisma.InstallmentsPaidCreateManyFinancingInput[];
    skipDuplicates?: boolean;
};
export type InstallmentsPaidUpsertWithWhereUniqueWithoutFinancingInput = {
    where: Prisma.InstallmentsPaidWhereUniqueInput;
    update: Prisma.XOR<Prisma.InstallmentsPaidUpdateWithoutFinancingInput, Prisma.InstallmentsPaidUncheckedUpdateWithoutFinancingInput>;
    create: Prisma.XOR<Prisma.InstallmentsPaidCreateWithoutFinancingInput, Prisma.InstallmentsPaidUncheckedCreateWithoutFinancingInput>;
};
export type InstallmentsPaidUpdateWithWhereUniqueWithoutFinancingInput = {
    where: Prisma.InstallmentsPaidWhereUniqueInput;
    data: Prisma.XOR<Prisma.InstallmentsPaidUpdateWithoutFinancingInput, Prisma.InstallmentsPaidUncheckedUpdateWithoutFinancingInput>;
};
export type InstallmentsPaidUpdateManyWithWhereWithoutFinancingInput = {
    where: Prisma.InstallmentsPaidScalarWhereInput;
    data: Prisma.XOR<Prisma.InstallmentsPaidUpdateManyMutationInput, Prisma.InstallmentsPaidUncheckedUpdateManyWithoutFinancingInput>;
};
export type InstallmentsPaidScalarWhereInput = {
    AND?: Prisma.InstallmentsPaidScalarWhereInput | Prisma.InstallmentsPaidScalarWhereInput[];
    OR?: Prisma.InstallmentsPaidScalarWhereInput[];
    NOT?: Prisma.InstallmentsPaidScalarWhereInput | Prisma.InstallmentsPaidScalarWhereInput[];
    id?: Prisma.StringFilter<"InstallmentsPaid"> | string;
    financingId?: Prisma.StringFilter<"InstallmentsPaid"> | string;
    installmentNumber?: Prisma.IntFilter<"InstallmentsPaid"> | number;
    amount?: Prisma.DecimalFilter<"InstallmentsPaid"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    paidAt?: Prisma.DateTimeFilter<"InstallmentsPaid"> | Date | string;
    createdAt?: Prisma.DateTimeFilter<"InstallmentsPaid"> | Date | string;
};
export type InstallmentsPaidCreateManyFinancingInput = {
    id?: string;
    installmentNumber: number;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    paidAt?: Date | string;
    createdAt?: Date | string;
};
export type InstallmentsPaidUpdateWithoutFinancingInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    installmentNumber?: Prisma.IntFieldUpdateOperationsInput | number;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    paidAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InstallmentsPaidUncheckedUpdateWithoutFinancingInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    installmentNumber?: Prisma.IntFieldUpdateOperationsInput | number;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    paidAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InstallmentsPaidUncheckedUpdateManyWithoutFinancingInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    installmentNumber?: Prisma.IntFieldUpdateOperationsInput | number;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    paidAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InstallmentsPaidSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    financingId?: boolean;
    installmentNumber?: boolean;
    amount?: boolean;
    paidAt?: boolean;
    createdAt?: boolean;
    financing?: boolean | Prisma.FinancingDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["installmentsPaid"]>;
export type InstallmentsPaidSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    financingId?: boolean;
    installmentNumber?: boolean;
    amount?: boolean;
    paidAt?: boolean;
    createdAt?: boolean;
    financing?: boolean | Prisma.FinancingDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["installmentsPaid"]>;
export type InstallmentsPaidSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    financingId?: boolean;
    installmentNumber?: boolean;
    amount?: boolean;
    paidAt?: boolean;
    createdAt?: boolean;
    financing?: boolean | Prisma.FinancingDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["installmentsPaid"]>;
export type InstallmentsPaidSelectScalar = {
    id?: boolean;
    financingId?: boolean;
    installmentNumber?: boolean;
    amount?: boolean;
    paidAt?: boolean;
    createdAt?: boolean;
};
export type InstallmentsPaidOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "financingId" | "installmentNumber" | "amount" | "paidAt" | "createdAt", ExtArgs["result"]["installmentsPaid"]>;
export type InstallmentsPaidInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    financing?: boolean | Prisma.FinancingDefaultArgs<ExtArgs>;
};
export type InstallmentsPaidIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    financing?: boolean | Prisma.FinancingDefaultArgs<ExtArgs>;
};
export type InstallmentsPaidIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    financing?: boolean | Prisma.FinancingDefaultArgs<ExtArgs>;
};
export type $InstallmentsPaidPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "InstallmentsPaid";
    objects: {
        financing: Prisma.$FinancingPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        financingId: string;
        installmentNumber: number;
        amount: runtime.Decimal;
        paidAt: Date;
        createdAt: Date;
    }, ExtArgs["result"]["installmentsPaid"]>;
    composites: {};
};
export type InstallmentsPaidGetPayload<S extends boolean | null | undefined | InstallmentsPaidDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$InstallmentsPaidPayload, S>;
export type InstallmentsPaidCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<InstallmentsPaidFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: InstallmentsPaidCountAggregateInputType | true;
};
export interface InstallmentsPaidDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['InstallmentsPaid'];
        meta: {
            name: 'InstallmentsPaid';
        };
    };
    /**
     * Find zero or one InstallmentsPaid that matches the filter.
     * @param {InstallmentsPaidFindUniqueArgs} args - Arguments to find a InstallmentsPaid
     * @example
     * // Get one InstallmentsPaid
     * const installmentsPaid = await prisma.installmentsPaid.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends InstallmentsPaidFindUniqueArgs>(args: Prisma.SelectSubset<T, InstallmentsPaidFindUniqueArgs<ExtArgs>>): Prisma.Prisma__InstallmentsPaidClient<runtime.Types.Result.GetResult<Prisma.$InstallmentsPaidPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one InstallmentsPaid that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {InstallmentsPaidFindUniqueOrThrowArgs} args - Arguments to find a InstallmentsPaid
     * @example
     * // Get one InstallmentsPaid
     * const installmentsPaid = await prisma.installmentsPaid.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends InstallmentsPaidFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, InstallmentsPaidFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__InstallmentsPaidClient<runtime.Types.Result.GetResult<Prisma.$InstallmentsPaidPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first InstallmentsPaid that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstallmentsPaidFindFirstArgs} args - Arguments to find a InstallmentsPaid
     * @example
     * // Get one InstallmentsPaid
     * const installmentsPaid = await prisma.installmentsPaid.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends InstallmentsPaidFindFirstArgs>(args?: Prisma.SelectSubset<T, InstallmentsPaidFindFirstArgs<ExtArgs>>): Prisma.Prisma__InstallmentsPaidClient<runtime.Types.Result.GetResult<Prisma.$InstallmentsPaidPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first InstallmentsPaid that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstallmentsPaidFindFirstOrThrowArgs} args - Arguments to find a InstallmentsPaid
     * @example
     * // Get one InstallmentsPaid
     * const installmentsPaid = await prisma.installmentsPaid.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends InstallmentsPaidFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, InstallmentsPaidFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__InstallmentsPaidClient<runtime.Types.Result.GetResult<Prisma.$InstallmentsPaidPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more InstallmentsPaids that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstallmentsPaidFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all InstallmentsPaids
     * const installmentsPaids = await prisma.installmentsPaid.findMany()
     *
     * // Get first 10 InstallmentsPaids
     * const installmentsPaids = await prisma.installmentsPaid.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const installmentsPaidWithIdOnly = await prisma.installmentsPaid.findMany({ select: { id: true } })
     *
     */
    findMany<T extends InstallmentsPaidFindManyArgs>(args?: Prisma.SelectSubset<T, InstallmentsPaidFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$InstallmentsPaidPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a InstallmentsPaid.
     * @param {InstallmentsPaidCreateArgs} args - Arguments to create a InstallmentsPaid.
     * @example
     * // Create one InstallmentsPaid
     * const InstallmentsPaid = await prisma.installmentsPaid.create({
     *   data: {
     *     // ... data to create a InstallmentsPaid
     *   }
     * })
     *
     */
    create<T extends InstallmentsPaidCreateArgs>(args: Prisma.SelectSubset<T, InstallmentsPaidCreateArgs<ExtArgs>>): Prisma.Prisma__InstallmentsPaidClient<runtime.Types.Result.GetResult<Prisma.$InstallmentsPaidPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many InstallmentsPaids.
     * @param {InstallmentsPaidCreateManyArgs} args - Arguments to create many InstallmentsPaids.
     * @example
     * // Create many InstallmentsPaids
     * const installmentsPaid = await prisma.installmentsPaid.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends InstallmentsPaidCreateManyArgs>(args?: Prisma.SelectSubset<T, InstallmentsPaidCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many InstallmentsPaids and returns the data saved in the database.
     * @param {InstallmentsPaidCreateManyAndReturnArgs} args - Arguments to create many InstallmentsPaids.
     * @example
     * // Create many InstallmentsPaids
     * const installmentsPaid = await prisma.installmentsPaid.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many InstallmentsPaids and only return the `id`
     * const installmentsPaidWithIdOnly = await prisma.installmentsPaid.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends InstallmentsPaidCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, InstallmentsPaidCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$InstallmentsPaidPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a InstallmentsPaid.
     * @param {InstallmentsPaidDeleteArgs} args - Arguments to delete one InstallmentsPaid.
     * @example
     * // Delete one InstallmentsPaid
     * const InstallmentsPaid = await prisma.installmentsPaid.delete({
     *   where: {
     *     // ... filter to delete one InstallmentsPaid
     *   }
     * })
     *
     */
    delete<T extends InstallmentsPaidDeleteArgs>(args: Prisma.SelectSubset<T, InstallmentsPaidDeleteArgs<ExtArgs>>): Prisma.Prisma__InstallmentsPaidClient<runtime.Types.Result.GetResult<Prisma.$InstallmentsPaidPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one InstallmentsPaid.
     * @param {InstallmentsPaidUpdateArgs} args - Arguments to update one InstallmentsPaid.
     * @example
     * // Update one InstallmentsPaid
     * const installmentsPaid = await prisma.installmentsPaid.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends InstallmentsPaidUpdateArgs>(args: Prisma.SelectSubset<T, InstallmentsPaidUpdateArgs<ExtArgs>>): Prisma.Prisma__InstallmentsPaidClient<runtime.Types.Result.GetResult<Prisma.$InstallmentsPaidPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more InstallmentsPaids.
     * @param {InstallmentsPaidDeleteManyArgs} args - Arguments to filter InstallmentsPaids to delete.
     * @example
     * // Delete a few InstallmentsPaids
     * const { count } = await prisma.installmentsPaid.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends InstallmentsPaidDeleteManyArgs>(args?: Prisma.SelectSubset<T, InstallmentsPaidDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more InstallmentsPaids.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstallmentsPaidUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many InstallmentsPaids
     * const installmentsPaid = await prisma.installmentsPaid.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends InstallmentsPaidUpdateManyArgs>(args: Prisma.SelectSubset<T, InstallmentsPaidUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more InstallmentsPaids and returns the data updated in the database.
     * @param {InstallmentsPaidUpdateManyAndReturnArgs} args - Arguments to update many InstallmentsPaids.
     * @example
     * // Update many InstallmentsPaids
     * const installmentsPaid = await prisma.installmentsPaid.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more InstallmentsPaids and only return the `id`
     * const installmentsPaidWithIdOnly = await prisma.installmentsPaid.updateManyAndReturn({
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
    updateManyAndReturn<T extends InstallmentsPaidUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, InstallmentsPaidUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$InstallmentsPaidPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one InstallmentsPaid.
     * @param {InstallmentsPaidUpsertArgs} args - Arguments to update or create a InstallmentsPaid.
     * @example
     * // Update or create a InstallmentsPaid
     * const installmentsPaid = await prisma.installmentsPaid.upsert({
     *   create: {
     *     // ... data to create a InstallmentsPaid
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the InstallmentsPaid we want to update
     *   }
     * })
     */
    upsert<T extends InstallmentsPaidUpsertArgs>(args: Prisma.SelectSubset<T, InstallmentsPaidUpsertArgs<ExtArgs>>): Prisma.Prisma__InstallmentsPaidClient<runtime.Types.Result.GetResult<Prisma.$InstallmentsPaidPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of InstallmentsPaids.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstallmentsPaidCountArgs} args - Arguments to filter InstallmentsPaids to count.
     * @example
     * // Count the number of InstallmentsPaids
     * const count = await prisma.installmentsPaid.count({
     *   where: {
     *     // ... the filter for the InstallmentsPaids we want to count
     *   }
     * })
    **/
    count<T extends InstallmentsPaidCountArgs>(args?: Prisma.Subset<T, InstallmentsPaidCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], InstallmentsPaidCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a InstallmentsPaid.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstallmentsPaidAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends InstallmentsPaidAggregateArgs>(args: Prisma.Subset<T, InstallmentsPaidAggregateArgs>): Prisma.PrismaPromise<GetInstallmentsPaidAggregateType<T>>;
    /**
     * Group by InstallmentsPaid.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstallmentsPaidGroupByArgs} args - Group by arguments.
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
    groupBy<T extends InstallmentsPaidGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: InstallmentsPaidGroupByArgs['orderBy'];
    } : {
        orderBy?: InstallmentsPaidGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, InstallmentsPaidGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInstallmentsPaidGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the InstallmentsPaid model
     */
    readonly fields: InstallmentsPaidFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for InstallmentsPaid.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__InstallmentsPaidClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    financing<T extends Prisma.FinancingDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.FinancingDefaultArgs<ExtArgs>>): Prisma.Prisma__FinancingClient<runtime.Types.Result.GetResult<Prisma.$FinancingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the InstallmentsPaid model
 */
export interface InstallmentsPaidFieldRefs {
    readonly id: Prisma.FieldRef<"InstallmentsPaid", 'String'>;
    readonly financingId: Prisma.FieldRef<"InstallmentsPaid", 'String'>;
    readonly installmentNumber: Prisma.FieldRef<"InstallmentsPaid", 'Int'>;
    readonly amount: Prisma.FieldRef<"InstallmentsPaid", 'Decimal'>;
    readonly paidAt: Prisma.FieldRef<"InstallmentsPaid", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"InstallmentsPaid", 'DateTime'>;
}
/**
 * InstallmentsPaid findUnique
 */
export type InstallmentsPaidFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which InstallmentsPaid to fetch.
     */
    where: Prisma.InstallmentsPaidWhereUniqueInput;
};
/**
 * InstallmentsPaid findUniqueOrThrow
 */
export type InstallmentsPaidFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which InstallmentsPaid to fetch.
     */
    where: Prisma.InstallmentsPaidWhereUniqueInput;
};
/**
 * InstallmentsPaid findFirst
 */
export type InstallmentsPaidFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which InstallmentsPaid to fetch.
     */
    where?: Prisma.InstallmentsPaidWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of InstallmentsPaids to fetch.
     */
    orderBy?: Prisma.InstallmentsPaidOrderByWithRelationInput | Prisma.InstallmentsPaidOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for InstallmentsPaids.
     */
    cursor?: Prisma.InstallmentsPaidWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` InstallmentsPaids from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` InstallmentsPaids.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of InstallmentsPaids.
     */
    distinct?: Prisma.InstallmentsPaidScalarFieldEnum | Prisma.InstallmentsPaidScalarFieldEnum[];
};
/**
 * InstallmentsPaid findFirstOrThrow
 */
export type InstallmentsPaidFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which InstallmentsPaid to fetch.
     */
    where?: Prisma.InstallmentsPaidWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of InstallmentsPaids to fetch.
     */
    orderBy?: Prisma.InstallmentsPaidOrderByWithRelationInput | Prisma.InstallmentsPaidOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for InstallmentsPaids.
     */
    cursor?: Prisma.InstallmentsPaidWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` InstallmentsPaids from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` InstallmentsPaids.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of InstallmentsPaids.
     */
    distinct?: Prisma.InstallmentsPaidScalarFieldEnum | Prisma.InstallmentsPaidScalarFieldEnum[];
};
/**
 * InstallmentsPaid findMany
 */
export type InstallmentsPaidFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which InstallmentsPaids to fetch.
     */
    where?: Prisma.InstallmentsPaidWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of InstallmentsPaids to fetch.
     */
    orderBy?: Prisma.InstallmentsPaidOrderByWithRelationInput | Prisma.InstallmentsPaidOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing InstallmentsPaids.
     */
    cursor?: Prisma.InstallmentsPaidWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` InstallmentsPaids from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` InstallmentsPaids.
     */
    skip?: number;
    distinct?: Prisma.InstallmentsPaidScalarFieldEnum | Prisma.InstallmentsPaidScalarFieldEnum[];
};
/**
 * InstallmentsPaid create
 */
export type InstallmentsPaidCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to create a InstallmentsPaid.
     */
    data: Prisma.XOR<Prisma.InstallmentsPaidCreateInput, Prisma.InstallmentsPaidUncheckedCreateInput>;
};
/**
 * InstallmentsPaid createMany
 */
export type InstallmentsPaidCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many InstallmentsPaids.
     */
    data: Prisma.InstallmentsPaidCreateManyInput | Prisma.InstallmentsPaidCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * InstallmentsPaid createManyAndReturn
 */
export type InstallmentsPaidCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InstallmentsPaid
     */
    select?: Prisma.InstallmentsPaidSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the InstallmentsPaid
     */
    omit?: Prisma.InstallmentsPaidOmit<ExtArgs> | null;
    /**
     * The data used to create many InstallmentsPaids.
     */
    data: Prisma.InstallmentsPaidCreateManyInput | Prisma.InstallmentsPaidCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.InstallmentsPaidIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * InstallmentsPaid update
 */
export type InstallmentsPaidUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to update a InstallmentsPaid.
     */
    data: Prisma.XOR<Prisma.InstallmentsPaidUpdateInput, Prisma.InstallmentsPaidUncheckedUpdateInput>;
    /**
     * Choose, which InstallmentsPaid to update.
     */
    where: Prisma.InstallmentsPaidWhereUniqueInput;
};
/**
 * InstallmentsPaid updateMany
 */
export type InstallmentsPaidUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update InstallmentsPaids.
     */
    data: Prisma.XOR<Prisma.InstallmentsPaidUpdateManyMutationInput, Prisma.InstallmentsPaidUncheckedUpdateManyInput>;
    /**
     * Filter which InstallmentsPaids to update
     */
    where?: Prisma.InstallmentsPaidWhereInput;
    /**
     * Limit how many InstallmentsPaids to update.
     */
    limit?: number;
};
/**
 * InstallmentsPaid updateManyAndReturn
 */
export type InstallmentsPaidUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InstallmentsPaid
     */
    select?: Prisma.InstallmentsPaidSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the InstallmentsPaid
     */
    omit?: Prisma.InstallmentsPaidOmit<ExtArgs> | null;
    /**
     * The data used to update InstallmentsPaids.
     */
    data: Prisma.XOR<Prisma.InstallmentsPaidUpdateManyMutationInput, Prisma.InstallmentsPaidUncheckedUpdateManyInput>;
    /**
     * Filter which InstallmentsPaids to update
     */
    where?: Prisma.InstallmentsPaidWhereInput;
    /**
     * Limit how many InstallmentsPaids to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.InstallmentsPaidIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * InstallmentsPaid upsert
 */
export type InstallmentsPaidUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The filter to search for the InstallmentsPaid to update in case it exists.
     */
    where: Prisma.InstallmentsPaidWhereUniqueInput;
    /**
     * In case the InstallmentsPaid found by the `where` argument doesn't exist, create a new InstallmentsPaid with this data.
     */
    create: Prisma.XOR<Prisma.InstallmentsPaidCreateInput, Prisma.InstallmentsPaidUncheckedCreateInput>;
    /**
     * In case the InstallmentsPaid was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.InstallmentsPaidUpdateInput, Prisma.InstallmentsPaidUncheckedUpdateInput>;
};
/**
 * InstallmentsPaid delete
 */
export type InstallmentsPaidDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter which InstallmentsPaid to delete.
     */
    where: Prisma.InstallmentsPaidWhereUniqueInput;
};
/**
 * InstallmentsPaid deleteMany
 */
export type InstallmentsPaidDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which InstallmentsPaids to delete
     */
    where?: Prisma.InstallmentsPaidWhereInput;
    /**
     * Limit how many InstallmentsPaids to delete.
     */
    limit?: number;
};
/**
 * InstallmentsPaid without action
 */
export type InstallmentsPaidDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
};
export {};
//# sourceMappingURL=InstallmentsPaid.d.ts.map