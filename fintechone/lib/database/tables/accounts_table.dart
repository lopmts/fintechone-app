import 'package:drift/drift.dart';

import '../enums.dart';

@DataClassName('AccountRow')
class Accounts extends Table {
  TextColumn get id => text()();
  TextColumn get name => text()();
  IntColumn get type => intEnum<AccountType>().withDefault(const Constant(0))();

  // Valores monetários guardados em CENTAVOS (int), nunca double/Decimal:
  // SQLite não tem tipo Decimal e REAL causa erro de arredondamento.
  IntColumn get initialBalanceCents => integer()();
  IntColumn get salaryCents => integer().nullable()();
  IntColumn get bank => intEnum<BankType>().withDefault(const Constant(0))();

  TextColumn get color => text().nullable()();
  TextColumn get icon => text().nullable()();

  IntColumn get syncVersion => integer().withDefault(const Constant(1))();
  DateTimeColumn get deletedAt => dateTime().nullable()();

  DateTimeColumn get createdAt => dateTime().withDefault(currentDateAndTime)();
  DateTimeColumn get updatedAt => dateTime().withDefault(currentDateAndTime)();

  @override
  Set<Column> get primaryKey => {id};
}
