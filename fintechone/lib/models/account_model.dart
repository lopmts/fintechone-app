// Modelo de DOMÍNIO. Nem o Drift (AccountRow) nem o backend (JSON) andam
// soltos pelo app — controller/screens/widgets só conhecem AccountModel.
// Isso permite trocar o banco local ou a API sem tocar em UI/controller.

import 'package:drift/drift.dart' show Value;
import 'package:fintechone/database/database.dart';
import 'package:uuid/uuid.dart';

import '../database/enums.dart';
import '../utils/bank_type_x.dart';

class AccountModel {
  final String id;
  final String name;
  final AccountType type;
  final BankType bank;
  final int initialBalanceCents;
  final int? salaryCents;
  final String? color;
  final String? icon;
  final int syncVersion;
  final DateTime? deletedAt;
  final DateTime createdAt;
  final DateTime updatedAt;

  const AccountModel({
    required this.id,
    required this.name,
    required this.type,
    this.bank = BankType.other,
    required this.initialBalanceCents,
    this.salaryCents,
    this.color,
    this.icon,
    this.syncVersion = 1,
    this.deletedAt,
    required this.createdAt,
    required this.updatedAt,
  });

  // Conversão cents -> double só acontece na borda (UI). O resto do app
  // trabalha sempre com centavos (int) pra não ter erro de arredondamento.
  double get initialBalance => initialBalanceCents / 100;
  double? get salary => salaryCents == null ? null : salaryCents! / 100;

  /// Usado ao criar uma conta nova a partir de um formulário na UI.
  factory AccountModel.create({
    required String name,
    required AccountType type,
    BankType bank = BankType.other,
    required double initialBalance,
    double? salary,
    String? color,
    String? icon,
  }) {
    final now = DateTime.now();
    return AccountModel(
      id: const Uuid().v4(),
      name: name,
      type: type,
      bank: bank,
      initialBalanceCents: (initialBalance * 100).round(),
      salaryCents: salary == null ? null : (salary * 100).round(),
      color: color,
      icon: icon,
      createdAt: now,
      updatedAt: now,
    );
  }

  Map<String, dynamic> toApiJson() => {
    'id': id,
    'name': name,
    'type': type.name.toUpperCase(), // ← CONVERTE PARA MAIÚSCULO
    'bank': bank.backendValue,
    'initialBalance': initialBalance,
    'salary': salary,
    if (color != null) 'color': color, // ← SÓ ENVIA SE NÃO FOR NULL
    if (icon != null) 'icon': icon, // ← SÓ ENVIA SE NÃO FOR NULL
  };

  /// Igual [create], mas recebe os valores já em centavos — é o que os
  /// formulários com [MoneyFormField] devem usar, pra nunca passar por
  /// double na entrada de dinheiro.
  factory AccountModel.createFromCents({
    required String name,
    required AccountType type,
    BankType bank = BankType.other,
    required int initialBalanceCents,
    int? salaryCents,
    String? color,
    String? icon,
  }) {
    final now = DateTime.now();
    return AccountModel(
      id: const Uuid().v4(),
      name: name,
      type: type,
      bank: bank,
      initialBalanceCents: initialBalanceCents,
      salaryCents: salaryCents,
      color: color,
      icon: icon,
      createdAt: now,
      updatedAt: now,
    );
  }

  factory AccountModel.fromRow(AccountRow row) => AccountModel(
    id: row.id,
    name: row.name,
    type: row.type,
    bank: row.bank,
    initialBalanceCents: row.initialBalanceCents,
    salaryCents: row.salaryCents,
    color: row.color,
    icon: row.icon,
    syncVersion: row.syncVersion,
    deletedAt: row.deletedAt,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  );

  factory AccountModel.fromJson(Map<String, dynamic> json) => AccountModel(
    id: json['id'] as String,
    name: json['name'] as String,
    type: AccountType.values.byName(
      (json['type'] as String).toLowerCase(),
    ), // ← CONVERTE PARA MINÚSCULO ANTES DE BUSCAR
    bank: BankTypeX.fromBackendValue(json['bank'] as String?),
    initialBalanceCents: ((json['initialBalance'] as num) * 100).round(),
    salaryCents: json['salary'] == null
        ? null
        : ((json['salary'] as num) * 100).round(),
    color: json['color'] as String?,
    icon: json['icon'] as String?,
    syncVersion: json['syncVersion'] as int? ?? 1,
    deletedAt: json['deletedAt'] == null
        ? null
        : DateTime.parse(json['deletedAt'] as String),
    createdAt: DateTime.parse(json['createdAt'] as String),
    updatedAt: DateTime.parse(json['updatedAt'] as String),
  );

  Map<String, dynamic> toJson() => {
    'id': id,
    'name': name,
    'type': type.name,
    'bank': bank.backendValue,
    'initialBalance': initialBalance,
    'salary': salary,
    'color': color,
    'icon': icon,
    'syncVersion': syncVersion,
    'deletedAt': deletedAt?.toIso8601String(),
    'createdAt': createdAt.toIso8601String(),
    'updatedAt': updatedAt.toIso8601String(),
  };

  AccountsCompanion toCompanion() => AccountsCompanion(
    id: Value(id),
    name: Value(name),
    type: Value(type),
    bank: Value(bank),
    initialBalanceCents: Value(initialBalanceCents),
    salaryCents: Value(salaryCents),
    color: Value(color),
    icon: Value(icon),
    syncVersion: Value(syncVersion),
    deletedAt: Value(deletedAt),
    createdAt: Value(createdAt),
    updatedAt: Value(updatedAt),
  );

  AccountModel copyWith({
    String? name,
    AccountType? type,
    BankType? bank,
    int? initialBalanceCents,
    int? salaryCents,
    // Diferente dos outros campos: `salaryCents: null` sozinho NÃO limpa o
    // valor (senão não daria pra distinguir "não mudou" de "quero limpar").
    // Pra limpar de verdade, passe clearSalary: true.
    bool clearSalary = false,
    String? color,
    String? icon,
    int? syncVersion,
  }) => AccountModel(
    id: id,
    name: name ?? this.name,
    type: type ?? this.type,
    bank: bank ?? this.bank,
    initialBalanceCents: initialBalanceCents ?? this.initialBalanceCents,
    salaryCents: clearSalary ? null : (salaryCents ?? this.salaryCents),
    color: color ?? this.color,
    icon: icon ?? this.icon,
    syncVersion: syncVersion ?? this.syncVersion,
    deletedAt: deletedAt,
    createdAt: createdAt,
    updatedAt: DateTime.now(),
  );
}
