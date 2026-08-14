//
// Campo de texto padrão do app — nome, descrição, notas, título... Mesma
// decoração/validação em todos os formulários, sem repetir código.

import 'package:flutter/material.dart';

class AppTextFormField extends StatelessWidget {
  const AppTextFormField({
    super.key,
    required this.controller,
    required this.label,
    this.required = true,
    this.maxLines = 1,
    this.keyboardType,
    this.textInputAction,
    this.validator,
  });

  final TextEditingController controller;
  final String label;
  final bool required;
  final int maxLines;
  final TextInputType? keyboardType;
  final TextInputAction? textInputAction;

  /// Passe pra sobrescrever a validação padrão (obrigatório/não obrigatório).
  final String? Function(String?)? validator;

  @override
  Widget build(BuildContext context) {
    return TextFormField(
      controller: controller,
      maxLines: maxLines,
      keyboardType: keyboardType,
      textInputAction: textInputAction,
      decoration: InputDecoration(labelText: label),
      validator:
          validator ??
          (required
              ? (value) => (value == null || value.trim().isEmpty)
                    ? 'Campo obrigatório'
                    : null
              : null),
    );
  }
}
