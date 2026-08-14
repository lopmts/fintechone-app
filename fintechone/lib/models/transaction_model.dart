import 'package:drift/drift.dart' show Value;
import 'package:fintechone/database/database.dart';
import 'package:uuid/uuid.dart';

import '../database/enums.dart';
import '../utils/transaction_type_x.dart';

class TransactionModel {
  final String id;
  final String accountId;
  final String? categoryId;
  final String description;
  final String? notes;
  final String? receiptUrl;
  final int amountCents;
  final TransactionType type;
  final DateTime date;
  final bool isRecurring;
  final int? installments;
  final String? parentTransactionId;
  final int syncVersion;
  final DateTime? deletedAt;
  final String? lastDeviceId;
  final DateTime createdAt;
  final DateTime updatedAt;

  const TransactionModel({
    required this.id,
    required this.accountId,
    this.categoryId,
    required this.description,
    this.notes,
    this.receiptUrl,
    required this.amountCents,
    required this.type,
    required this.date,
    this.isRecurring = false,
    this.installments,
    this.parentTransactionId,
    this.syncVersion = 1,
    this.deletedAt,
    this.lastDeviceId,
    required this.createdAt,
    required this.updatedAt,
  });

  double get amount => amountCents / 100;

  /// Usado pelo formulário — sempre em centavos, nunca double.
  factory TransactionModel.createFromCents({
    required String accountId,
    String? categoryId,
    required String description,
    String? notes,
    required int amountCents,
    required TransactionType type,
    required DateTime date,
    bool isRecurring = false,
  }) {
    final now = DateTime.now();
    return TransactionModel(
      id: const Uuid().v4(),
      accountId: accountId,
      categoryId: categoryId,
      description: description,
      notes: notes,
      amountCents: amountCents,
      type: type,
      date: date,
      isRecurring: isRecurring,
      createdAt: now,
      updatedAt: now,
    );
  }

  factory TransactionModel.fromRow(TransactionRow row) => TransactionModel(
    id: row.id,
    accountId: row.accountId,
    categoryId: row.categoryId,
    description: row.description,
    notes: row.notes,
    receiptUrl: row.receiptUrl,
    amountCents: row.amountCents,
    type: row.type,
    date: row.date,
    isRecurring: row.isRecurring,
    installments: row.installments,
    parentTransactionId: row.parentTransactionId,
    syncVersion: row.syncVersion,
    deletedAt: row.deletedAt,
    lastDeviceId: row.lastDeviceId,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  );

  factory TransactionModel.fromJson(Map<String, dynamic> json) =>
      TransactionModel(
        id: json['id'] as String,
        accountId: json['accountId'] as String,
        categoryId: json['categoryId'] as String?,
        description: json['description'] as String,
        notes: json['notes'] as String?,
        receiptUrl: json['receiptUrl'] as String?,
        amountCents: ((json['amount'] as num) * 100).round(),
        type: TransactionTypeX.fromBackendValue(json['type'] as String?),
        date: DateTime.parse(json['date'] as String),
        isRecurring: json['isRecurring'] as bool? ?? false,
        installments: json['installments'] as int?,
        parentTransactionId: json['parentTransactionId'] as String?,
        syncVersion: json['syncVersion'] as int? ?? 1,
        deletedAt: json['deletedAt'] == null
            ? null
            : DateTime.parse(json['deletedAt'] as String),
        lastDeviceId: json['lastDeviceId'] as String?,
        createdAt: DateTime.parse(json['createdAt'] as String),
        updatedAt: DateTime.parse(json['updatedAt'] as String),
      );

  Map<String, dynamic> toJson() => {
    'id': id,
    'accountId': accountId,
    'categoryId': categoryId,
    'description': description,
    'notes': notes,
    'receiptUrl': receiptUrl,
    'amount': amount,
    'type': type.backendValue,
    'date': date.toIso8601String(),
    'isRecurring': isRecurring,
    'installments': installments,
    'parentTransactionId': parentTransactionId,
    'syncVersion': syncVersion,
    'deletedAt': deletedAt?.toIso8601String(),
    'lastDeviceId': lastDeviceId,
    'createdAt': createdAt.toIso8601String(),
    'updatedAt': updatedAt.toIso8601String(),
  };

  TransactionsCompanion toCompanion() => TransactionsCompanion(
    id: Value(id),
    accountId: Value(accountId),
    categoryId: Value(categoryId),
    description: Value(description),
    notes: Value(notes),
    receiptUrl: Value(receiptUrl),
    amountCents: Value(amountCents),
    type: Value(type),
    date: Value(date),
    isRecurring: Value(isRecurring),
    installments: Value(installments),
    parentTransactionId: Value(parentTransactionId),
    syncVersion: Value(syncVersion),
    deletedAt: Value(deletedAt),
    lastDeviceId: Value(lastDeviceId),
    createdAt: Value(createdAt),
    updatedAt: Value(updatedAt),
  );

  TransactionModel copyWith({
    String? accountId,
    String? categoryId,
    bool clearCategory = false,
    String? description,
    String? notes,
    bool clearNotes = false,
    int? amountCents,
    TransactionType? type,
    DateTime? date,
    bool? isRecurring,
    int? syncVersion,
  }) => TransactionModel(
    id: id,
    accountId: accountId ?? this.accountId,
    categoryId: clearCategory ? null : (categoryId ?? this.categoryId),
    description: description ?? this.description,
    notes: clearNotes ? null : (notes ?? this.notes),
    receiptUrl: receiptUrl,
    amountCents: amountCents ?? this.amountCents,
    type: type ?? this.type,
    date: date ?? this.date,
    isRecurring: isRecurring ?? this.isRecurring,
    installments: installments,
    parentTransactionId: parentTransactionId,
    syncVersion: syncVersion ?? this.syncVersion,
    deletedAt: deletedAt,
    lastDeviceId: lastDeviceId,
    createdAt: createdAt,
    updatedAt: DateTime.now(),
  );

  @override
  bool operator ==(Object other) => other is TransactionModel && other.id == id;

  @override
  int get hashCode => id.hashCode;
}
