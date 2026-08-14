// Label, cor "de marca" e ícone de cada banco pro círculo do card — e a
// tradução pro formato exato do enum BankType do Prisma (backend), porque
// não dá pra usar `.name` direto: "Itaú" tem acento (Dart não aceita
// identificador acentuado) e o backend usa UPPER_CASE com underscore.

import 'package:flutter/material.dart';

import '../database/enums.dart';

extension BankTypeX on BankType {
  String get label => switch (this) {
    BankType.nubank => 'Nubank',
    BankType.itau => 'Itaú',
    BankType.bradesco => 'Bradesco',
    BankType.santander => 'Santander',
    BankType.caixa => 'Caixa',
    BankType.banco_do_brasil => 'Banco do Brasil',
    BankType.inter => 'Inter',
    BankType.c6_bank => 'C6 Bank',
    BankType.pagbank => 'PagBank',
    BankType.next => 'Next',
    BankType.original => 'Original',
    BankType.other => 'Outro',
  };

  /// Cor aproximada de marca, só pra diferenciar rápido na lista — não é a
  /// cor oficial exata de cada banco.
  Color get brandColor => switch (this) {
    BankType.nubank => const Color(0xFF820AD1),
    BankType.itau => const Color(0xFFEC7000),
    BankType.bradesco => const Color(0xFFCC092F),
    BankType.santander => const Color(0xFFEC0000),
    BankType.caixa => const Color(0xFF0070AE),
    BankType.banco_do_brasil => const Color(0xFF003087),
    BankType.inter => const Color(0xFFFF7A00),
    BankType.c6_bank => const Color(0xFF242424),
    BankType.pagbank => const Color(0xFF00AA4F),
    BankType.next => const Color(0xFF00E37D),
    BankType.original => const Color(0xFF00B2A9),
    BankType.other => const Color(0xFF2E7D32), // "dinheiro físico"
  };

  IconData get icon => this == BankType.other
      ? Icons.payments_outlined
      : Icons.account_balance_outlined;

  /// Valor exato do enum BankType no Prisma — use ao montar o JSON pra API.
  String get backendValue => switch (this) {
    BankType.nubank => 'NUBANK',
    BankType.itau => 'ITAÚ',
    BankType.bradesco => 'BRADESCO',
    BankType.santander => 'SANTANDER',
    BankType.caixa => 'CAIXA',
    BankType.banco_do_brasil => 'BANCO_DO_BRASIL',
    BankType.inter => 'INTER',
    BankType.c6_bank => 'C6_BANK',
    BankType.pagbank => 'PAGBANK',
    BankType.next => 'NEXT',
    BankType.original => 'ORIGINAL',
    BankType.other => 'OTHER',
  };

  /// Inverso de [backendValue] — use ao ler o JSON vindo da API.
  /// Qualquer valor desconhecido cai em [BankType.other] (nunca quebra o
  /// parse por causa de um banco novo que o backend já suporte e o app
  /// ainda não).
  static BankType fromBackendValue(String? value) => switch (value) {
    'NUBANK' => BankType.nubank,
    'ITAÚ' => BankType.itau,
    'BRADESCO' => BankType.bradesco,
    'SANTANDER' => BankType.santander,
    'CAIXA' => BankType.caixa,
    'BANCO_DO_BRASIL' => BankType.banco_do_brasil,
    'INTER' => BankType.inter,
    'C6_BANK' => BankType.c6_bank,
    'PAGBANK' => BankType.pagbank,
    'NEXT' => BankType.next,
    'ORIGINAL' => BankType.original,
    _ => BankType.other,
  };
}
