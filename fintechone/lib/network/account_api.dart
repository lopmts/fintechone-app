// Única camada que sabe fazer HTTP. Controller/Service nunca montam request
// direto — sempre passam por uma classe *Api. Isso deixa óbvio, ao ler o
// código, tudo que o app manda/recebe do backend.
//
// IMPORTANTE: o backend não tem rota PUT — só POST (criar) e PATCH
// (atualizar). Por isso create() e update() são métodos separados aqui,
// em vez de um único "push" fazendo PUT pros dois casos.

import 'dart:convert';
import 'package:http/http.dart' as http;

import '../errors/failures.dart';
import '../models/account_model.dart';

class AccountApi {
  AccountApi({
    required this.baseUrl,
    required Future<String?> Function() getToken,
  }) : _getToken = getToken;

  final String baseUrl;
  final Future<String?> Function() _getToken;

  Future<Map<String, String>> _headers() async {
    final token = await _getToken();
    return {
      'Content-Type': 'application/json',
      if (token != null) 'Authorization': 'Bearer $token',
    };
  }

  /// Busca no backend tudo que mudou depois de [since] — usado pelo sync
  /// pra trazer alterações feitas em outro aparelho do mesmo usuário.
  Future<List<AccountModel>> fetchUpdatedSince(DateTime since) async {
    final uri = Uri.parse(
      '$baseUrl/accounts?updatedSince=${since.toIso8601String()}',
    );
    final res = await http.get(uri, headers: await _headers());
    if (res.statusCode != 200) {
      throw const SyncFailure('Falha ao buscar contas atualizadas.');
    }
    final list = jsonDecode(res.body) as List;
    return list
        .map((e) => AccountModel.fromJson(e as Map<String, dynamic>))
        .toList();
  }

  /// POST /accounts — cria uma conta nova no backend.
  ///
  /// Atenção: isso só funciona de verdade se o backend aceitar o `id` que
  /// vem no corpo (gerado localmente) em vez de mintar um novo com
  /// randomUUID(). Sem isso, client e servidor divergem sobre qual é o id
  /// da conta, e cada sync cria um registro duplicado em vez de reconhecer
  /// que já existe.
  Future<void> create(AccountModel account) async {
    final uri = Uri.parse('$baseUrl/accounts');
    final res = await http.post(
      uri,
      headers: await _headers(),
      body: jsonEncode(account.toApiJson()), // ← Aqui
    );
    if (res.statusCode != 200 && res.statusCode != 201) {
      throw SyncFailure('Falha ao criar a conta ${account.id} no backend.');
    }
  }

  /// PATCH /accounts/:id — atualiza uma conta que já existe no backend.
  Future<void> update(AccountModel account) async {
    final uri = Uri.parse('$baseUrl/accounts/${account.id}');
    final res = await http.patch(
      uri,
      headers: await _headers(),
      body: jsonEncode(account.toApiJson()), // ← Aqui
    );
    if (res.statusCode != 200) {
      throw SyncFailure('Falha ao atualizar a conta ${account.id} no backend.');
    }
  }

  Future<void> delete(String id) async {
    final uri = Uri.parse('$baseUrl/accounts/$id');
    final res = await http.delete(uri, headers: await _headers());
    if (res.statusCode != 200 && res.statusCode != 204) {
      throw SyncFailure('Falha ao remover a conta $id no backend.');
    }
  }
}
