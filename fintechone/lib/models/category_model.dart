import 'package:fintechone/database/database.dart';
import 'package:flutter/material.dart';
import 'package:drift/drift.dart' show Value;

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

  factory CategoryModel.fromJson(Map<String, dynamic> json) => CategoryModel(
    id: json['id'] as String,
    key: CategoryKey.values.byName((json['key'] as String).toLowerCase()),
    name: json['name'] as String,
    type: TransactionType.values.byName((json['type'] as String).toLowerCase()),
    syncVersion: json['syncVersion'] as int? ?? 1,
    deletedAt: json['deletedAt'] == null ? null : DateTime.parse(json['deletedAt'] as String),
  );

  Map<String, dynamic> toApiJson() => {
    'id': id,
    'key': key.name.toUpperCase(),
    'name': name,
    'icon': key.name,
    'color': '#${key.color.toARGB32().toRadixString(16).padLeft(8, '0')}',
    'type': type.name.toUpperCase(),
  };

  Map<String, dynamic> toJson() => {
    'id': id,
    'key': key.name,
    'name': name,
    'type': type.name,
    'syncVersion': syncVersion,
    'deletedAt': deletedAt?.toIso8601String(),
  };

  CategoriesCompanion toCompanion() => CategoriesCompanion(
    id: Value(id),
    key: Value(key),
    name: Value(name),
    icon: Value(key.name),
    color: Value('#${key.color.toARGB32().toRadixString(16).padLeft(8, '0')}'),
    type: Value(type),
    syncVersion: Value(syncVersion),
    deletedAt: Value(deletedAt),
  );

  @override
  bool operator ==(Object other) => other is CategoryModel && other.id == id;

  @override
  int get hashCode => id.hashCode;
}
