//
// Dropdown genérico — usado pra AccountType agora, e depois pra
// TransactionType, BudgetPeriod, CategoryKey etc, sem duplicar o widget.
//
// Por baixo usa dropdown_button2 (^3.x). Essa versão do pacote exige um
// ValueListenable<T?> pra controlar o valor selecionado (em vez de um
// `value` simples) — isso fica todo escondido aqui dentro. Quem chama o
// componente não sabe (nem precisa saber) que isso existe: passa `value` e
// `onChanged` normais, como qualquer FormField.

import 'package:dropdown_button2/dropdown_button2.dart';
import 'package:flutter/material.dart';

class AppDropdownFormField<T> extends StatefulWidget {
  const AppDropdownFormField({
    super.key,
    required this.label,
    required this.value,
    required this.items,
    required this.labelBuilder,
    required this.onChanged,
    this.hintText = 'Selecione...',
  });

  final String label;
  final T value;
  final List<T> items;
  final String Function(T value) labelBuilder;
  final ValueChanged<T> onChanged;
  final String hintText;

  @override
  State<AppDropdownFormField<T>> createState() =>
      _AppDropdownFormFieldState<T>();
}

class _AppDropdownFormFieldState<T> extends State<AppDropdownFormField<T>> {
  // dropdown_button2 controla o valor selecionado através desse notifier —
  // é o "value" por trás dos panos.
  late final ValueNotifier<T?> _selected;

  @override
  void initState() {
    super.initState();
    _selected = ValueNotifier<T?>(widget.value);
  }

  @override
  void didUpdateWidget(covariant AppDropdownFormField<T> oldWidget) {
    super.didUpdateWidget(oldWidget);
    // Mantém sincronizado se o valor mudar de fora do widget (ex: o
    // formulário foi resetado, ou trocou de registro em modo edição).
    if (oldWidget.value != widget.value) {
      _selected.value = widget.value;
    }
  }

  @override
  void dispose() {
    _selected.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return DropdownButtonFormField2<T>(
      valueListenable: _selected,
      isExpanded: true,
      hint: Text(widget.hintText),
      decoration: InputDecoration(labelText: widget.label),
      items: widget.items
          .map(
            (item) => DropdownItem<T>(
              value: item,
              child: Text(widget.labelBuilder(item)),
            ),
          )
          .toList(),
      onChanged: (selected) {
        if (selected == null) return;
        _selected.value = selected;
        widget.onChanged(selected);
      },
      validator: (selected) => selected == null ? 'Campo obrigatório' : null,
    );
  }
}
