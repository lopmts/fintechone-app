import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../controller/transaction_controller.dart';
import '../controller/account_controller.dart';
import '../widgets/home/transaction_card.dart';

class TransactionsScreen extends StatelessWidget {
  const TransactionsScreen({super.key});

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
    final transactions = context.watch<TransactionController>().transactions;
    final accounts = context.watch<AccountController>().accounts;

    final sorted = transactions.toList()..sort((a, b) => b.date.compareTo(a.date));

    return Scaffold(
      appBar: AppBar(title: const Text('Transações')),
      body: ListView.separated(
        padding: const EdgeInsets.all(16),
        itemCount: sorted.length,
        separatorBuilder: (_, __) => const Divider(height: 0),
        itemBuilder: (context, index) {
          final t = sorted[index];
          final accountName = _accountName(accounts, t.accountId);
          return Padding(
            padding: const EdgeInsets.symmetric(vertical: 4),
            child: TransactionCard(
              transaction: t,
              accountName: accountName,
              onTap: () {
                Navigator.pushNamed(context, '/transaction_form', arguments: t);
              },
            ),
          );
        },
      ),
    );
  }
}
