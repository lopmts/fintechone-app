import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../controller/transaction_controller.dart';
import '../widgets/home/transaction_card.dart';

class TransactionsScreen extends StatelessWidget {
  const TransactionsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final controller = context.watch<TransactionController>();
    final transactions = controller.transactions;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Transações'),
      ),
      body: ListView.separated(
        padding: const EdgeInsets.all(16),
        itemCount: transactions.length,
        separatorBuilder: (_, __) => const SizedBox(height: 8),
        itemBuilder: (context, index) {
          final tx = transactions[index];
          return TransactionCard(
            transaction: tx,
            categoryName: null,
            accountName: null,
            onTap: () {
              // TODO: navegar para detalhe da transação quando existir
            },
          );
        },
      ),
    );
  }
}
