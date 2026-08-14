//
// Botão de salvar padrão — mostra spinner e desabilita enquanto
// controller.isSaving for true. Mesmo botão em todos os formulários.

import 'package:flutter/material.dart';

class AppFormSubmitButton extends StatelessWidget {
  const AppFormSubmitButton({
    super.key,
    required this.isSaving,
    required this.onPressed,
    required this.label,
  });

  final bool isSaving;
  final VoidCallback onPressed;
  final String label;

  @override
  Widget build(BuildContext context) {
    return FilledButton(
      onPressed: isSaving ? null : onPressed,
      child: isSaving
          ? const SizedBox(
              height: 18,
              width: 18,
              child: CircularProgressIndicator(strokeWidth: 2),
            )
          : Text(label),
    );
  }
}
