import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../../widgets/accounts/accounts_summary_card.dart';
import '../../widgets/home/home_header.dart';
import '../../widgets/home/summary_card.dart';
import '../../controller/transaction_controller.dart';
import '../../widgets/home/transaction_card.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final txController = context.watch<TransactionController>();
    final recent = txController.transactions.take(5).toList();

    return Scaffold(
      backgroundColor: theme.colorScheme.surface,
      body: SafeArea(
        child: ListView(
          padding: const EdgeInsets.fromLTRB(16, 8, 16, 96),
          children: [
            HomeHeader(
              onMenuTap: () {
                // TODO: abrir Drawer/menu lateral quando existir
              },
              onNotificationsTap: () {
                // TODO: tela de notificações
              },
            ),
            const SizedBox(height: 20),
            const SummaryCard(),
            const SizedBox(height: 20),
            AccountsSummaryCard(
              onSeeAll: () {
                // TODO: navegar pra uma tela "Contas" dedicada
              },
              onAddAccount: () {
                Navigator.pushNamed(context, '/account_form');
                Navigator.pushNamed(context, '/transaction_form');
              },
            ),
            const SizedBox(height: 20),
            // Últimas transações
            Row(
              children: [
                Text('Últimas transações', style: theme.textTheme.titleMedium),
                const Spacer(),
                TextButton(
                  onPressed: () => Navigator.pushNamed(context, '/transactions'),
                  child: const Text('Ver todas'),
                ),
              ],
            ),
            const SizedBox(height: 8),
            if (recent.isEmpty)
              Card(
                margin: EdgeInsets.zero,
                child: Padding(
                  padding: const EdgeInsets.all(16),
                  child: Text('Nenhuma transação registrada ainda', style: theme.textTheme.bodyMedium),
                ),
              )
            else ...[
              for (var tx in recent) ...[
                TransactionCard(
                  transaction: tx,
                  // category/account names podem ser resolvidas aqui se houver
                  categoryName: null,
                  accountName: null,
                  onTap: () {},
                ),
                const SizedBox(height: 8),
              ]
            ],
          ],
        ),
      ),
    );
  }
}
