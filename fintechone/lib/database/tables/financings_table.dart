import 'package:drift/drift.dart';
import 'package:uuid/uuid.dart';

@DataClassName('FinancingRow')
class Financings extends Table {
  TextColumn get id => text().clientDefault(() => const Uuid().v4())();

  BoolColumn get isActive => boolean().withDefault(const Constant(true))();
  TextColumn get title => text().nullable()();

  IntColumn get amountCents => integer()(); // valor financiado (informativo)
  IntColumn get installmentAmountCents => integer()(); // valor da parcela

  // Taxas em percentual (ex: 1.99 = 1,99%). Não entram em soma monetária
  // direta, só em cálculo isolado — por isso ficam como REAL mesmo.
  RealColumn get interestRate => real().nullable()(); // % ao mês

  IntColumn get installments => integer()();
  DateTimeColumn get startDate => dateTime()();

  // Penalidades por atraso (% sobre o valor da parcela)
  RealColumn get lateFeeRate => real().nullable()(); // multa única
  RealColumn get lateInterestRate =>
      real().nullable()(); // juros de mora (%/dia)

  DateTimeColumn get createdAt => dateTime().withDefault(currentDateAndTime)();
  DateTimeColumn get updatedAt => dateTime().withDefault(currentDateAndTime)();

  @override
  Set<Column> get primaryKey => {id};
}
