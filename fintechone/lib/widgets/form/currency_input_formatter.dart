//
// Máscara de dinheiro "estilo banco": o usuário só digita números, e eles
// vão entrando da DIREITA pra ESQUERDA — 1 -> 0,01 -> 2 -> 0,12 -> 3 -> 1,23.
// Isso é proposital: elimina de vez o double/parse na entrada de dinheiro.
// O texto exibido SEMPRE representa um valor em centavos; pra ler o valor,
// use [centsFromMaskedText] — nunca `double.parse` no texto do campo.

import 'package:flutter/services.dart';

/// Converte um valor em centavos pro formato "1.234,56" (padrão BR).
/// Não inclui "R$" — isso fica no `prefixText` do InputDecoration.
String formatCents(int cents) {
  final isNegative = cents < 0;
  final digits = cents.abs().toString().padLeft(3, '0');
  final decimals = digits.substring(digits.length - 2);
  final integerPart = digits.substring(0, digits.length - 2);
  final withThousands = integerPart.replaceAllMapped(
    RegExp(r'\B(?=(\d{3})+(?!\d))'),
    (match) => '.',
  );
  return '${isNegative ? '-' : ''}$withThousands,$decimals';
}

/// Extrai o valor em centavos de um texto mascarado (ex: "1.234,56" -> 123456).
/// Ignora qualquer caractere que não seja dígito, então funciona mesmo com
/// texto parcialmente digitado ou colado de qualquer lugar.
int centsFromMaskedText(String text) {
  final digitsOnly = text.replaceAll(RegExp(r'[^0-9]'), '');
  return digitsOnly.isEmpty ? 0 : int.parse(digitsOnly);
}

/// TextInputFormatter que aplica a máscara a cada tecla digitada.
/// Stateless de propósito: reconstrói o valor a partir dos dígitos do texto
/// atual a cada chamada, então funciona igual em qualquer TextField/
/// TextFormField sem precisar de um controller especial.
class CentsInputFormatter extends TextInputFormatter {
  const CentsInputFormatter({this.maxDigits = 13});

  /// 13 dígitos = até R$ 99.999.999.999,99 — ajuste se precisar de mais.
  final int maxDigits;

  @override
  TextEditingValue formatEditUpdate(
    TextEditingValue oldValue,
    TextEditingValue newValue,
  ) {
    // Campo totalmente apagado (ex: usuário selecionou tudo e deletou) ->
    // deixa vazio de verdade, em vez de forçar "0,00".
    if (newValue.text.isEmpty) return newValue;

    var digits = newValue.text.replaceAll(RegExp(r'[^0-9]'), '');
    if (digits.length > maxDigits) {
      digits = digits.substring(digits.length - maxDigits);
    }

    final cents = digits.isEmpty ? 0 : int.parse(digits);
    final formatted = formatCents(cents);

    return TextEditingValue(
      text: formatted,
      selection: TextSelection.collapsed(offset: formatted.length),
    );
  }
}
