// "Categorias" da Home — despesas do mês agrupadas por categoria. Os dados
// vêm do SummaryController (mesma lógica do /summary do backend, mas
// calculado local — ver summary_service.dart). O percentual não existe no
// /summary (ele só devolve total por categoria); calculamos aqui em cima
// do monthExpenseCents que o próprio controller já expõe.

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../../controller/summary_controller.dart';
import '../../models/category_model.dart';
import '../form/currency_input_formatter.dart' show formatCents;

class CategoriesSummaryCard extends StatelessWidget {
  const CategoriesSummaryCard({super.key, this.onSeeAll});

  final VoidCallback? onSeeAll;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final items = context.watch<SummaryController>().topSpendingCategories;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 4),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text('Categorias', style: theme.textTheme.titleMedium),
              if (items.isNotEmpty)
                TextButton(onPressed: onSeeAll, child: const Text('Ver todas')),
            ],
          ),
        ),
        const SizedBox(height: 8),
        if (items.isEmpty)
          Card(
            margin: EdgeInsets.zero,
            clipBehavior: Clip.antiAlias,
            child: Padding(
              padding: const EdgeInsets.symmetric(vertical: 24, horizontal: 16),
              child: Column(
                children: [
                  Icon(
                    Icons.pie_chart_outline_rounded,
                    size: 32,
                    color: theme.colorScheme.outline,
                  ),
                  const SizedBox(height: 8),
                  Text(
                    'Nenhuma despesa categorizada este mês',
                    style: theme.textTheme.bodyMedium,
                    textAlign: TextAlign.center,
                  ),
                ],
              ),
            ),
          )
        else
          SizedBox(
            height: 116,
            child: ListView.separated(
              scrollDirection: Axis.horizontal,
              clipBehavior: Clip.none,
              itemCount: items.length,
              separatorBuilder: (_, __) => const SizedBox(width: 12),
              itemBuilder: (context, index) =>
                  _CategorySpendingCard(item: items[index]),
            ),
          ),
      ],
    );
  }
}

class _CategorySpendingCard extends StatelessWidget {
  const _CategorySpendingCard({required this.item});

  final ({CategoryModel category, int totalCents, double percentage}) item;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final category = item.category;

    return SizedBox(
      width: 116,
      child: Card(
        margin: EdgeInsets.zero,
        clipBehavior: Clip.antiAlias,
        child: Padding(
          padding: const EdgeInsets.all(12),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  CircleAvatar(
                    radius: 14,
                    backgroundColor: category.color,
                    child: Icon(category.icon, color: Colors.white, size: 14),
                  ),
                  const SizedBox(width: 6),
                  Expanded(
                    child: Text(
                      category.name,
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                      style: theme.textTheme.bodySmall?.copyWith(
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 10),
              Text(
                'R\$ ${formatCents(item.totalCents)}',
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
                style: theme.textTheme.bodyMedium?.copyWith(
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 2),
              Text(
                '${item.percentage.toStringAsFixed(0)}%',
                style: theme.textTheme.bodySmall?.copyWith(
                  color: theme.colorScheme.onSurfaceVariant,
                ),
              ),
              const SizedBox(height: 8),
              ClipRRect(
                borderRadius: BorderRadius.circular(4),
                child: LinearProgressIndicator(
                  value: (item.percentage / 100).clamp(0, 1),
                  minHeight: 4,
                  backgroundColor: theme.colorScheme.surfaceContainerHighest,
                  color: category.color,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
