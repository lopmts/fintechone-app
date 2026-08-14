import 'package:drift/drift.dart';

import '../database.dart';
import '../tables/accounts_table.dart';

part 'accounts_dao.g.dart';

@DriftAccessor(tables: [Accounts])
class AccountsDao extends DatabaseAccessor<AppDatabase>
    with _$AccountsDaoMixin {
  AccountsDao(super.db);

  // ── READ ──
  Future<List<AccountRow>> getAll() =>
      (select(accounts)..where((t) => t.deletedAt.isNull())).get();

  Stream<List<AccountRow>> watchAll() =>
      (select(accounts)..where((t) => t.deletedAt.isNull())).watch();

  Future<AccountRow?> getById(String id) =>
      (select(accounts)..where((t) => t.id.equals(id))).getSingleOrNull();

  // ── CREATE ──
  Future<int> insertOne(AccountsCompanion entry) =>
      into(accounts).insert(entry);

  Future<void> insertMany(List<AccountsCompanion> entries) =>
      batch((b) => b.insertAll(accounts, entries));

  // ── UPDATE ──
  Future<bool> updateOne(AccountsCompanion entry) =>
      update(accounts).replace(entry);

  Future<void> updateMany(List<AccountsCompanion> entries) => batch((b) {
    for (final e in entries) {
      b.replace(accounts, e);
    }
  });

  // ── DELETE (soft delete) ──
  Future<int> softDeleteOne(String id) =>
      (update(accounts)..where((t) => t.id.equals(id))).write(
        AccountsCompanion(deletedAt: Value(DateTime.now())),
      );

  Future<void> softDeleteMany(List<String> ids) => batch((b) {
    for (final id in ids) {
      b.update(
        accounts,
        AccountsCompanion(deletedAt: Value(DateTime.now())),
        where: (t) => t.id.equals(id),
      );
    }
  });

  // ── DELETE (hard delete) ──
  Future<int> hardDeleteOne(String id) =>
      (delete(accounts)..where((t) => t.id.equals(id))).go();
}
