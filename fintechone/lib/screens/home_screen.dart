import 'package:flutter/material.dart';

import '../../widgets/accounts/accounts_summary_card.dart';
import '../../widgets/home/home_header.dart';
import '../../widgets/home/summary_card.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

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
          ],
        ),
      ),
    );
  }
}
