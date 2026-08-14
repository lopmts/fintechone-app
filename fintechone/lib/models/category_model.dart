import 'package:fintechone/database/database.dart';
import 'package:flutter/material.dart';

import '../database/enums.dart';
import '../utils/category_key_x.dart';

class CategoryModel {
  final String id;
  final CategoryKey key;
  final String name;
  final TransactionType type;
  final int syncVersion;
  final DateTime? deletedAt;

  const CategoryModel({
    required this.id,
    required this.key,
    required this.name,
    required this.type,
    this.syncVersion = 1,
    this.deletedAt,
  });

  IconData get icon => key.icon;
  Color get color => key.color;

  factory CategoryModel.fromRow(CategoryRow row) => CategoryModel(
    id: row.id,
    key: row.key,
    name: row.name,
    type: row.type,
    syncVersion: row.syncVersion,
    deletedAt: row.deletedAt,
  );

  @override
  bool operator ==(Object other) => other is CategoryModel && other.id == id;

  @override
  int get hashCode => id.hashCode;
}
