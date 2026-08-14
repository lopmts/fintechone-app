import 'package:flutter/material.dart';

class TransactionCard extends StatelessWidget {
  const TransactionCard({super.key});

  @override
  Widget build(BuildContext context) {
    return Card(
      child: ListTile(
        leading: const Icon(Icons.monetization_on),
        title: const Text('Transaction Title'),
        subtitle: const Text('Transaction Subtitle'),
        trailing: const Text('\$100.00'),
      ),
    );
  }
}
