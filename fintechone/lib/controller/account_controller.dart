//
// Camada que as telas (screens/widgets) realmente usam. Não conhece banco
// nem rede — só fala com AccountService. Escuta o stream do banco local,
// então a UI atualiza sozinha sempre que algo muda (inclusive se o sync
// trouxer uma conta nova de outro aparelho).

import 'dart:async';

import 'package:flutter/foundation.dart';

import '../models/account_model.dart';
import '../services/account_service.dart';

class AccountController extends ChangeNotifier {
  AccountController(this._service) {
    _subscription = _service.watchAll().listen((accounts) {
      _accounts = accounts;
      notifyListeners();
    });
  }

  final AccountService _service;
  late final StreamSubscription<List<AccountModel>> _subscription;

  List<AccountModel> _accounts = [];
  List<AccountModel> get accounts => _accounts;

  bool _isSaving = false;
  bool get isSaving => _isSaving;

  double get totalBalance =>
      _accounts.fold(0, (sum, a) => sum + a.initialBalance);

  /// Recebe o modelo já pronto — quem monta (com [AccountModel.create] ou
  /// [AccountModel.createFromCents]) é o formulário. O controller só
  /// entrega pro service e cuida do estado de loading.
  Future<void> addAccount(AccountModel account) async {
    _isSaving = true;
    notifyListeners();
    try {
      await _service.create(account);
    } finally {
      _isSaving = false;
      notifyListeners();
    }
  }

  /// Mesma ideia: quem monta o AccountModel atualizado (via `copyWith`) é
  /// o formulário — o controller só repassa. Reaproveitável em qualquer
  /// tela que precise editar uma conta, não só no formulário completo.
  Future<void> updateAccount(AccountModel account) async {
    _isSaving = true;
    notifyListeners();
    try {
      await _service.update(account);
    } finally {
      _isSaving = false;
      notifyListeners();
    }
  }

  /// Atalho pra edição rápida de um campo só (ex: renomear numa lista, sem
  /// abrir o formulário completo). Por baixo, é só um updateAccount.
  Future<void> renameAccount(AccountModel account, String newName) =>
      updateAccount(account.copyWith(name: newName));

  Future<void> removeAccount(String id) => _service.delete(id);

  @override
  void dispose() {
    _subscription.cancel();
    super.dispose();
  }
}
