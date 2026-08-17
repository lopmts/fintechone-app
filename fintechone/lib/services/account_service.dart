// Ponto ÚNICO de acesso a contas pro resto do app. Controller/screens nunca
// falam direto com AccountsDao (banco) nem com AccountApi (backend) —
// sempre passam por aqui. Isso é o que torna o backend "opcional": se
// amanhã você tirar toda a parte de rede, esse service continua
// funcionando 100% (só o método de sync vira um no-op).
//
// Regra de ouro: toda escrita é local e IMEDIATA — o app nunca espera
// resposta de rede pra salvar algo. Sync roda depois, em background,
// só se o SyncGateService liberar.

import 'package:flutter/foundation.dart' show debugPrint;

import '../database/daos/accounts_dao.dart';
import '../models/account_model.dart';
import '../network/account_api.dart';
import 'sync_gate_service.dart';

class AccountService {
  AccountService({
    required AccountsDao dao,
    required AccountApi api,
    required SyncGateService syncGate,
  }) : _dao = dao,
       _api = api,
       _syncGate = syncGate;

  final AccountsDao _dao;
  final AccountApi _api;
  final SyncGateService _syncGate;

  // ── Leitura (sempre do banco local — nunca da rede) ──
  Stream<List<AccountModel>> watchAll() =>
      _dao.watchAll().map((rows) => rows.map(AccountModel.fromRow).toList());

  Future<List<AccountModel>> getAll() async =>
      (await _dao.getAll()).map(AccountModel.fromRow).toList();

  // ── Escrita (local primeiro, sync depois em background) ──
  Future<void> create(AccountModel account) async {
    await _dao.insertOne(account.toCompanion());
    // POST — é um registro que ainda não existe no backend.
    _trySyncInBackground(() => _api.create(account));
  }

  Future<void> update(AccountModel account) async {
    final bumped = account.copyWith(syncVersion: account.syncVersion + 1);
    await _dao.updateOne(bumped.toCompanion());
    // PATCH — o registro já deveria existir no backend (foi criado antes).
    _trySyncInBackground(() => _api.update(bumped));
  }

  Future<void> delete(String id) async {
    await _dao.softDeleteOne(id);
    // A remoção no backend acontece na próxima rodada de sync completa
    // (varrendo registros com deletedAt != null e syncVersion não enviado),
    // não precisa ser síncrona aqui.
  }

  /// Dispara [action] pro backend sem travar a UI. Qualquer erro (sem
  /// internet, token expirado, servidor fora, rota errada) é engolido de
  /// propósito: o dado já está salvo local, então uma falha de sync NUNCA
  /// pode virar erro pro usuário — fica pendente pra próxima tentativa.
  ///
  /// O debugPrint é só pra você conseguir VER que algo falhou durante o
  /// desenvolvimento — sem ele, um erro de rota (como o PUT que não
  /// existia) fica invisível pra sempre, é exatamente o que te confundiu.
  void _trySyncInBackground(Future<void> Function() action) {
    Future(() async {
      if (!await _syncGate.canSync()) return;
      try {
        await action();
      } catch (e) {
        debugPrint('[AccountService] sync falhou: $e');
      }
    });
  }
}
