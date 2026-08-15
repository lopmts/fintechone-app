import 'package:drift/drift.dart';

import '../database.dart';
import '../enums.dart';
import '../tables/transactions_table.dart';

part 'transactions_dao.g.dart';

@DriftAccessor(tables: [Transactions])
class TransactionsDao extends DatabaseAccessor<AppDatabase>
    with _$TransactionsDaoMixin {
  TransactionsDao(super.db);

  // ── READ ──
  // orderBy data desc: sem isso não existe "últimas transações" — seria
  // uma ordem arbitrária do banco.
  Future<List<TransactionRow>> getAll() =>
      (select(transactions)
            ..where((t) => t.deletedAt.isNull())
            ..orderBy([(t) => OrderingTerm.desc(t.date)]))
          .get();

  Stream<List<TransactionRow>> watchAll() =>
      (select(transactions)
            ..where((t) => t.deletedAt.isNull())
            ..orderBy([(t) => OrderingTerm.desc(t.date)]))
          .watch();

  Future<TransactionRow?> getById(String id) =>
      (select(transactions)..where((t) => t.id.equals(id))).getSingleOrNull();

  Future<List<TransactionRow>> getByAccount(String accountId) => (select(
    transactions,
  )..where((t) => t.accountId.equals(accountId) & t.deletedAt.isNull())).get();

  Stream<List<TransactionRow>> watchByAccount(String accountId) =>
      (select(
            transactions,
          )..where((t) => t.accountId.equals(accountId) & t.deletedAt.isNull()))
          .watch();

  // ── CREATE ──
  Future<int> insertOne(TransactionsCompanion entry) =>
      into(transactions).insert(entry);

  Future<void> insertMany(List<TransactionsCompanion> entries) =>
      batch((b) => b.insertAll(transactions, entries));

  // ── UPDATE ──
  Future<bool> updateOne(TransactionsCompanion entry) =>
      update(transactions).replace(entry);

  Future<void> updateMany(List<TransactionsCompanion> entries) => batch((b) {
    for (final e in entries) {
      b.replace(transactions, e);
    }
  });

  // ── DELETE (soft delete) ──
  Future<int> softDeleteOne(String id) =>
      (update(transactions)..where((t) => t.id.equals(id))).write(
        TransactionsCompanion(deletedAt: Value(DateTime.now())),
      );

  Future<void> softDeleteMany(List<String> ids) => batch((b) {
    for (final id in ids) {
      b.update(
        transactions,
        TransactionsCompanion(deletedAt: Value(DateTime.now())),
        where: (t) => t.id.equals(id),
      );
    }
  });

  // ── DELETE (hard delete) ──
  Future<int> hardDeleteOne(String id) =>
      (delete(transactions)..where((t) => t.id.equals(id))).go();

  // ── AGREGAÇÃO (base do "Resumo geral" da Home) ──
  //
  // Uma consulta só, reativa (recalcula sozinha quando alguma transação
  // muda), que devolve soma de entradas e soma de saídas. accountId nulo =
  // todas as contas; from/to nulos = todo o histórico (útil pra achar o
  // saldo real: soma de todas as transações desde sempre + saldo inicial).
  Stream<({int income, int expense, int transfer})> watchFlows({
    String? accountId,
    DateTime? from,
    DateTime? to,
  }) {
    final incomeSum = transactions.amountCents.sum(
      filter: transactions.type.equalsValue(TransactionType.income),
    );
    final expenseSum = transactions.amountCents.sum(
      filter: transactions.type.equalsValue(TransactionType.expense),
    );
    final transferSum = transactions.amountCents.sum(
      filter: transactions.type.equalsValue(TransactionType.transfer),
    );
    final query = selectOnly(transactions)
      ..addColumns([incomeSum, expenseSum, transferSum])
      ..where(transactions.deletedAt.isNull());

    if (accountId != null) {
      query.where(transactions.accountId.equals(accountId));
    }
    if (from != null) {
      query.where(transactions.date.isBiggerOrEqualValue(from));
    }
    if (to != null) {
      query.where(transactions.date.isSmallerOrEqualValue(to));
    }

    return query.watchSingle().map(
      (row) => (
        income: row.read(incomeSum) ?? 0,
        expense: row.read(expenseSum) ?? 0,
        transfer: row.read(transferSum) ?? 0,
      ),
    );
  }

  // ── AGREGAÇÃO (base do card "Categorias" da Home) ──
  //
  // Soma de despesas agrupada por categoria, dentro do período — mesma
  // ideia do watchFlows, mas com groupBy em vez de filter, porque aqui
  // queremos uma linha POR categoria (não um total só). Transação sem
  // categoria (categoryId nulo) fica de fora — não tem como agrupar o que
  // não tem chave.
  Stream<List<({String categoryId, int totalCents})>> watchExpensesByCategory({
    required DateTime from,
    required DateTime to,
  }) {
    final totalExpr = transactions.amountCents.sum();

    final query = selectOnly(transactions)
      ..addColumns([transactions.categoryId, totalExpr])
      ..where(
        transactions.deletedAt.isNull() &
            transactions.type.equalsValue(TransactionType.expense) &
            transactions.categoryId.isNotNull() &
            transactions.date.isBiggerOrEqualValue(from) &
            transactions.date.isSmallerOrEqualValue(to),
      )
      ..groupBy([transactions.categoryId]);

    return query.watch().map(
      (rows) => rows
          .map(
            (row) => (
              categoryId: row.read(transactions.categoryId)!,
              totalCents: row.read(totalExpr) ?? 0,
            ),
          )
          .toList(),
    );
  }
}
