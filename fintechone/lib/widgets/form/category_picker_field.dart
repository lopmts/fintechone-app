import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../../controller/category_controller.dart';
import '../../database/enums.dart';
import '../../models/category_model.dart';

class CategoryPickerField extends StatelessWidget {
  const CategoryPickerField({
    super.key,
    required this.transactionType,
    required this.selectedCategoryId,
    required this.onChanged,
    this.label = 'Categoria',
    this.required = false,
  });

  /// Filtra as opções — categoria de despesa não aparece pra uma receita.
  final TransactionType transactionType;
  final String? selectedCategoryId;
  final ValueChanged<CategoryModel?> onChanged;
  final String label;
  final bool required;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final categories = context.watch<CategoryController>().byType(
      transactionType,
    );

    CategoryModel? selected;
    for (final c in categories) {
      if (c.id == selectedCategoryId) {
        selected = c;
        break;
      }
    }

    return FormField<String>(
      initialValue: selectedCategoryId,
      validator: (_) => (required && selectedCategoryId == null)
          ? 'Selecione uma categoria'
          : null,
      builder: (field) => InkWell(
        borderRadius: BorderRadius.circular(4),
        onTap: () async {
          final picked = await _openPicker(context, categories, selected);
          // null pode significar "usuário fechou sem escolher" — só aplica
          // se algo foi de fato selecionado no sheet.
          if (picked != null) {
            field.didChange(picked.id);
            onChanged(picked);
          }
        },
        child: InputDecorator(
          decoration: InputDecoration(
            labelText: label,
            errorText: field.errorText,
          ),
          child: selected == null
              ? Text(
                  'Selecionar categoria',
                  style: theme.textTheme.bodyMedium?.copyWith(
                    color: theme.colorScheme.onSurfaceVariant,
                  ),
                )
              : Row(
                  children: [
                    CircleAvatar(
                      radius: 12,
                      backgroundColor: selected.color,
                      child: Icon(selected.icon, size: 14, color: Colors.white),
                    ),
                    const SizedBox(width: 8),
                    Text(selected.name),
                  ],
                ),
        ),
      ),
    );
  }

  Future<CategoryModel?> _openPicker(
    BuildContext context,
    List<CategoryModel> categories,
    CategoryModel? current,
  ) {
    return showModalBottomSheet<CategoryModel>(
      context: context,
      showDragHandle: true,
      builder: (sheetContext) => SafeArea(
        child: Padding(
          padding: const EdgeInsets.fromLTRB(16, 0, 16, 16),
          child: Wrap(
            spacing: 12,
            runSpacing: 12,
            children: [
              for (final category in categories)
                _CategoryChip(
                  category: category,
                  selected: category.id == current?.id,
                  onTap: () => Navigator.pop(sheetContext, category),
                ),
            ],
          ),
        ),
      ),
    );
  }
}

class _CategoryChip extends StatelessWidget {
  const _CategoryChip({
    required this.category,
    required this.selected,
    required this.onTap,
  });

  final CategoryModel category;
  final bool selected;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(16),
      child: Container(
        width: 84,
        padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 8),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(16),
          border: Border.all(
            color: selected
                ? theme.colorScheme.primary
                : theme.colorScheme.outlineVariant,
            width: selected ? 2 : 1,
          ),
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            CircleAvatar(
              radius: 18,
              backgroundColor: category.color,
              child: Icon(category.icon, color: Colors.white, size: 18),
            ),
            const SizedBox(height: 6),
            Text(
              category.name,
              textAlign: TextAlign.center,
              maxLines: 2,
              overflow: TextOverflow.ellipsis,
              style: theme.textTheme.bodySmall,
            ),
          ],
        ),
      ),
    );
  }
}
