import 'package:flutter/material.dart';

import '../database/enums.dart';

extension TransactionTypeX on TransactionType {
  String get label => switch (this) {
    TransactionType.expense => 'Despesa',
    TransactionType.income => 'Receita',
  };

  IconData get icon => switch (this) {
    TransactionType.expense => Icons.arrow_downward_rounded,
    TransactionType.income => Icons.arrow_upward_rounded,
  };

  /// Verde pra receita, vermelho do tema pra despesa — mesmo esquema já
  /// usado no SummaryCard.
  Color color(ColorScheme scheme) =>
      this == TransactionType.income ? Colors.green : scheme.error;

  String get backendValue => switch (this) {
    TransactionType.expense => 'EXPENSE',
    TransactionType.income => 'INCOME',
  };

  static TransactionType fromBackendValue(String? value) =>
      value == 'INCOME' ? TransactionType.income : TransactionType.expense;
}
