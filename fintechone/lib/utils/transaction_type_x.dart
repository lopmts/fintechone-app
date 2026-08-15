// lib/utils/transaction_type_x.dart
//
// Mesmo padrão de AccountTypeX/BankTypeX: label, ícone, cor, e a tradução
// pro formato exato do Prisma. `transfer` é neutro de propósito — não é
// receita nem despesa, é dinheiro se movendo entre contas suas.

import 'package:flutter/material.dart';

import '../database/enums.dart';

extension TransactionTypeX on TransactionType {
  String get label => switch (this) {
    TransactionType.expense => 'Despesa',
    TransactionType.income => 'Receita',
    TransactionType.transfer => 'Transferência',
  };

  IconData get icon => switch (this) {
    TransactionType.expense => Icons.arrow_downward_rounded,
    TransactionType.income => Icons.arrow_upward_rounded,
    TransactionType.transfer => Icons.swap_horiz_rounded,
  };

  /// Verde pra receita, vermelho do tema pra despesa, tertiary (neutro) pra
  /// transferência — mesmo esquema já usado no SummaryCard, só que agora
  /// com uma terceira cor pra não confundir transfer com despesa.
  Color color(ColorScheme scheme) => switch (this) {
    TransactionType.income => Colors.green,
    TransactionType.expense => scheme.error,
    TransactionType.transfer => scheme.tertiary,
  };

  /// Valor exato do enum no Prisma. Atenção: isso assume que o backend já
  /// tem TRANSFER no schema — se ainda não tiver, adicione lá também
  /// (`enum TransactionType { EXPENSE INCOME TRANSFER }`), senão o sync
  /// vai devolver erro de validação ao tentar enviar uma transferência.
  String get backendValue => switch (this) {
    TransactionType.expense => 'EXPENSE',
    TransactionType.income => 'INCOME',
    TransactionType.transfer => 'TRANSFER',
  };

  static TransactionType fromBackendValue(String? value) => switch (value) {
    'INCOME' => TransactionType.income,
    'TRANSFER' => TransactionType.transfer,
    _ => TransactionType.expense,
  };
}
