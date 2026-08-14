import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../../controller/transaction_controller.dart';
import '../../controller/account_controller.dart';
import '../../models/transaction_model.dart';
import 'transaction_card.dart';
import '../../screens/transactions_screen.dart';

class LatestTransactions extends StatelessWidget {
  const LatestTransactions({super.key, this.limit = 5});

  final int limit;

  String _accountName(List accounts, String id) {
    try {
      final a = accounts.firstWhere((e) => e.id == id);
      return a.name as String;
    } catch (_) {
      return '';
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final transactions = context.watch<TransactionController>().transactions;
    final accounts = context.watch<AccountController>().accounts;

    if (transactions.isEmpty) return const SizedBox.shrink();

    final sorted = transactions.toList()
      ..sort((a, b) => b.date.compareTo(a.date));
    final recent = sorted.take(limit).toList();

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 4),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text('Últimas transações', style: theme.textTheme.titleMedium),
              TextButton(
                onPressed: () => Navigator.of(context).push(
                  MaterialPageRoute(builder: (_) => const TransactionsScreen()),
                ),
                child: const Text('Ver todas'),
              ),
            ],
          ),
        ),
        const SizedBox(height: 8),
        Card(
          margin: const EdgeInsets.symmetric(horizontal: 0),
          child: Padding(
            padding: const EdgeInsets.symmetric(vertical: 8, horizontal: 8),
            child: Column(
              children: List.generate(
                recent.length,
                (i) {
                  final t = recent[i];
                  final accountName = _accountName(accounts, t.accountId);
                  return Column(
                    children: [
                      TransactionCard(
                        transaction: t,
                        accountName: accountName,
                        onTap: () {
                          // abrir o formulário de edição
                          Navigator.pushNamed(context, '/transaction_form',
                              arguments: t);
                        },
                      ),
                      if (i != recent.length - 1)
                        const Divider(height: 0),
                    ],
                  );
                },
              ),
            ),
          ),
        ),
      ],
    );
  }
}
