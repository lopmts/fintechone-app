import 'package:drift/drift.dart';

import '../enums.dart';
import 'categories_table.dart';

@DataClassName('BudgetRow')
class Budgets extends Table {
  TextColumn get id => text()();

  TextColumn get categoryId => text().nullable().references(
    Categories,
    #id,
    onDelete: KeyAction.setNull,
  )();

  TextColumn get name => text()();
  IntColumn get amountCents => integer()();
  IntColumn get period => intEnum<BudgetPeriod>()();

  DateTimeColumn get startDate => dateTime()();
  DateTimeColumn get endDate => dateTime()();

  BoolColumn get isActive => boolean().withDefault(const Constant(true))();

  IntColumn get syncVersion => integer().withDefault(const Constant(1))();
  DateTimeColumn get deletedAt => dateTime().nullable()();

  DateTimeColumn get createdAt => dateTime().withDefault(currentDateAndTime)();
  DateTimeColumn get updatedAt => dateTime().withDefault(currentDateAndTime)();

  @override
  Set<Column> get primaryKey => {id};
}
