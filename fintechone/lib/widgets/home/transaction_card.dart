import 'package:fintechone/database/enums.dart';
import 'package:flutter/material.dart';

import '../../models/transaction_model.dart';
import '../../utils/transaction_type_x.dart';
import '../form/currency_input_formatter.dart' show formatCents;

/// Cartão de transação estilizado para ser usado no Home e na lista de
/// Transações. Exibe um ícone circular, descrição, subtexto (categoria/conta),
/// valor à direita (verde para receita, vermelho para despesa) e a data.
class TransactionCard extends StatelessWidget {
  const TransactionCard({
    super.key,
    required this.transaction,
    this.categoryName,
    this.accountName,
    this.onTap,
    this.hideValues = false,
  });

  final TransactionModel transaction;
  final String? categoryName;
  final String? accountName;
  final VoidCallback? onTap;
  final bool hideValues;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final scheme = theme.colorScheme;
    final isIncome = transaction.type == TransactionType.income;
    final amountText = hideValues
        ? 'R\$ ••••••'
        : 'R\$ ${formatCents(transaction.amountCents)}';

    final icon = transaction.type.icon;
    final iconColor = transaction.type.color(scheme);

    final subtitleParts = <String>[];
    if (categoryName != null && categoryName!.isNotEmpty) {
      subtitleParts.add(categoryName!);
    }
    if (accountName != null && accountName!.isNotEmpty) {
      subtitleParts.add(accountName!);
    }
    final subtitle = subtitleParts.join(' · ');

    return Card(
      margin: EdgeInsets.zero,
      clipBehavior: Clip.antiAlias,
      child: InkWell(
        onTap: onTap,
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 12),
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              CircleAvatar(
                radius: 20,
                backgroundColor: iconColor.withOpacity(0.12),
                child: Icon(icon, color: iconColor, size: 20),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      transaction.description,
                      style: theme.textTheme.bodyLarge?.copyWith(
                        fontWeight: FontWeight.w600,
                      ),
                      overflow: TextOverflow.ellipsis,
                    ),
                    if (subtitle.isNotEmpty) ...[
                      const SizedBox(height: 6),
                      Text(
                        subtitle,
                        style: theme.textTheme.bodySmall?.copyWith(
                          color: scheme.onSurfaceVariant,
                        ),
                        overflow: TextOverflow.ellipsis,
                      ),
                    ],
                  ],
                ),
              ),
              const SizedBox(width: 12),
              Column(
                crossAxisAlignment: CrossAxisAlignment.end,
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text(
                    amountText,
                    style: theme.textTheme.titleMedium?.copyWith(
                      color: isIncome ? Colors.green : scheme.error,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 6),
                  Text(
                    _formatDate(transaction.date),
                    style: theme.textTheme.bodySmall?.copyWith(
                      color: scheme.onSurfaceVariant,
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }

  static String _formatDate(DateTime date) {
    // Formato curto: dd/MM ou Hoje/Ontem poderiam ser calculados na camada
    // de apresentação, mas por simplicidade retorna dd/MM/yyyy quando não
    // for hoje/ontem.
    final now = DateTime.now();
    final today = DateTime(now.year, now.month, now.day);
    final dt = DateTime(date.year, date.month, date.day);

    if (dt == today) return 'Hoje';
    if (dt == today.subtract(const Duration(days: 1))) return 'Ontem';
    return '${date.day.toString().padLeft(2, '0')}/${date.month.toString().padLeft(2, '0')}/${date.year}';
  }
}
