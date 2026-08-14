//
// Única camada que sabe fazer HTTP. Controller/Service nunca montam request
// direto — sempre passam por uma classe *Api. Isso deixa óbvio, ao ler o
// código, tudo que o app manda/recebe do backend.

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

  /// Envia uma conta criada/editada localmente pro backend (upsert).
  Future<void> push(AccountModel account) async {
    final uri = Uri.parse('$baseUrl/accounts/${account.id}');
    final res = await http.put(
      uri,
      headers: await _headers(),
      body: jsonEncode(account.toJson()),
    );
    if (res.statusCode != 200 && res.statusCode != 201) {
      throw SyncFailure('Falha ao enviar a conta ${account.id}.');
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
