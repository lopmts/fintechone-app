import 'package:drift/drift.dart';

import '../database.dart';
import '../tables/categories_table.dart';

part 'categories_dao.g.dart';

@DriftAccessor(tables: [Categories])
class CategoriesDao extends DatabaseAccessor<AppDatabase>
    with _$CategoriesDaoMixin {
  CategoriesDao(super.db);

  // ── READ ──
  Future<List<CategoryRow>> getAll() =>
      (select(categories)..where((t) => t.deletedAt.isNull())).get();

  Stream<List<CategoryRow>> watchAll() =>
      (select(categories)..where((t) => t.deletedAt.isNull())).watch();

  Future<CategoryRow?> getById(String id) =>
      (select(categories)..where((t) => t.id.equals(id))).getSingleOrNull();

  // ── CREATE ──
  Future<int> insertOne(CategoriesCompanion entry) =>
      into(categories).insert(entry);

  Future<void> insertMany(List<CategoriesCompanion> entries) =>
      batch((b) => b.insertAll(categories, entries));

  // ── UPDATE ──
  Future<bool> updateOne(CategoriesCompanion entry) =>
      update(categories).replace(entry);

  Future<void> updateMany(List<CategoriesCompanion> entries) => batch((b) {
    for (final e in entries) {
      b.replace(categories, e);
    }
  });

  // ── DELETE (soft delete — mantém histórico e permite sync) ──
  Future<int> softDeleteOne(String id) =>
      (update(categories)..where((t) => t.id.equals(id))).write(
        CategoriesCompanion(deletedAt: Value(DateTime.now())),
      );

  Future<void> softDeleteMany(List<String> ids) => batch((b) {
    for (final id in ids) {
      b.update(
        categories,
        CategoriesCompanion(deletedAt: Value(DateTime.now())),
        where: (t) => t.id.equals(id),
      );
    }
  });

  // ── DELETE (hard delete — uso raro, ex: limpar dados de teste) ──
  Future<int> hardDeleteOne(String id) =>
      (delete(categories)..where((t) => t.id.equals(id))).go();
}
