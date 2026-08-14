import 'package:fintechone/screens/home_screen.dart';
import 'package:fintechone/screens/settings/settings_screen.dart';
import 'package:fintechone/shared/placeholder_screen.dart';
import 'package:flutter/material.dart';

class MainTabScreen extends StatefulWidget {
  const MainTabScreen({super.key});

  @override
  State<MainTabScreen> createState() => _MainTabScreenState();
}

class _MainTabScreenState extends State<MainTabScreen> {
  int _selectedIndex = 0;

  // Só 3 abas de verdade agora — "Mais" não entra aqui porque não fica
  // "viva" no IndexedStack, ela navega (push) pra SettingsScreen quando
  // tocada, em vez de trocar o conteúdo da aba. O "+" do meio também é
  // ação, não aba, pelo mesmo motivo.
  final List<Widget> _pages = const [
    HomeScreen(),
    PlaceholderScreen(title: 'Transações'),
    PlaceholderScreen(title: 'Relatórios'),
  ];

  void _openAddMenu() {
    showModalBottomSheet(
      context: context,
      showDragHandle: true,
      builder: (sheetContext) => SafeArea(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            ListTile(
              leading: const Icon(Icons.account_balance_outlined),
              title: const Text('Nova conta'),
              onTap: () {
                Navigator.pop(sheetContext);
                Navigator.pushNamed(context, '/account_form');
              },
            ),
            ListTile(
              leading: const Icon(Icons.receipt_long_outlined),
              title: const Text('Nova transação'),
              onTap: () {
                Navigator.pop(sheetContext);
                Navigator.pushNamed(context, '/transaction_form');
              },
            ),
            const SizedBox(height: 8),
          ],
        ),
      ),
    );
  }

  void _openSettings() {
    // Push normal (empilha por cima, com botão de voltar) — diferente das
    // outras abas, que trocam o conteúdo no lugar. Se preferir usar rota
    // nomeada (ex: já tem '/settings' registrada em routes), troca por:
    // Navigator.pushNamed(context, '/settings');
    Navigator.of(
      context,
    ).push(MaterialPageRoute(builder: (_) => const SettingsScreen()));
  }

  @override
  Widget build(BuildContext context) {
    final cs = Theme.of(context).colorScheme;

    return Scaffold(
      // IndexedStack mantém cada aba viva (scroll, streams, estado) ao
      // trocar de aba — _pages[_selectedIndex] reconstruiria tudo do zero
      // toda vez.
      body: IndexedStack(index: _selectedIndex, children: _pages),
      floatingActionButtonLocation: FloatingActionButtonLocation.centerDocked,
      floatingActionButton: FloatingActionButton(
        onPressed: _openAddMenu,
        backgroundColor: cs.primary,
        foregroundColor: cs.onPrimary,
        shape: const CircleBorder(),
        child: const Icon(Icons.add),
      ),
      bottomNavigationBar: BottomAppBar(
        shape: const CircularNotchedRectangle(),
        notchMargin: 8,
        color: cs.surfaceContainerHigh,
        padding: EdgeInsets.zero,
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          children: [
            _NavItem(
              icon: Icons.home_rounded,
              label: 'Início',
              selected: _selectedIndex == 0,
              onTap: () => setState(() => _selectedIndex = 0),
            ),
            _NavItem(
              icon: Icons.list_alt_rounded,
              label: 'Transações',
              selected: _selectedIndex == 1,
              onTap: () => setState(() => _selectedIndex = 1),
            ),
            // Espaço reservado pro recorte (notch) do FAB central.
            const SizedBox(width: 56),
            _NavItem(
              icon: Icons.pie_chart_outline_rounded,
              label: 'Relatórios',
              selected: _selectedIndex == 2,
              onTap: () => setState(() => _selectedIndex = 2),
            ),
            _NavItem(
              icon: Icons.apps_rounded,
              label: 'Mais',
              // Não representa uma aba do IndexedStack, então nunca fica
              // "selecionada" de verdade — é só um atalho de navegação.
              selected: false,
              onTap: _openSettings,
            ),
          ],
        ),
      ),
    );
  }
}

class _NavItem extends StatelessWidget {
  const _NavItem({
    required this.icon,
    required this.label,
    required this.selected,
    required this.onTap,
  });

  final IconData icon;
  final String label;
  final bool selected;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final color = selected
        ? theme.colorScheme.primary
        : theme.colorScheme.onSurfaceVariant;

    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(12),
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 8),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(icon, color: color, size: 24),
            const SizedBox(height: 2),
            Text(
              label,
              style: theme.textTheme.labelSmall?.copyWith(
                color: color,
                fontWeight: selected ? FontWeight.w600 : FontWeight.normal,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
