import 'package:drift/drift.dart';

import '../enums.dart';
import 'accounts_table.dart';
import 'categories_table.dart';

@DataClassName('TransactionRow')
class Transactions extends Table {
  TextColumn get id => text()();

  TextColumn get accountId =>
      text().references(Accounts, #id, onDelete: KeyAction.cascade)();
  TextColumn get categoryId => text().nullable().references(
    Categories,
    #id,
    onDelete: KeyAction.setNull,
  )();

  TextColumn get description => text()();
  TextColumn get notes => text().nullable()();
  TextColumn get receiptUrl => text().nullable()();

  IntColumn get amountCents => integer()();
  IntColumn get type => intEnum<TransactionType>()();

  DateTimeColumn get date => dateTime()();

  BoolColumn get isRecurring => boolean().withDefault(const Constant(false))();
  IntColumn get installments => integer().nullable()();
  TextColumn get parentTransactionId => text().nullable()();

  IntColumn get syncVersion => integer().withDefault(const Constant(1))();
  DateTimeColumn get deletedAt => dateTime().nullable()();
  TextColumn get lastDeviceId => text().nullable()();

  DateTimeColumn get createdAt => dateTime().withDefault(currentDateAndTime)();
  DateTimeColumn get updatedAt => dateTime().withDefault(currentDateAndTime)();

  @override
  Set<Column> get primaryKey => {id};
}
