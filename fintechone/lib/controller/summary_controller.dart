// lib/controller/summary_controller.dart
//
// Combina fontes reativas (contas, fluxos, categorias) num único estado
// pros cards "Resumo geral" e "Categorias" da Home. Depende só de Services
// (nunca de outro Controller) — mesmo padrão do resto do app.

import 'dart:async';

import 'package:flutter/foundation.dart';

import '../models/account_model.dart';
import '../models/category_model.dart';
import '../services/account_service.dart';
import '../services/category_service.dart';
import '../services/summary_service.dart';

class SummaryController extends ChangeNotifier {
  SummaryController({
    required AccountService accountService,
    required SummaryService summaryService,
    required CategoryService categoryService,
  }) : _accountService = accountService,
       _summaryService = summaryService,
       _categoryService = categoryService {
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
    _categoriesSub = _categoryService.watchAll().listen((categories) {
      _categories = categories;
      _recompute();
    });
    _expensesByCategorySub = _summaryService
        .watchMonthExpensesByCategory()
        .listen((rows) {
          _expensesByCategory = rows;
          _recompute();
        });
  }

  final AccountService _accountService;
  final SummaryService _summaryService;
  final CategoryService _categoryService;

  late final StreamSubscription<List<AccountModel>> _accountsSub;

  // O tipo aqui PRECISA bater exatamente com o record que
  // TransactionsDao.watchFlows devolve — hoje {income, expense, transfer}.
  // Records em Dart comparam pelo conjunto exato de campos nomeados; se um
  // dia você mudar os campos lá no DAO, é aqui que também precisa mudar
  // (o compilador avisa na hora, diferente do "as" que só quebra em
  // runtime).
  late final StreamSubscription<({int income, int expense, int transfer})>
  _monthFlowsSub;
  late final StreamSubscription<({int income, int expense, int transfer})>
  _allTimeFlowsSub;

  late final StreamSubscription<List<CategoryModel>> _categoriesSub;
  late final StreamSubscription<List<({String categoryId, int totalCents})>>
  _expensesByCategorySub;

  List<AccountModel> _accounts = [];
  ({int income, int expense, int transfer}) _monthFlows = (
    income: 0,
    expense: 0,
    transfer: 0,
  );
  ({int income, int expense, int transfer}) _allTimeFlows = (
    income: 0,
    expense: 0,
    transfer: 0,
  );
  List<CategoryModel> _categories = [];
  List<({String categoryId, int totalCents})> _expensesByCategory = [];

  /// initialBalance de todas as contas + tudo que já entrou/saiu na
  /// história — equivalente ao `accounts.totalRealBalance` do backend.
  ///
  /// Decisão: `transfer` NÃO entra nessa conta. Transferência move dinheiro
  /// entre contas que você já possui — o efeito líquido no total deveria
  /// ser zero. Se um dia o saldo POR CONTA for exibido em algum lugar
  /// (fora deste controller, que soma todas as contas), aí sim o transfer
  /// precisa entrar (subtrai da conta de origem) — mas isso é outro
  /// cálculo, escopado por accountId, não este total agregado.
  int totalBalanceCents = 0;

  int monthIncomeCents = 0;
  int monthExpenseCents = 0;

  /// Despesas do mês por categoria, já com nome/ícone/cor resolvidos e o
  /// percentual sobre o total do mês — pronto pro card "Categorias" da
  /// Home. Só entra categoria com gasto > 0; ordenado do maior pro menor.
  List<({CategoryModel category, int totalCents, double percentage})>
  topSpendingCategories = [];

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

    final items =
        <({CategoryModel category, int totalCents, double percentage})>[];
    for (final row in _expensesByCategory) {
      final category = _findCategory(row.categoryId);
      if (category == null) continue;
      final percentage = monthExpenseCents == 0
          ? 0.0
          : (row.totalCents / monthExpenseCents) * 100;
      items.add((
        category: category,
        totalCents: row.totalCents,
        percentage: percentage,
      ));
    }
    items.sort((a, b) => b.totalCents.compareTo(a.totalCents));
    topSpendingCategories = items;

    notifyListeners();
  }

  CategoryModel? _findCategory(String id) {
    for (final c in _categories) {
      if (c.id == id) return c;
    }
    return null;
  }

  @override
  void dispose() {
    _accountsSub.cancel();
    _monthFlowsSub.cancel();
    _allTimeFlowsSub.cancel();
    _categoriesSub.cancel();
    _expensesByCategorySub.cancel();
    super.dispose();
  }
}
