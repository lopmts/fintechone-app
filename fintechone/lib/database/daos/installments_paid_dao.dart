import 'package:drift/drift.dart';

import '../database.dart';
import '../tables/installments_paid_table.dart';

part 'installments_paid_dao.g.dart';

@DriftAccessor(tables: [InstallmentsPaid])
class InstallmentsPaidDao extends DatabaseAccessor<AppDatabase>
    with _$InstallmentsPaidDaoMixin {
  InstallmentsPaidDao(super.db);

  // ── READ ──
  Future<List<InstallmentPaidRow>> getByFinancing(String financingId) =>
      (select(installmentsPaid)
            ..where((t) => t.financingId.equals(financingId))
            ..orderBy([(t) => OrderingTerm.asc(t.installmentNumber)]))
          .get();

  Stream<List<InstallmentPaidRow>> watchByFinancing(String financingId) =>
      (select(installmentsPaid)
            ..where((t) => t.financingId.equals(financingId))
            ..orderBy([(t) => OrderingTerm.asc(t.installmentNumber)]))
          .watch();

  // ── CREATE ──
  // Unique(financingId, installmentNumber) no schema evita duplicar o
  // pagamento da mesma parcela.
  Future<int> insertOne(InstallmentsPaidCompanion entry) =>
      into(installmentsPaid).insert(entry);

  Future<void> insertMany(List<InstallmentsPaidCompanion> entries) =>
      batch((b) => b.insertAll(installmentsPaid, entries));

  // ── UPDATE ──
  Future<bool> updateOne(InstallmentsPaidCompanion entry) =>
      update(installmentsPaid).replace(entry);

  // ── DELETE (hard delete — ex: usuário desmarcou parcela como paga) ──
  Future<int> deleteOne(String id) =>
      (delete(installmentsPaid)..where((t) => t.id.equals(id))).go();

  Future<int> deleteByFinancingAndNumber(
    String financingId,
    int installmentNumber,
  ) =>
      (delete(installmentsPaid)..where(
            (t) =>
                t.financingId.equals(financingId) &
                t.installmentNumber.equals(installmentNumber),
          ))
          .go();

  Future<int> deleteMany(List<String> ids) =>
      (delete(installmentsPaid)..where((t) => t.id.isIn(ids))).go();
}
