import 'dart:async';
import 'dart:collection';

import 'package:fintechone/database/database.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'package:fintechone/network/account_api.dart';
import 'package:fintechone/network/transaction_api.dart';
import 'package:fintechone/database/daos/accounts_dao.dart';
import 'package:fintechone/database/daos/transactions_dao.dart';
import 'package:fintechone/models/account_model.dart';
import 'package:fintechone/models/transaction_model.dart';

class BackupFailure implements Exception {
  const BackupFailure(this.message);

  final String message;

  @override
  String toString() => message;
}

/// Serviço separado que faz um "backup" simples: envia contas primeiro
/// e depois transações para o backend. Usa filas separadas para evitar
/// condição de corrida. Emite progresso via callback e atualiza uma
/// notificação local com progresso.
class BackupService {
  BackupService({
    required this.accountsDao,
    required this.transactionsDao,
    required this.accountApi,
    required this.transactionApi,
    FlutterLocalNotificationsPlugin? notifications,
  }) : _notifications = notifications ?? FlutterLocalNotificationsPlugin();

  final AccountsDao accountsDao;
  final TransactionsDao transactionsDao;
  final AccountApi accountApi;
  final TransactionApi transactionApi;
  final FlutterLocalNotificationsPlugin _notifications;

  bool _cancelRequested = false;
  static const int _notifId = 7777;

  Future<void> _ensureNotificationsInitialized() async {
    const android = AndroidInitializationSettings('@mipmap/ic_launcher');
    const ios = DarwinInitializationSettings();
    await _notifications.initialize(
      settings: const InitializationSettings(android: android, iOS: ios),
    );
  }

  Future<void> _updateNotification({
    required String title,
    required String body,
    required int progress,
    required int maxProgress,
  }) async {
    await _notifications.show(
      id: _notifId,
      title: title,
      body: body,
      notificationDetails: NotificationDetails(
        android: AndroidNotificationDetails(
          'backup_channel',
          'Backup',
          channelDescription: 'Progresso de upload de backup',
          importance: Importance.low,
          onlyAlertOnce: true,
          showProgress: true,
          maxProgress: maxProgress > 0 ? maxProgress : 1,
          progress: progress,
        ),
        iOS: const DarwinNotificationDetails(
          presentSound: false,
          presentBadge: false,
          presentAlert: false,
        ),
      ),
    );
  }

  Future<void> backupAll({
    required void Function(double progress, String message) onProgress,
  }) async {
    _cancelRequested = false;

    await _ensureNotificationsInitialized();

    // Carrega dados locais
    final accounts = await accountsDao.getAll();
    final transactions = await transactionsDao.getAll();

    final total = accounts.length + transactions.length;
    int completed = 0;

    // Setup notificação inicial
    await _updateNotification(
      title: 'Backup: iniciando',
      body: 'Preparando envio dos dados',
      progress: 0,
      maxProgress: total > 0 ? total : 1,
    );

    // Filas separadas: contas primeiro
    final Queue<AccountRow> accountsQueue = Queue.of(accounts);
    final Queue<TransactionRow> transactionsQueue = Queue.of(transactions);

    // Process accounts queue
    while (accountsQueue.isNotEmpty) {
      if (_cancelRequested) break;
      final acc = accountsQueue.removeFirst();
      final model = AccountModel.fromRow(acc);

      try {
        // Tenta criar; se falhar (já existe), tenta atualizar.
        try {
          await accountApi.create(model);
        } catch (_) {
          try {
            await accountApi.update(model);
          } catch (error) {
            _cancelRequested = true;
            throw BackupFailure(
              'Falha ao enviar a conta ${model.id}. Backup cancelado.\nDetalhe: $error',
            );
          }
        }
      } catch (error) {
        if (error is BackupFailure) rethrow;
        _cancelRequested = true;
        throw BackupFailure(
          'Erro inesperado ao enviar a conta ${model.id}. Backup cancelado.\nDetalhe: $error',
        );
      }

      completed++;
      final progress = total > 0 ? completed / total : 1.0;
      final message = 'Enviando contas... $completed/$total';
      onProgress(progress, message);

      await _updateNotification(
        title: 'Backup em andamento',
        body: '${(progress * 100).toStringAsFixed(0)}% concluído',
        progress: completed,
        maxProgress: total > 0 ? total : 1,
      );
    }

    // Enviar transações
    if (!_cancelRequested) {
      while (transactionsQueue.isNotEmpty) {
        if (_cancelRequested) break;
        final tx = transactionsQueue.removeFirst();
        final model = TransactionModel.fromRow(tx);

        try {
          await transactionApi.push(model);
        } catch (error) {
          _cancelRequested = true;
          throw BackupFailure(
            'Falha ao enviar a transação ${model.id}. Backup cancelado.\nDetalhe: $error',
          );
        }

        completed++;
        final progress = total > 0 ? completed / total : 1.0;
        final message = 'Enviando transações... $completed/$total';
        onProgress(progress, message);

        await _updateNotification(
          title: 'Backup em andamento',
          body: '${(progress * 100).toStringAsFixed(0)}% concluído',
          progress: completed,
          maxProgress: total > 0 ? total : 1,
        );
      }
    }

    // Notificação final
    await _notifications.show(
      id: _notifId,
      title: _cancelRequested ? 'Backup cancelado' : 'Backup concluído',
      body: _cancelRequested
          ? 'Operação cancelada pelo usuário'
          : 'Todos os itens enviados',
      notificationDetails: NotificationDetails(
        android: AndroidNotificationDetails(
          'backup_channel',
          'Backup',
          channelDescription: 'Progresso de upload de backup',
          importance: Importance.defaultImportance,
          showProgress: false,
        ),
        iOS: const DarwinNotificationDetails(
          presentSound: true,
          presentBadge: false,
        ),
      ),
    );
  }

  void cancel() => _cancelRequested = true;
}
