import 'dart:convert';
import 'package:http/http.dart' as http;

import '../errors/failures.dart';
import '../models/category_model.dart';

class CategoryApi {
  CategoryApi({
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

  Future<void> upsert(CategoryModel category) async {
    final uri = Uri.parse('$baseUrl/categories/${category.id}');
    final res = await http.put(
      uri,
      headers: await _headers(),
      body: jsonEncode(category.toApiJson()),
    );
    if (res.statusCode != 200 && res.statusCode != 201) {
      throw SyncFailure(
        'Falha ao enviar a categoria ${category.id} no backend (status ${res.statusCode}): ${res.body}',
      );
    }
  }

  Future<void> create(CategoryModel category) async {
    final uri = Uri.parse('$baseUrl/categories');
    final res = await http.post(
      uri,
      headers: await _headers(),
      body: jsonEncode(category.toApiJson()),
    );
    if (res.statusCode != 200 && res.statusCode != 201) {
      throw SyncFailure(
        'Falha ao criar a categoria ${category.id} no backend.',
      );
    }
  }

  Future<void> update(CategoryModel category) async {
    final uri = Uri.parse('$baseUrl/categories/${category.id}');
    final res = await http.patch(
      uri,
      headers: await _headers(),
      body: jsonEncode(category.toApiJson()),
    );
    if (res.statusCode != 200) {
      throw SyncFailure(
        'Falha ao atualizar a categoria ${category.id} no backend.',
      );
    }
  }

  Future<void> push(CategoryModel category) async {
    final exists = await _exists(category.id);
    if (exists) {
      await update(category);
    } else {
      await create(category);
    }
  }

  Future<bool> _exists(String id) async {
    try {
      final uri = Uri.parse('$baseUrl/categories/$id');
      final res = await http.get(uri, headers: await _headers());
      return res.statusCode == 200;
    } catch (_) {
      return false;
    }
  }

  Future<void> delete(String id) async {
    final uri = Uri.parse('$baseUrl/categories/$id');
    final res = await http.delete(uri, headers: await _headers());
    if (res.statusCode != 200 && res.statusCode != 204) {
      throw SyncFailure('Falha ao remover a categoria $id no backend.');
    }
  }
}
