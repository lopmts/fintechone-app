import 'package:drift/drift.dart';

import '../enums.dart';

@DataClassName('CategoryRow')
class Categories extends Table {
  TextColumn get id => text()();
  IntColumn get key => intEnum<CategoryKey>().unique()();
  TextColumn get name => text()();
  TextColumn get icon => text()();
  TextColumn get color => text()();
  IntColumn get type => intEnum<TransactionType>()();

  IntColumn get syncVersion => integer().withDefault(const Constant(1))();
  DateTimeColumn get deletedAt => dateTime().nullable()();

  @override
  Set<Column> get primaryKey => {id};
}
