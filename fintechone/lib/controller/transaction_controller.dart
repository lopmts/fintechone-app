import 'dart:async';

import 'package:flutter/foundation.dart';

import '../models/transaction_model.dart';
import '../services/transaction_service.dart';

class TransactionController extends ChangeNotifier {
  TransactionController(this._service) {
    _subscription = _service.watchAll().listen((transactions) {
      _transactions = transactions;
      notifyListeners();
    });
  }

  final TransactionService _service;
  late final StreamSubscription<List<TransactionModel>> _subscription;

  List<TransactionModel> _transactions = [];
  List<TransactionModel> get transactions => _transactions;

  bool _isSaving = false;
  bool get isSaving => _isSaving;

  Future<void> addTransaction(TransactionModel transaction) async {
    _isSaving = true;
    notifyListeners();
    try {
      await _service.create(transaction);
    } finally {
      _isSaving = false;
      notifyListeners();
    }
  }

  Future<void> updateTransaction(TransactionModel transaction) async {
    _isSaving = true;
    notifyListeners();
    try {
      await _service.update(transaction);
    } finally {
      _isSaving = false;
      notifyListeners();
    }
  }

  Future<void> removeTransaction(String id) => _service.delete(id);

  @override
  void dispose() {
    _subscription.cancel();
    super.dispose();
  }
}
