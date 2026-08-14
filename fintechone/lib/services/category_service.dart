import 'package:drift/drift.dart' show Value;
import 'package:fintechone/database/database.dart';
import 'package:uuid/uuid.dart';

import '../database/daos/categories_dao.dart';
import '../database/enums.dart';
import '../models/category_model.dart';
import '../utils/category_key_x.dart';

class CategoryService {
  CategoryService({required CategoriesDao dao}) : _dao = dao {
    _ensureSeeded();
  }

  final CategoriesDao _dao;

  Stream<List<CategoryModel>> watchAll() =>
      _dao.watchAll().map((rows) => rows.map(CategoryModel.fromRow).toList());

  /// Roda uma vez (no primeiro uso do app): se a tabela estiver vazia,
  /// cria um registro por CategoryKey. Idempotente — chamar de novo depois
  /// que já tem dados não faz nada.
  Future<void> _ensureSeeded() async {
    final existing = await _dao.getAll();
    if (existing.isNotEmpty) return;

    final entries = CategoryKey.values
        .map(
          (key) => CategoriesCompanion(
            id: Value(const Uuid().v4()),
            key: Value(key),
            name: Value(key.label),
            // Strings persistidas só pra bater com o schema do Prisma — o
            // Flutter nunca lê esses dois de volta pra desenhar a UI (ver
            // CategoryModel.icon/color).
            icon: Value(key.name),
            color: Value(
              '#${key.color.toARGB32().toRadixString(16).padLeft(8, '0')}',
            ),
            type: Value(key.defaultType),
          ),
        )
        .toList();

    await _dao.insertMany(entries);
  }
}
