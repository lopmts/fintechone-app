//
// Campo de dinheiro reutilizável — mesmo widget serve pra "saldo inicial"
// (accounts), "valor" (transactions), "valor da parcela" (financing), etc.
// Sempre trabalha em CENTAVOS; nunca devolve double.

import 'package:flutter/material.dart';

import 'currency_input_formatter.dart';

class MoneyFormField extends StatelessWidget {
  const MoneyFormField({
    super.key,
    required this.controller,
    required this.label,
    this.required = true,
    this.minCents,
    this.enabled = true,
  });

  final TextEditingController controller;
  final String label;

  /// Se true, campo vazio é erro. Se false, campo vazio é um valor
  /// "ausente" válido (ex: salário opcional) — use [centsOfOrNull] no
  /// submit pra ler como null nesse caso.
  final bool required;

  final int? minCents;
  final bool enabled;

  @override
  Widget build(BuildContext context) {
    return TextFormField(
      controller: controller,
      enabled: enabled,
      decoration: InputDecoration(labelText: label, prefixText: 'R\$ '),
      keyboardType: TextInputType.number,
      inputFormatters: [const CentsInputFormatter()],
      validator: (value) {
        final isEmpty = value == null || value.trim().isEmpty;
        if (required && isEmpty) return 'Campo obrigatório';
        if (isEmpty) return null; // opcional e vazio: válido
        final cents = centsFromMaskedText(value);
        if (minCents != null && cents < minCents!) {
          return 'Valor mínimo: R\$ ${formatCents(minCents!)}';
        }
        return null;
      },
    );
  }
}

/// Lê o valor de um [MoneyFormField] em centavos. Chame no _submit(),
/// nunca `double.parse(controller.text)`.
int centsOf(TextEditingController controller) =>
    centsFromMaskedText(controller.text);

/// Igual [centsOf], mas devolve null se o campo estiver vazio — use em
/// campos opcionais (salário, taxa de juros, etc).
int? centsOfOrNull(TextEditingController controller) =>
    controller.text.trim().isEmpty
    ? null
    : centsFromMaskedText(controller.text);

/// Cria um controller de [MoneyFormField] já formatado a partir de um valor
/// em centavos existente — use pra pré-preencher em modo edição.
TextEditingController moneyController([int? initialCents]) =>
    TextEditingController(
      text: (initialCents == null) ? '' : formatCents(initialCents),
    );
