import 'package:flutter/material.dart';

import '../database/enums.dart';

extension CategoryKeyX on CategoryKey {
  String get label => switch (this) {
    CategoryKey.food => 'Alimentação',
    CategoryKey.transport => 'Transporte',
    CategoryKey.housing => 'Moradia',
    CategoryKey.health => 'Saúde',
    CategoryKey.leisure => 'Lazer',
    CategoryKey.education => 'Educação',
    CategoryKey.clothing => 'Vestuário',
    CategoryKey.salary => 'Salário',
    CategoryKey.freelance => 'Freelance',
    CategoryKey.investment => 'Investimentos',
    CategoryKey.card => 'Cartão',
    CategoryKey.other => 'Outros',
  };

  IconData get icon => switch (this) {
    CategoryKey.food => Icons.restaurant_outlined,
    CategoryKey.transport => Icons.directions_car_outlined,
    CategoryKey.housing => Icons.home_outlined,
    CategoryKey.health => Icons.favorite_outline,
    CategoryKey.leisure => Icons.diamond_outlined,
    CategoryKey.education => Icons.school_outlined,
    CategoryKey.clothing => Icons.checkroom_outlined,
    CategoryKey.salary => Icons.payments_outlined,
    CategoryKey.freelance => Icons.laptop_mac_outlined,
    CategoryKey.investment => Icons.trending_up_outlined,
    CategoryKey.card => Icons.credit_card_outlined,
    CategoryKey.other => Icons.more_horiz_outlined,
  };

  Color get color => switch (this) {
    CategoryKey.food => const Color(0xFFFF7A00),
    CategoryKey.transport => const Color(0xFF2E7DFF),
    CategoryKey.housing => const Color(0xFF9C27B0),
    CategoryKey.health => const Color(0xFFE53935),
    CategoryKey.leisure => const Color(0xFFFFC107),
    CategoryKey.education => const Color(0xFF00897B),
    CategoryKey.clothing => const Color(0xFFAB47BC),
    CategoryKey.salary => const Color(0xFF43A047),
    CategoryKey.freelance => const Color(0xFF3949AB),
    CategoryKey.investment => const Color(0xFF00ACC1),
    CategoryKey.card => const Color(0xFF6D4C41),
    CategoryKey.other => const Color(0xFF757575),
  };

  /// Usado só ao semear a tabela pela primeira vez.
  TransactionType get defaultType => switch (this) {
    CategoryKey.salary ||
    CategoryKey.freelance ||
    CategoryKey.investment => TransactionType.income,
    _ => TransactionType.expense,
  };
}
