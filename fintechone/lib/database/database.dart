import 'package:drift/drift.dart';
import 'package:drift_flutter/drift_flutter.dart';
import 'package:fintechone/database/enums.dart';
import 'package:uuid/uuid.dart';

import 'tables/categories_table.dart';
import 'tables/accounts_table.dart';
import 'tables/transactions_table.dart';
import 'tables/budgets_table.dart';
import 'tables/financings_table.dart';
import 'tables/installments_paid_table.dart';

import 'daos/categories_dao.dart';
import 'daos/accounts_dao.dart';
import 'daos/transactions_dao.dart';
import 'daos/budgets_dao.dart';
import 'daos/financings_dao.dart';
import 'daos/installments_paid_dao.dart';

part 'database.g.dart';

@DriftDatabase(
  tables: [
    Categories,
    Accounts,
    Transactions,
    Budgets,
    Financings,
    InstallmentsPaid,
  ],
  daos: [
    CategoriesDao,
    AccountsDao,
    TransactionsDao,
    BudgetsDao,
    FinancingsDao,
    InstallmentsPaidDao,
  ],
)
class AppDatabase extends _$AppDatabase {
  AppDatabase() : super(_openConnection());

  // Útil em testes: injeta um QueryExecutor customizado (ex: banco em memória).
  AppDatabase.forTesting(super.executor);

  @override
  int get schemaVersion => 2;

  // v1 -> v2: adicionou Accounts.bank (BankType). MigrationStrategy é o
  // jeito certo de mudar schema depois que já existem usuários com dados
  // salvos — só bumpar schemaVersion sem isso apaga o banco na próxima
  // abertura do app.
  @override
  MigrationStrategy get migration => MigrationStrategy(
    onCreate: (m) => m.createAll(),
    onUpgrade: (m, from, to) async {
      if (from < 2) {
        await m.addColumn(accounts, accounts.bank);
      }
    },
  );

  static QueryExecutor _openConnection() {
    return driftDatabase(name: 'fintechone_db');
  }
}
