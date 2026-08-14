import 'package:drift/drift.dart';

import '../database.dart';
import '../tables/budgets_table.dart';

part 'budgets_dao.g.dart';

@DriftAccessor(tables: [Budgets])
class BudgetsDao extends DatabaseAccessor<AppDatabase> with _$BudgetsDaoMixin {
  BudgetsDao(super.db);

  // ── READ ──
  Future<List<BudgetRow>> getAll() =>
      (select(budgets)..where((t) => t.deletedAt.isNull())).get();

  Stream<List<BudgetRow>> watchAll() =>
      (select(budgets)..where((t) => t.deletedAt.isNull())).watch();

  Future<BudgetRow?> getById(String id) =>
      (select(budgets)..where((t) => t.id.equals(id))).getSingleOrNull();

  // ── CREATE ──
  Future<int> insertOne(BudgetsCompanion entry) => into(budgets).insert(entry);

  Future<void> insertMany(List<BudgetsCompanion> entries) =>
      batch((b) => b.insertAll(budgets, entries));

  // ── UPDATE ──
  Future<bool> updateOne(BudgetsCompanion entry) =>
      update(budgets).replace(entry);

  Future<void> updateMany(List<BudgetsCompanion> entries) => batch((b) {
    for (final e in entries) {
      b.replace(budgets, e);
    }
  });

  // ── DELETE (soft delete) ──
  Future<int> softDeleteOne(String id) =>
      (update(budgets)..where((t) => t.id.equals(id))).write(
        BudgetsCompanion(deletedAt: Value(DateTime.now())),
      );

  Future<void> softDeleteMany(List<String> ids) => batch((b) {
    for (final id in ids) {
      b.update(
        budgets,
        BudgetsCompanion(deletedAt: Value(DateTime.now())),
        where: (t) => t.id.equals(id),
      );
    }
  });

  // ── DELETE (hard delete) ──
  Future<int> hardDeleteOne(String id) =>
      (delete(budgets)..where((t) => t.id.equals(id))).go();
}
