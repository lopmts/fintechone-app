import 'dart:async';

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../controller/transaction_controller.dart';
import '../database/enums.dart';
import '../widgets/home/transaction_card.dart';

class TransactionsScreen extends StatefulWidget {
  const TransactionsScreen({super.key});

  @override
  State<TransactionsScreen> createState() => _TransactionsScreenState();
}

class _TransactionsScreenState extends State<TransactionsScreen> {
  late DateTime _selectedMonth;
  TransactionType? _selectedType; // null = all
  Timer? _monthWatcher;

  static const List<String> _monthNames = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];

  @override
  void initState() {
    super.initState();
    final now = DateTime.now();
    _selectedMonth = DateTime(now.year, now.month, 1);

    // Periodically check if the real-world month changed and switch to it.
    // Runs every 30 minutes which is a reasonable compromise between
    // responsiveness and battery usage. Also updates when app resumes
    // because the controller will rebuild the widget tree.
    _monthWatcher = Timer.periodic(const Duration(minutes: 30), (_) {
      final now = DateTime.now();
      final currentMonth = DateTime(now.year, now.month, 1);
      if (currentMonth.year != _selectedMonth.year ||
          currentMonth.month != _selectedMonth.month) {
        setState(() {
          _selectedMonth = currentMonth;
        });
      }
    });
  }

  @override
  void dispose() {
    _monthWatcher?.cancel();
    super.dispose();
  }

  void _prevMonth() {
    setState(() {
      _selectedMonth = DateTime(
        _selectedMonth.year,
        _selectedMonth.month - 1,
        1,
      );
    });
  }

  void _nextMonth() {
    setState(() {
      _selectedMonth = DateTime(
        _selectedMonth.year,
        _selectedMonth.month + 1,
        1,
      );
    });
  }

  void _goToCurrentMonth() {
    final now = DateTime.now();
    setState(() {
      _selectedMonth = DateTime(now.year, now.month, 1);
    });
  }

  @override
  Widget build(BuildContext context) {
    final controller = context.watch<TransactionController>();
    final transactions = controller.transactions;

    // Filter transactions by selected month and type
    final filtered = transactions.where((tx) {
      final sameMonth =
          tx.date.year == _selectedMonth.year &&
          tx.date.month == _selectedMonth.month;
      final typeMatches = _selectedType == null || tx.type == _selectedType;
      return sameMonth && typeMatches;
    }).toList();

    return Scaffold(
      appBar: AppBar(title: const Text('Transações')),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            child: Row(
              children: [
                IconButton(
                  icon: const Icon(Icons.chevron_left),
                  onPressed: _prevMonth,
                  tooltip: 'Mês anterior',
                ),
                Expanded(
                  child: Center(
                    child: Text(
                      '${_monthNames[_selectedMonth.month - 1]} ${_selectedMonth.year}',
                      style: Theme.of(context).textTheme.titleMedium,
                    ),
                  ),
                ),
                IconButton(
                  icon: const Icon(Icons.chevron_right),
                  onPressed: _nextMonth,
                  tooltip: 'Próximo mês',
                ),
                IconButton(
                  icon: const Icon(Icons.calendar_today),
                  onPressed: _goToCurrentMonth,
                  tooltip: 'Ir para mês atual',
                ),
                const SizedBox(width: 8),
                // Type filter
                DropdownButton<TransactionType?>(
                  value: _selectedType,
                  hint: const Text('Tipo'),
                  items: <DropdownMenuItem<TransactionType?>>[
                    const DropdownMenuItem(value: null, child: Text('Todos')),
                    ...TransactionType.values.map((t) {
                      return DropdownMenuItem(
                        value: t,
                        child: Text(_labelForType(t)),
                      );
                    }).toList(),
                  ],
                  onChanged: (val) => setState(() => _selectedType = val),
                ),
              ],
            ),
          ),
          const Divider(height: 1),
          Expanded(
            child: filtered.isEmpty
                ? Center(
                    child: Padding(
                      padding: const EdgeInsets.all(24.0),
                      child: Text(
                        'Nenhuma transação em ${_monthNames[_selectedMonth.month - 1].toLowerCase()} ${_selectedMonth.year}.',
                        textAlign: TextAlign.center,
                        style: Theme.of(context).textTheme.bodyLarge,
                      ),
                    ),
                  )
                : ListView.separated(
                    padding: const EdgeInsets.all(16),
                    itemCount: filtered.length,
                    separatorBuilder: (_, __) => const SizedBox(height: 8),
                    itemBuilder: (context, index) {
                      final tx = filtered[index];
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
          ),
        ],
      ),
    );
  }

  static String _labelForType(TransactionType t) {
    switch (t) {
      case TransactionType.expense:
        return 'Despesa';
      case TransactionType.income:
        return 'Receita';
      case TransactionType.transfer:
        return 'Transferência';
    }
  }
}
