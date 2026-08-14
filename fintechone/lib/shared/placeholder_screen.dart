// Stub reutilizável pra abas que ainda não têm tela de verdade
// (Transações, Relatórios). Troca por uma tela real depois é só trocar a
// entrada correspondente na lista `_pages` do MainTabScreen — nada mais
// muda.

import 'package:flutter/material.dart';

class PlaceholderScreen extends StatelessWidget {
  const PlaceholderScreen({super.key, required this.title});

  final String title;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Scaffold(
      body: Center(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(
              Icons.construction_rounded,
              size: 40,
              color: theme.colorScheme.outline,
            ),
            const SizedBox(height: 12),
            Text('$title — em breve', style: theme.textTheme.titleMedium),
          ],
        ),
      ),
    );
  }
}
