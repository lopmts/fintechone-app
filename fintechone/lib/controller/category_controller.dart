import 'dart:async';

import 'package:flutter/foundation.dart';

import '../database/enums.dart';
import '../models/category_model.dart';
import '../services/category_service.dart';

class CategoryController extends ChangeNotifier {
  CategoryController(this._service) {
    _subscription = _service.watchAll().listen((categories) {
      _categories = categories;
      notifyListeners();
    });
  }

  final CategoryService _service;
  late final StreamSubscription<List<CategoryModel>> _subscription;

  List<CategoryModel> _categories = [];
  List<CategoryModel> get categories => _categories;

  /// Categorias de despesa e de receita não se misturam — é isso que o
  /// CategoryPickerField usa pra filtrar as opções pelo tipo da transação.
  List<CategoryModel> byType(TransactionType type) =>
      _categories.where((c) => c.type == type).toList();

  @override
  void dispose() {
    _subscription.cancel();
    super.dispose();
  }
}
