// Combina 3 fontes reativas (contas, fluxo do mês, fluxo histórico) num
// único estado pro card "Resumo geral". Depende só de Services (nunca de
// outro Controller) — mesmo padrão do resto do app.

import 'dart:async';

import 'package:flutter/foundation.dart';

import '../models/account_model.dart';
import '../services/account_service.dart';
import '../services/summary_service.dart';

class SummaryController extends ChangeNotifier {
  SummaryController({
    required AccountService accountService,
    required SummaryService summaryService,
  }) : _accountService = accountService,
       _summaryService = summaryService {
    _accountsSub = _accountService.watchAll().listen((accounts) {
      _accounts = accounts;
      _recompute();
    });
    _monthFlowsSub = _summaryService.watchMonthFlows().listen((flows) {
      _monthFlows = flows;
      _recompute();
    });
    _allTimeFlowsSub = _summaryService.watchAllTimeFlows().listen((flows) {
      _allTimeFlows = flows;
      _recompute();
    });
  }

  final AccountService _accountService;
  final SummaryService _summaryService;

  late final StreamSubscription<List<AccountModel>> _accountsSub;
  late final StreamSubscription<({int income, int expense})> _monthFlowsSub;
  late final StreamSubscription<({int income, int expense})> _allTimeFlowsSub;

  List<AccountModel> _accounts = [];
  ({int income, int expense}) _monthFlows = (income: 0, expense: 0);
  ({int income, int expense}) _allTimeFlows = (income: 0, expense: 0);

  /// initialBalance de todas as contas + tudo que já entrou/saiu na
  /// história — equivalente ao `accounts.totalRealBalance` do backend.
  int totalBalanceCents = 0;

  int monthIncomeCents = 0;
  int monthExpenseCents = 0;

  /// Ícone de "olho" do card — esconde os valores sem mexer nos dados.
  bool valuesHidden = false;

  void toggleValuesVisibility() {
    valuesHidden = !valuesHidden;
    notifyListeners();
  }

  void _recompute() {
    final initialSum = _accounts.fold<int>(
      0,
      (sum, a) => sum + a.initialBalanceCents,
    );
    totalBalanceCents =
        initialSum + _allTimeFlows.income - _allTimeFlows.expense;
    monthIncomeCents = _monthFlows.income;
    monthExpenseCents = _monthFlows.expense;
    notifyListeners();
  }

  @override
  void dispose() {
    _accountsSub.cancel();
    _monthFlowsSub.cancel();
    _allTimeFlowsSub.cancel();
    super.dispose();
  }
}
