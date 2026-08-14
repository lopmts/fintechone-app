import type * as runtime from "@prisma/client/runtime/library";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model DeleteRequest
 *
 */
export type DeleteRequestModel = runtime.Types.Result.DefaultSelection<Prisma.$DeleteRequestPayload>;
export type AggregateDeleteRequest = {
    _count: DeleteRequestCountAggregateOutputType | null;
    _min: DeleteRequestMinAggregateOutputType | null;
    _max: DeleteRequestMaxAggregateOutputType | null;
};
export type DeleteRequestMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    expiresAt: Date | null;
    createdAt: Date | null;
};
export type DeleteRequestMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    expiresAt: Date | null;
    createdAt: Date | null;
};
export type DeleteRequestCountAggregateOutputType = {
    id: number;
    userId: number;
    expiresAt: number;
    createdAt: number;
    _all: number;
};
export type DeleteRequestMinAggregateInputType = {
    id?: true;
    userId?: true;
    expiresAt?: true;
    createdAt?: true;
};
export type DeleteRequestMaxAggregateInputType = {
    id?: true;
    userId?: true;
    expiresAt?: true;
    createdAt?: true;
};
export type DeleteRequestCountAggregateInputType = {
    id?: true;
    userId?: true;
    expiresAt?: true;
    createdAt?: true;
    _all?: true;
};
export type DeleteRequestAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which DeleteRequest to aggregate.
     */
    where?: Prisma.DeleteRequestWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of DeleteRequests to fetch.
     */
    orderBy?: Prisma.DeleteRequestOrderByWithRelationInput | Prisma.DeleteRequestOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.DeleteRequestWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` DeleteRequests from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` DeleteRequests.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned DeleteRequests
    **/
    _count?: true | DeleteRequestCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: DeleteRequestMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: DeleteRequestMaxAggregateInputType;
};
export type GetDeleteRequestAggregateType<T extends DeleteRequestAggregateArgs> = {
    [P in keyof T & keyof AggregateDeleteRequest]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateDeleteRequest[P]> : Prisma.GetScalarType<T[P], AggregateDeleteRequest[P]>;
};
export type DeleteRequestGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DeleteRequestWhereInput;
    orderBy?: Prisma.DeleteRequestOrderByWithAggregationInput | Prisma.DeleteRequestOrderByWithAggregationInput[];
    by: Prisma.DeleteRequestScalarFieldEnum[] | Prisma.DeleteRequestScalarFieldEnum;
    having?: Prisma.DeleteRequestScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: DeleteRequestCountAggregateInputType | true;
    _min?: DeleteRequestMinAggregateInputType;
    _max?: DeleteRequestMaxAggregateInputType;
};
export type DeleteRequestGroupByOutputType = {
    id: string;
    userId: string;
    expiresAt: Date;
    createdAt: Date;
    _count: DeleteRequestCountAggregateOutputType | null;
    _min: DeleteRequestMinAggregateOutputType | null;
    _max: DeleteRequestMaxAggregateOutputType | null;
};
type GetDeleteRequestGroupByPayload<T extends DeleteRequestGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<DeleteRequestGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof DeleteRequestGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], DeleteRequestGroupByOutputType[P]> : Prisma.GetScalarType<T[P], DeleteRequestGroupByOutputType[P]>;
}>>;
export type DeleteRequestWhereInput = {
    AND?: Prisma.DeleteRequestWhereInput | Prisma.DeleteRequestWhereInput[];
    OR?: Prisma.DeleteRequestWhereInput[];
    NOT?: Prisma.DeleteRequestWhereInput | Prisma.DeleteRequestWhereInput[];
    id?: Prisma.StringFilter<"DeleteRequest"> | string;
    userId?: Prisma.StringFilter<"DeleteRequest"> | string;
    expiresAt?: Prisma.DateTimeFilter<"DeleteRequest"> | Date | string;
    createdAt?: Prisma.DateTimeFilter<"DeleteRequest"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type DeleteRequestOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type DeleteRequestWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    userId?: string;
    AND?: Prisma.DeleteRequestWhereInput | Prisma.DeleteRequestWhereInput[];
    OR?: Prisma.DeleteRequestWhereInput[];
    NOT?: Prisma.DeleteRequestWhereInput | Prisma.DeleteRequestWhereInput[];
    expiresAt?: Prisma.DateTimeFilter<"DeleteRequest"> | Date | string;
    createdAt?: Prisma.DateTimeFilter<"DeleteRequest"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id" | "userId">;
export type DeleteRequestOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.DeleteRequestCountOrderByAggregateInput;
    _max?: Prisma.DeleteRequestMaxOrderByAggregateInput;
    _min?: Prisma.DeleteRequestMinOrderByAggregateInput;
};
export type DeleteRequestScalarWhereWithAggregatesInput = {
    AND?: Prisma.DeleteRequestScalarWhereWithAggregatesInput | Prisma.DeleteRequestScalarWhereWithAggregatesInput[];
    OR?: Prisma.DeleteRequestScalarWhereWithAggregatesInput[];
    NOT?: Prisma.DeleteRequestScalarWhereWithAggregatesInput | Prisma.DeleteRequestScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"DeleteRequest"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"DeleteRequest"> | string;
    expiresAt?: Prisma.DateTimeWithAggregatesFilter<"DeleteRequest"> | Date | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"DeleteRequest"> | Date | string;
};
export type DeleteRequestCreateInput = {
    id?: string;
    expiresAt: Date | string;
    createdAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutDeleteRequestsInput;
};
export type DeleteRequestUncheckedCreateInput = {
    id?: string;
    userId: string;
    expiresAt: Date | string;
    createdAt?: Date | string;
};
export type DeleteRequestUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutDeleteRequestsNestedInput;
};
export type DeleteRequestUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DeleteRequestCreateManyInput = {
    id?: string;
    userId: string;
    expiresAt: Date | string;
    createdAt?: Date | string;
};
export type DeleteRequestUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DeleteRequestUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DeleteRequestListRelationFilter = {
    every?: Prisma.DeleteRequestWhereInput;
    some?: Prisma.DeleteRequestWhereInput;
    none?: Prisma.DeleteRequestWhereInput;
};
export type DeleteRequestOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type DeleteRequestCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type DeleteRequestMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type DeleteRequestMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type DeleteRequestCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.DeleteRequestCreateWithoutUserInput, Prisma.DeleteRequestUncheckedCreateWithoutUserInput> | Prisma.DeleteRequestCreateWithoutUserInput[] | Prisma.DeleteRequestUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.DeleteRequestCreateOrConnectWithoutUserInput | Prisma.DeleteRequestCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.DeleteRequestCreateManyUserInputEnvelope;
    connect?: Prisma.DeleteRequestWhereUniqueInput | Prisma.DeleteRequestWhereUniqueInput[];
};
export type DeleteRequestUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.DeleteRequestCreateWithoutUserInput, Prisma.DeleteRequestUncheckedCreateWithoutUserInput> | Prisma.DeleteRequestCreateWithoutUserInput[] | Prisma.DeleteRequestUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.DeleteRequestCreateOrConnectWithoutUserInput | Prisma.DeleteRequestCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.DeleteRequestCreateManyUserInputEnvelope;
    connect?: Prisma.DeleteRequestWhereUniqueInput | Prisma.DeleteRequestWhereUniqueInput[];
};
export type DeleteRequestUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.DeleteRequestCreateWithoutUserInput, Prisma.DeleteRequestUncheckedCreateWithoutUserInput> | Prisma.DeleteRequestCreateWithoutUserInput[] | Prisma.DeleteRequestUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.DeleteRequestCreateOrConnectWithoutUserInput | Prisma.DeleteRequestCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.DeleteRequestUpsertWithWhereUniqueWithoutUserInput | Prisma.DeleteRequestUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.DeleteRequestCreateManyUserInputEnvelope;
    set?: Prisma.DeleteRequestWhereUniqueInput | Prisma.DeleteRequestWhereUniqueInput[];
    disconnect?: Prisma.DeleteRequestWhereUniqueInput | Prisma.DeleteRequestWhereUniqueInput[];
    delete?: Prisma.DeleteRequestWhereUniqueInput | Prisma.DeleteRequestWhereUniqueInput[];
    connect?: Prisma.DeleteRequestWhereUniqueInput | Prisma.DeleteRequestWhereUniqueInput[];
    update?: Prisma.DeleteRequestUpdateWithWhereUniqueWithoutUserInput | Prisma.DeleteRequestUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.DeleteRequestUpdateManyWithWhereWithoutUserInput | Prisma.DeleteRequestUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.DeleteRequestScalarWhereInput | Prisma.DeleteRequestScalarWhereInput[];
};
export type DeleteRequestUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.DeleteRequestCreateWithoutUserInput, Prisma.DeleteRequestUncheckedCreateWithoutUserInput> | Prisma.DeleteRequestCreateWithoutUserInput[] | Prisma.DeleteRequestUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.DeleteRequestCreateOrConnectWithoutUserInput | Prisma.DeleteRequestCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.DeleteRequestUpsertWithWhereUniqueWithoutUserInput | Prisma.DeleteRequestUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.DeleteRequestCreateManyUserInputEnvelope;
    set?: Prisma.DeleteRequestWhereUniqueInput | Prisma.DeleteRequestWhereUniqueInput[];
    disconnect?: Prisma.DeleteRequestWhereUniqueInput | Prisma.DeleteRequestWhereUniqueInput[];
    delete?: Prisma.DeleteRequestWhereUniqueInput | Prisma.DeleteRequestWhereUniqueInput[];
    connect?: Prisma.DeleteRequestWhereUniqueInput | Prisma.DeleteRequestWhereUniqueInput[];
    update?: Prisma.DeleteRequestUpdateWithWhereUniqueWithoutUserInput | Prisma.DeleteRequestUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.DeleteRequestUpdateManyWithWhereWithoutUserInput | Prisma.DeleteRequestUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.DeleteRequestScalarWhereInput | Prisma.DeleteRequestScalarWhereInput[];
};
export type DeleteRequestCreateWithoutUserInput = {
    id?: string;
    expiresAt: Date | string;
    createdAt?: Date | string;
};
export type DeleteRequestUncheckedCreateWithoutUserInput = {
    id?: string;
    expiresAt: Date | string;
    createdAt?: Date | string;
};
export type DeleteRequestCreateOrConnectWithoutUserInput = {
    where: Prisma.DeleteRequestWhereUniqueInput;
    create: Prisma.XOR<Prisma.DeleteRequestCreateWithoutUserInput, Prisma.DeleteRequestUncheckedCreateWithoutUserInput>;
};
export type DeleteRequestCreateManyUserInputEnvelope = {
    data: Prisma.DeleteRequestCreateManyUserInput | Prisma.DeleteRequestCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type DeleteRequestUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.DeleteRequestWhereUniqueInput;
    update: Prisma.XOR<Prisma.DeleteRequestUpdateWithoutUserInput, Prisma.DeleteRequestUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.DeleteRequestCreateWithoutUserInput, Prisma.DeleteRequestUncheckedCreateWithoutUserInput>;
};
export type DeleteRequestUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.DeleteRequestWhereUniqueInput;
    data: Prisma.XOR<Prisma.DeleteRequestUpdateWithoutUserInput, Prisma.DeleteRequestUncheckedUpdateWithoutUserInput>;
};
export type DeleteRequestUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.DeleteRequestScalarWhereInput;
    data: Prisma.XOR<Prisma.DeleteRequestUpdateManyMutationInput, Prisma.DeleteRequestUncheckedUpdateManyWithoutUserInput>;
};
export type DeleteRequestScalarWhereInput = {
    AND?: Prisma.DeleteRequestScalarWhereInput | Prisma.DeleteRequestScalarWhereInput[];
    OR?: Prisma.DeleteRequestScalarWhereInput[];
    NOT?: Prisma.DeleteRequestScalarWhereInput | Prisma.DeleteRequestScalarWhereInput[];
    id?: Prisma.StringFilter<"DeleteRequest"> | string;
    userId?: Prisma.StringFilter<"DeleteRequest"> | string;
    expiresAt?: Prisma.DateTimeFilter<"DeleteRequest"> | Date | string;
    createdAt?: Prisma.DateTimeFilter<"DeleteRequest"> | Date | string;
};
export type DeleteRequestCreateManyUserInput = {
    id?: string;
    expiresAt: Date | string;
    createdAt?: Date | string;
};
export type DeleteRequestUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DeleteRequestUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DeleteRequestUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DeleteRequestSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    expiresAt?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["deleteRequest"]>;
export type DeleteRequestSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    expiresAt?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["deleteRequest"]>;
export type DeleteRequestSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    expiresAt?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["deleteRequest"]>;
export type DeleteRequestSelectScalar = {
    id?: boolean;
    userId?: boolean;
    expiresAt?: boolean;
    createdAt?: boolean;
};
export type DeleteRequestOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "expiresAt" | "createdAt", ExtArgs["result"]["deleteRequest"]>;
export type DeleteRequestInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type DeleteRequestIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type DeleteRequestIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $DeleteRequestPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "DeleteRequest";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        expiresAt: Date;
        createdAt: Date;
    }, ExtArgs["result"]["deleteRequest"]>;
    composites: {};
};
export type DeleteRequestGetPayload<S extends boolean | null | undefined | DeleteRequestDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$DeleteRequestPayload, S>;
export type DeleteRequestCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<DeleteRequestFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: DeleteRequestCountAggregateInputType | true;
};
export interface DeleteRequestDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['DeleteRequest'];
        meta: {
            name: 'DeleteRequest';
        };
    };
    /**
     * Find zero or one DeleteRequest that matches the filter.
     * @param {DeleteRequestFindUniqueArgs} args - Arguments to find a DeleteRequest
     * @example
     * // Get one DeleteRequest
     * const deleteRequest = await prisma.deleteRequest.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DeleteRequestFindUniqueArgs>(args: Prisma.SelectSubset<T, DeleteRequestFindUniqueArgs<ExtArgs>>): Prisma.Prisma__DeleteRequestClient<runtime.Types.Result.GetResult<Prisma.$DeleteRequestPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one DeleteRequest that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DeleteRequestFindUniqueOrThrowArgs} args - Arguments to find a DeleteRequest
     * @example
     * // Get one DeleteRequest
     * const deleteRequest = await prisma.deleteRequest.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DeleteRequestFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, DeleteRequestFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__DeleteRequestClient<runtime.Types.Result.GetResult<Prisma.$DeleteRequestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first DeleteRequest that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeleteRequestFindFirstArgs} args - Arguments to find a DeleteRequest
     * @example
     * // Get one DeleteRequest
     * const deleteRequest = await prisma.deleteRequest.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DeleteRequestFindFirstArgs>(args?: Prisma.SelectSubset<T, DeleteRequestFindFirstArgs<ExtArgs>>): Prisma.Prisma__DeleteRequestClient<runtime.Types.Result.GetResult<Prisma.$DeleteRequestPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first DeleteRequest that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeleteRequestFindFirstOrThrowArgs} args - Arguments to find a DeleteRequest
     * @example
     * // Get one DeleteRequest
     * const deleteRequest = await prisma.deleteRequest.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DeleteRequestFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, DeleteRequestFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__DeleteRequestClient<runtime.Types.Result.GetResult<Prisma.$DeleteRequestPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more DeleteRequests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeleteRequestFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DeleteRequests
     * const deleteRequests = await prisma.deleteRequest.findMany()
     *
     * // Get first 10 DeleteRequests
     * const deleteRequests = await prisma.deleteRequest.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const deleteRequestWithIdOnly = await prisma.deleteRequest.findMany({ select: { id: true } })
     *
     */
    findMany<T extends DeleteRequestFindManyArgs>(args?: Prisma.SelectSubset<T, DeleteRequestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DeleteRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a DeleteRequest.
     * @param {DeleteRequestCreateArgs} args - Arguments to create a DeleteRequest.
     * @example
     * // Create one DeleteRequest
     * const DeleteRequest = await prisma.deleteRequest.create({
     *   data: {
     *     // ... data to create a DeleteRequest
     *   }
     * })
     *
     */
    create<T extends DeleteRequestCreateArgs>(args: Prisma.SelectSubset<T, DeleteRequestCreateArgs<ExtArgs>>): Prisma.Prisma__DeleteRequestClient<runtime.Types.Result.GetResult<Prisma.$DeleteRequestPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many DeleteRequests.
     * @param {DeleteRequestCreateManyArgs} args - Arguments to create many DeleteRequests.
     * @example
     * // Create many DeleteRequests
     * const deleteRequest = await prisma.deleteRequest.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends DeleteRequestCreateManyArgs>(args?: Prisma.SelectSubset<T, DeleteRequestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many DeleteRequests and returns the data saved in the database.
     * @param {DeleteRequestCreateManyAndReturnArgs} args - Arguments to create many DeleteRequests.
     * @example
     * // Create many DeleteRequests
     * const deleteRequest = await prisma.deleteRequest.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many DeleteRequests and only return the `id`
     * const deleteRequestWithIdOnly = await prisma.deleteRequest.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends DeleteRequestCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, DeleteRequestCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DeleteRequestPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a DeleteRequest.
     * @param {DeleteRequestDeleteArgs} args - Arguments to delete one DeleteRequest.
     * @example
     * // Delete one DeleteRequest
     * const DeleteRequest = await prisma.deleteRequest.delete({
     *   where: {
     *     // ... filter to delete one DeleteRequest
     *   }
     * })
     *
     */
    delete<T extends DeleteRequestDeleteArgs>(args: Prisma.SelectSubset<T, DeleteRequestDeleteArgs<ExtArgs>>): Prisma.Prisma__DeleteRequestClient<runtime.Types.Result.GetResult<Prisma.$DeleteRequestPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one DeleteRequest.
     * @param {DeleteRequestUpdateArgs} args - Arguments to update one DeleteRequest.
     * @example
     * // Update one DeleteRequest
     * const deleteRequest = await prisma.deleteRequest.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends DeleteRequestUpdateArgs>(args: Prisma.SelectSubset<T, DeleteRequestUpdateArgs<ExtArgs>>): Prisma.Prisma__DeleteRequestClient<runtime.Types.Result.GetResult<Prisma.$DeleteRequestPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more DeleteRequests.
     * @param {DeleteRequestDeleteManyArgs} args - Arguments to filter DeleteRequests to delete.
     * @example
     * // Delete a few DeleteRequests
     * const { count } = await prisma.deleteRequest.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends DeleteRequestDeleteManyArgs>(args?: Prisma.SelectSubset<T, DeleteRequestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more DeleteRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeleteRequestUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DeleteRequests
     * const deleteRequest = await prisma.deleteRequest.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends DeleteRequestUpdateManyArgs>(args: Prisma.SelectSubset<T, DeleteRequestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more DeleteRequests and returns the data updated in the database.
     * @param {DeleteRequestUpdateManyAndReturnArgs} args - Arguments to update many DeleteRequests.
     * @example
     * // Update many DeleteRequests
     * const deleteRequest = await prisma.deleteRequest.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more DeleteRequests and only return the `id`
     * const deleteRequestWithIdOnly = await prisma.deleteRequest.updateManyAndReturn({
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
    updateManyAndReturn<T extends DeleteRequestUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, DeleteRequestUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DeleteRequestPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one DeleteRequest.
     * @param {DeleteRequestUpsertArgs} args - Arguments to update or create a DeleteRequest.
     * @example
     * // Update or create a DeleteRequest
     * const deleteRequest = await prisma.deleteRequest.upsert({
     *   create: {
     *     // ... data to create a DeleteRequest
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DeleteRequest we want to update
     *   }
     * })
     */
    upsert<T extends DeleteRequestUpsertArgs>(args: Prisma.SelectSubset<T, DeleteRequestUpsertArgs<ExtArgs>>): Prisma.Prisma__DeleteRequestClient<runtime.Types.Result.GetResult<Prisma.$DeleteRequestPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of DeleteRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeleteRequestCountArgs} args - Arguments to filter DeleteRequests to count.
     * @example
     * // Count the number of DeleteRequests
     * const count = await prisma.deleteRequest.count({
     *   where: {
     *     // ... the filter for the DeleteRequests we want to count
     *   }
     * })
    **/
    count<T extends DeleteRequestCountArgs>(args?: Prisma.Subset<T, DeleteRequestCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], DeleteRequestCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a DeleteRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeleteRequestAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends DeleteRequestAggregateArgs>(args: Prisma.Subset<T, DeleteRequestAggregateArgs>): Prisma.PrismaPromise<GetDeleteRequestAggregateType<T>>;
    /**
     * Group by DeleteRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeleteRequestGroupByArgs} args - Group by arguments.
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
    groupBy<T extends DeleteRequestGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: DeleteRequestGroupByArgs['orderBy'];
    } : {
        orderBy?: DeleteRequestGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, DeleteRequestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDeleteRequestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the DeleteRequest model
     */
    readonly fields: DeleteRequestFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for DeleteRequest.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__DeleteRequestClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the DeleteRequest model
 */
export interface DeleteRequestFieldRefs {
    readonly id: Prisma.FieldRef<"DeleteRequest", 'String'>;
    readonly userId: Prisma.FieldRef<"DeleteRequest", 'String'>;
    readonly expiresAt: Prisma.FieldRef<"DeleteRequest", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"DeleteRequest", 'DateTime'>;
}
/**
 * DeleteRequest findUnique
 */
export type DeleteRequestFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeleteRequest
     */
    select?: Prisma.DeleteRequestSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DeleteRequest
     */
    omit?: Prisma.DeleteRequestOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DeleteRequestInclude<ExtArgs> | null;
    /**
     * Filter, which DeleteRequest to fetch.
     */
    where: Prisma.DeleteRequestWhereUniqueInput;
};
/**
 * DeleteRequest findUniqueOrThrow
 */
export type DeleteRequestFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeleteRequest
     */
    select?: Prisma.DeleteRequestSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DeleteRequest
     */
    omit?: Prisma.DeleteRequestOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DeleteRequestInclude<ExtArgs> | null;
    /**
     * Filter, which DeleteRequest to fetch.
     */
    where: Prisma.DeleteRequestWhereUniqueInput;
};
/**
 * DeleteRequest findFirst
 */
export type DeleteRequestFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeleteRequest
     */
    select?: Prisma.DeleteRequestSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DeleteRequest
     */
    omit?: Prisma.DeleteRequestOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DeleteRequestInclude<ExtArgs> | null;
    /**
     * Filter, which DeleteRequest to fetch.
     */
    where?: Prisma.DeleteRequestWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of DeleteRequests to fetch.
     */
    orderBy?: Prisma.DeleteRequestOrderByWithRelationInput | Prisma.DeleteRequestOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for DeleteRequests.
     */
    cursor?: Prisma.DeleteRequestWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` DeleteRequests from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` DeleteRequests.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of DeleteRequests.
     */
    distinct?: Prisma.DeleteRequestScalarFieldEnum | Prisma.DeleteRequestScalarFieldEnum[];
};
/**
 * DeleteRequest findFirstOrThrow
 */
export type DeleteRequestFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeleteRequest
     */
    select?: Prisma.DeleteRequestSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DeleteRequest
     */
    omit?: Prisma.DeleteRequestOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DeleteRequestInclude<ExtArgs> | null;
    /**
     * Filter, which DeleteRequest to fetch.
     */
    where?: Prisma.DeleteRequestWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of DeleteRequests to fetch.
     */
    orderBy?: Prisma.DeleteRequestOrderByWithRelationInput | Prisma.DeleteRequestOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for DeleteRequests.
     */
    cursor?: Prisma.DeleteRequestWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` DeleteRequests from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` DeleteRequests.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of DeleteRequests.
     */
    distinct?: Prisma.DeleteRequestScalarFieldEnum | Prisma.DeleteRequestScalarFieldEnum[];
};
/**
 * DeleteRequest findMany
 */
export type DeleteRequestFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeleteRequest
     */
    select?: Prisma.DeleteRequestSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DeleteRequest
     */
    omit?: Prisma.DeleteRequestOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DeleteRequestInclude<ExtArgs> | null;
    /**
     * Filter, which DeleteRequests to fetch.
     */
    where?: Prisma.DeleteRequestWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of DeleteRequests to fetch.
     */
    orderBy?: Prisma.DeleteRequestOrderByWithRelationInput | Prisma.DeleteRequestOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing DeleteRequests.
     */
    cursor?: Prisma.DeleteRequestWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` DeleteRequests from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` DeleteRequests.
     */
    skip?: number;
    distinct?: Prisma.DeleteRequestScalarFieldEnum | Prisma.DeleteRequestScalarFieldEnum[];
};
/**
 * DeleteRequest create
 */
export type DeleteRequestCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeleteRequest
     */
    select?: Prisma.DeleteRequestSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DeleteRequest
     */
    omit?: Prisma.DeleteRequestOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DeleteRequestInclude<ExtArgs> | null;
    /**
     * The data needed to create a DeleteRequest.
     */
    data: Prisma.XOR<Prisma.DeleteRequestCreateInput, Prisma.DeleteRequestUncheckedCreateInput>;
};
/**
 * DeleteRequest createMany
 */
export type DeleteRequestCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many DeleteRequests.
     */
    data: Prisma.DeleteRequestCreateManyInput | Prisma.DeleteRequestCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * DeleteRequest createManyAndReturn
 */
export type DeleteRequestCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeleteRequest
     */
    select?: Prisma.DeleteRequestSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the DeleteRequest
     */
    omit?: Prisma.DeleteRequestOmit<ExtArgs> | null;
    /**
     * The data used to create many DeleteRequests.
     */
    data: Prisma.DeleteRequestCreateManyInput | Prisma.DeleteRequestCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DeleteRequestIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * DeleteRequest update
 */
export type DeleteRequestUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeleteRequest
     */
    select?: Prisma.DeleteRequestSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DeleteRequest
     */
    omit?: Prisma.DeleteRequestOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DeleteRequestInclude<ExtArgs> | null;
    /**
     * The data needed to update a DeleteRequest.
     */
    data: Prisma.XOR<Prisma.DeleteRequestUpdateInput, Prisma.DeleteRequestUncheckedUpdateInput>;
    /**
     * Choose, which DeleteRequest to update.
     */
    where: Prisma.DeleteRequestWhereUniqueInput;
};
/**
 * DeleteRequest updateMany
 */
export type DeleteRequestUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update DeleteRequests.
     */
    data: Prisma.XOR<Prisma.DeleteRequestUpdateManyMutationInput, Prisma.DeleteRequestUncheckedUpdateManyInput>;
    /**
     * Filter which DeleteRequests to update
     */
    where?: Prisma.DeleteRequestWhereInput;
    /**
     * Limit how many DeleteRequests to update.
     */
    limit?: number;
};
/**
 * DeleteRequest updateManyAndReturn
 */
export type DeleteRequestUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeleteRequest
     */
    select?: Prisma.DeleteRequestSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the DeleteRequest
     */
    omit?: Prisma.DeleteRequestOmit<ExtArgs> | null;
    /**
     * The data used to update DeleteRequests.
     */
    data: Prisma.XOR<Prisma.DeleteRequestUpdateManyMutationInput, Prisma.DeleteRequestUncheckedUpdateManyInput>;
    /**
     * Filter which DeleteRequests to update
     */
    where?: Prisma.DeleteRequestWhereInput;
    /**
     * Limit how many DeleteRequests to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DeleteRequestIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * DeleteRequest upsert
 */
export type DeleteRequestUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeleteRequest
     */
    select?: Prisma.DeleteRequestSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DeleteRequest
     */
    omit?: Prisma.DeleteRequestOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DeleteRequestInclude<ExtArgs> | null;
    /**
     * The filter to search for the DeleteRequest to update in case it exists.
     */
    where: Prisma.DeleteRequestWhereUniqueInput;
    /**
     * In case the DeleteRequest found by the `where` argument doesn't exist, create a new DeleteRequest with this data.
     */
    create: Prisma.XOR<Prisma.DeleteRequestCreateInput, Prisma.DeleteRequestUncheckedCreateInput>;
    /**
     * In case the DeleteRequest was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.DeleteRequestUpdateInput, Prisma.DeleteRequestUncheckedUpdateInput>;
};
/**
 * DeleteRequest delete
 */
export type DeleteRequestDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeleteRequest
     */
    select?: Prisma.DeleteRequestSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DeleteRequest
     */
    omit?: Prisma.DeleteRequestOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DeleteRequestInclude<ExtArgs> | null;
    /**
     * Filter which DeleteRequest to delete.
     */
    where: Prisma.DeleteRequestWhereUniqueInput;
};
/**
 * DeleteRequest deleteMany
 */
export type DeleteRequestDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which DeleteRequests to delete
     */
    where?: Prisma.DeleteRequestWhereInput;
    /**
     * Limit how many DeleteRequests to delete.
     */
    limit?: number;
};
/**
 * DeleteRequest without action
 */
export type DeleteRequestDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeleteRequest
     */
    select?: Prisma.DeleteRequestSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DeleteRequest
     */
    omit?: Prisma.DeleteRequestOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DeleteRequestInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=DeleteRequest.d.ts.map