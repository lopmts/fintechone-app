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
    // O backend retorna { transactions: [...] }
    final transactions =
        list.isNotEmpty &&
            list.first is Map &&
            list.first.containsKey('transactions')
        ? (list.first as Map)['transactions'] as List
        : list;
    return transactions
        .map((e) => TransactionModel.fromJson(e as Map<String, dynamic>))
        .toList();
  }

  /// Cria uma nova transação no backend (POST)
  Future<void> create(TransactionModel transaction) async {
    final uri = Uri.parse('$baseUrl/transactions');
    final res = await http.post(
      uri,
      headers: await _headers(),
      body: jsonEncode(transaction.toJson()),
    );
    if (res.statusCode != 200 && res.statusCode != 201) {
      throw SyncFailure(
        'Falha ao criar transação ${transaction.id} no backend.',
      );
    }
  }

  /// Atualiza uma transação existente (PUT com ID na URL)
  Future<void> update(TransactionModel transaction) async {
    final uri = Uri.parse('$baseUrl/transactions/${transaction.id}');
    final res = await http.put(
      uri,
      headers: await _headers(),
      body: jsonEncode(transaction.toJson()),
    );
    if (res.statusCode != 200 && res.statusCode != 201) {
      throw SyncFailure(
        'Falha ao atualizar transação ${transaction.id} no backend.',
      );
    }
  }

  /// Método unificado que decide entre create ou update baseado na existência
  /// (usado pelo sync)
  Future<void> push(TransactionModel transaction) async {
    // Verifica se a transação já existe no backend
    final exists = await _exists(transaction.id);
    if (exists) {
      await update(transaction);
    } else {
      await create(transaction);
    }
  }

  Future<bool> _exists(String id) async {
    try {
      final uri = Uri.parse('$baseUrl/transactions/$id');
      final res = await http.get(uri, headers: await _headers());
      return res.statusCode == 200;
    } catch (_) {
      return false;
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
