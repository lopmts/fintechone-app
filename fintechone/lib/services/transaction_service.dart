import '../database/daos/transactions_dao.dart';
import '../models/transaction_model.dart';
import '../network/transaction_api.dart';
import 'sync_gate_service.dart';

class TransactionService {
  TransactionService({
    required TransactionsDao dao,
    required TransactionApi api,
    required SyncGateService syncGate,
  }) : _dao = dao,
       _api = api,
       _syncGate = syncGate;

  final TransactionsDao _dao;
  final TransactionApi _api;
  final SyncGateService _syncGate;

  Stream<List<TransactionModel>> watchAll() => _dao.watchAll().map(
    (rows) => rows.map(TransactionModel.fromRow).toList(),
  );

  Stream<List<TransactionModel>> watchByAccount(String accountId) => _dao
      .watchByAccount(accountId)
      .map((rows) => rows.map(TransactionModel.fromRow).toList());

  Future<List<TransactionModel>> getAll() async =>
      (await _dao.getAll()).map(TransactionModel.fromRow).toList();

  Future<void> create(TransactionModel transaction) async {
    await _dao.insertOne(transaction.toCompanion());
    _trySyncInBackground(transaction);
  }

  Future<void> update(TransactionModel transaction) async {
    final bumped = transaction.copyWith(
      syncVersion: transaction.syncVersion + 1,
    );
    await _dao.updateOne(bumped.toCompanion());
    _trySyncInBackground(bumped);
  }

  Future<void> delete(String id) async {
    await _dao.softDeleteOne(id);
  }

  void _trySyncInBackground(TransactionModel transaction) {
    Future(() async {
      if (!await _syncGate.canSync()) return;
      try {
        await _api.push(transaction);
      } catch (_) {
        // silenciado de propósito — o dado já está salvo local
      }
    });
  }
}
