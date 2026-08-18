import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models.js';
export type * from './prismaNamespace.js';
export declare const Decimal: typeof runtime.Decimal;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.objectEnumValues.instances.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.objectEnumValues.instances.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.objectEnumValues.instances.AnyNull);
};
/**
 * Helper for filtering JSON entries that have `null` on the database (empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const DbNull: {
    "__#private@#private": any;
    _getNamespace(): string;
    _getName(): string;
    toString(): string;
};
/**
 * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const JsonNull: {
    "__#private@#private": any;
    _getNamespace(): string;
    _getName(): string;
    toString(): string;
};
/**
 * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const AnyNull: {
    "__#private@#private": any;
    _getNamespace(): string;
    _getName(): string;
    toString(): string;
};
export declare const ModelName: {
    readonly User: "User";
    readonly Session: "Session";
    readonly Account: "Account";
    readonly DeleteRequest: "DeleteRequest";
    readonly VerificationCode: "VerificationCode";
    readonly Category: "Category";
    readonly Transaction: "Transaction";
    readonly Budget: "Budget";
    readonly Financing: "Financing";
    readonly InstallmentsPaid: "InstallmentsPaid";
    readonly PushToken: "PushToken";
    readonly SyncLog: "SyncLog";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const UserScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly imageUrl: "imageUrl";
    readonly email: "email";
    readonly codeuniq: "codeuniq";
    readonly password: "password";
    readonly provider: "provider";
    readonly googleId: "googleId";
    readonly emailVerified: "emailVerified";
    readonly currency: "currency";
    readonly isActive: "isActive";
    readonly syncVersion: "syncVersion";
    readonly deletedAt: "deletedAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
export declare const SessionScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly refreshTokenHash: "refreshTokenHash";
    readonly expiresAt: "expiresAt";
    readonly revokedAt: "revokedAt";
    readonly createdAt: "createdAt";
    readonly lastUsedAt: "lastUsedAt";
};
export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum];
export declare const AccountScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly name: "name";
    readonly type: "type";
    readonly bank: "bank";
    readonly initialBalance: "initialBalance";
    readonly color: "color";
    readonly icon: "icon";
    readonly syncVersion: "syncVersion";
    readonly salary: "salary";
    readonly deletedAt: "deletedAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type AccountScalarFieldEnum = (typeof AccountScalarFieldEnum)[keyof typeof AccountScalarFieldEnum];
export declare const DeleteRequestScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly expiresAt: "expiresAt";
    readonly createdAt: "createdAt";
};
export type DeleteRequestScalarFieldEnum = (typeof DeleteRequestScalarFieldEnum)[keyof typeof DeleteRequestScalarFieldEnum];
export declare const VerificationCodeScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly code: "code";
    readonly expiresAt: "expiresAt";
    readonly usedAt: "usedAt";
    readonly createdAt: "createdAt";
};
export type VerificationCodeScalarFieldEnum = (typeof VerificationCodeScalarFieldEnum)[keyof typeof VerificationCodeScalarFieldEnum];
export declare const CategoryScalarFieldEnum: {
    readonly id: "id";
    readonly key: "key";
    readonly name: "name";
    readonly icon: "icon";
    readonly color: "color";
    readonly type: "type";
    readonly syncVersion: "syncVersion";
    readonly deletedAt: "deletedAt";
};
export type CategoryScalarFieldEnum = (typeof CategoryScalarFieldEnum)[keyof typeof CategoryScalarFieldEnum];
export declare const TransactionScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly accountId: "accountId";
    readonly categoryId: "categoryId";
    readonly description: "description";
    readonly notes: "notes";
    readonly receiptUrl: "receiptUrl";
    readonly amount: "amount";
    readonly type: "type";
    readonly date: "date";
    readonly isRecurring: "isRecurring";
    readonly installments: "installments";
    readonly parentTransactionId: "parentTransactionId";
    readonly syncVersion: "syncVersion";
    readonly deletedAt: "deletedAt";
    readonly lastDeviceId: "lastDeviceId";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type TransactionScalarFieldEnum = (typeof TransactionScalarFieldEnum)[keyof typeof TransactionScalarFieldEnum];
export declare const BudgetScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly categoryId: "categoryId";
    readonly name: "name";
    readonly amount: "amount";
    readonly period: "period";
    readonly startDate: "startDate";
    readonly endDate: "endDate";
    readonly isActive: "isActive";
    readonly syncVersion: "syncVersion";
    readonly deletedAt: "deletedAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type BudgetScalarFieldEnum = (typeof BudgetScalarFieldEnum)[keyof typeof BudgetScalarFieldEnum];
export declare const FinancingScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly isActive: "isActive";
    readonly title: "title";
    readonly amount: "amount";
    readonly installmentAmount: "installmentAmount";
    readonly interestRate: "interestRate";
    readonly installments: "installments";
    readonly startDate: "startDate";
    readonly lateFeeRate: "lateFeeRate";
    readonly lateInterestRate: "lateInterestRate";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type FinancingScalarFieldEnum = (typeof FinancingScalarFieldEnum)[keyof typeof FinancingScalarFieldEnum];
export declare const InstallmentsPaidScalarFieldEnum: {
    readonly id: "id";
    readonly financingId: "financingId";
    readonly installmentNumber: "installmentNumber";
    readonly amount: "amount";
    readonly paidAt: "paidAt";
    readonly createdAt: "createdAt";
};
export type InstallmentsPaidScalarFieldEnum = (typeof InstallmentsPaidScalarFieldEnum)[keyof typeof InstallmentsPaidScalarFieldEnum];
export declare const PushTokenScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly token: "token";
    readonly createdAt: "createdAt";
};
export type PushTokenScalarFieldEnum = (typeof PushTokenScalarFieldEnum)[keyof typeof PushTokenScalarFieldEnum];
export declare const SyncLogScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly deviceId: "deviceId";
    readonly lastSyncAt: "lastSyncAt";
    readonly createdAt: "createdAt";
};
export type SyncLogScalarFieldEnum = (typeof SyncLogScalarFieldEnum)[keyof typeof SyncLogScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
//# sourceMappingURL=prismaNamespaceBrowser.d.ts.map