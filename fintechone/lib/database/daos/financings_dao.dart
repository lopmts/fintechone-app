import 'package:drift/drift.dart';

import '../database.dart';
import '../tables/financings_table.dart';

part 'financings_dao.g.dart';

@DriftAccessor(tables: [Financings])
class FinancingsDao extends DatabaseAccessor<AppDatabase>
    with _$FinancingsDaoMixin {
  FinancingsDao(super.db);

  // ── READ ──
  // Financings não tem soft delete no schema original (isActive cobre isso).
  Future<List<FinancingRow>> getAll() => select(financings).get();

  Stream<List<FinancingRow>> watchAll() => select(financings).watch();

  Future<List<FinancingRow>> getActive() =>
      (select(financings)..where((t) => t.isActive.equals(true))).get();

  Future<FinancingRow?> getById(String id) =>
      (select(financings)..where((t) => t.id.equals(id))).getSingleOrNull();

  // ── CREATE ──
  Future<String> insertOne(FinancingsCompanion entry) =>
      into(financings).insertReturning(entry).then((row) => row.id);

  Future<void> insertMany(List<FinancingsCompanion> entries) =>
      batch((b) => b.insertAll(financings, entries));

  // ── UPDATE ──
  Future<bool> updateOne(FinancingsCompanion entry) =>
      update(financings).replace(entry);

  Future<void> updateMany(List<FinancingsCompanion> entries) => batch((b) {
    for (final e in entries) {
      b.replace(financings, e);
    }
  });

  // ── DELETE (soft — usa isActive=false, mantém histórico de parcelas) ──
  Future<int> deactivateOne(String id) =>
      (update(financings)..where((t) => t.id.equals(id))).write(
        const FinancingsCompanion(isActive: Value(false)),
      );

  Future<void> deactivateMany(List<String> ids) => batch((b) {
    for (final id in ids) {
      b.update(
        financings,
        const FinancingsCompanion(isActive: Value(false)),
        where: (t) => t.id.equals(id),
      );
    }
  });

  // ── DELETE (hard delete — cascade também apaga installments_paid) ──
  Future<int> hardDeleteOne(String id) =>
      (delete(financings)..where((t) => t.id.equals(id))).go();
}
