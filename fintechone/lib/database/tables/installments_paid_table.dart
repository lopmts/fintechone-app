import 'package:drift/drift.dart';
import 'package:fintechone/database/tables/financings_table.dart';
import 'package:uuid/uuid.dart';

@DataClassName('InstallmentPaidRow')
class InstallmentsPaid extends Table {
  TextColumn get id => text().clientDefault(() => const Uuid().v4())();

  TextColumn get financingId =>
      text().references(Financings, #id, onDelete: KeyAction.cascade)();

  IntColumn get installmentNumber => integer()();
  IntColumn get amountCents => integer()();

  DateTimeColumn get paidAt => dateTime().withDefault(currentDateAndTime)();
  DateTimeColumn get createdAt => dateTime().withDefault(currentDateAndTime)();

  @override
  Set<Column> get primaryKey => {id};

  @override
  List<Set<Column>> get uniqueKeys => [
    {financingId, installmentNumber},
  ];
}
