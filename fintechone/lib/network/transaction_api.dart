import 'dart:convert';
import 'package:http/http.dart' as http;

import '../errors/failures.dart';
import '../models/transaction_model.dart';

class TransactionApi {
  TransactionApi({
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

  Future<List<TransactionModel>> fetchUpdatedSince(DateTime since) async {
    final uri = Uri.parse(
      '$baseUrl/transactions?updatedSince=${since.toIso8601String()}',
    );
    final res = await http.get(uri, headers: await _headers());
    if (res.statusCode != 200) {
      throw const SyncFailure('Falha ao buscar transações atualizadas.');
    }
    final list = jsonDecode(res.body) as List;
    return list
        .map((e) => TransactionModel.fromJson(e as Map<String, dynamic>))
        .toList();
  }

  Future<void> push(TransactionModel transaction) async {
    final uri = Uri.parse('$baseUrl/transactions/${transaction.id}');
    final res = await http.put(
      uri,
      headers: await _headers(),
      body: jsonEncode(transaction.toJson()),
    );
    if (res.statusCode != 200 && res.statusCode != 201) {
      throw SyncFailure('Falha ao enviar a transação ${transaction.id}.');
    }
  }

  Future<void> delete(String id) async {
    final uri = Uri.parse('$baseUrl/transactions/$id');
    final res = await http.delete(uri, headers: await _headers());
    if (res.statusCode != 200 && res.statusCode != 204) {
      throw SyncFailure('Falha ao remover a transação $id no backend.');
    }
  }
}
