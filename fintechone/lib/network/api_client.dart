import 'dart:async';
import 'dart:convert';
import 'dart:io';

import 'package:http/http.dart' as http;

import 'api_exception.dart';

/// Wrapper fino sobre `http` para centralizar:
/// - baseUrl
/// - headers padrão (incluindo Authorization quando houver token)
/// - timeout
/// - parsing de erro consistente com o backend (Fastify + zod)
///
/// Uso típico:
/// ```dart
/// final client = ApiClient(baseUrl: 'https://api.seuapp.com/api');
/// final json = await client.post('/auth/login', body: {...});
/// ```
class ApiClient {
  final String baseUrl;
  final Duration timeout;

  /// Token JWT atual. Setado pelo AuthRepository após login/verify.
  String? _authToken;

  ApiClient({
    required this.baseUrl,
    this.timeout = const Duration(seconds: 20),
  });

  void setAuthToken(String? token) {
    _authToken = token;
  }

  Map<String, String> get _headers => {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        if (_authToken != null) 'Authorization': 'Bearer $_authToken',
      };

  Uri _uri(String path) => Uri.parse('$baseUrl$path');

  Future<Map<String, dynamic>> get(String path) => _send(
        () => http.get(_uri(path), headers: _headers),
      );

  Future<Map<String, dynamic>> post(String path, {Object? body}) => _send(
        () => http.post(
          _uri(path),
          headers: _headers,
          body: body == null ? null : jsonEncode(body),
        ),
      );

  Future<Map<String, dynamic>> _send(
    Future<http.Response> Function() request,
  ) async {
    http.Response response;
    try {
      response = await request().timeout(timeout);
    } on TimeoutException {
      throw ApiException.timeout();
    } on SocketException {
      throw ApiException.network();
    } on HttpException catch (e) {
      throw ApiException.network(e.message);
    } catch (e) {
      throw ApiException.network(e.toString());
    }

    dynamic decoded;
    if (response.body.isNotEmpty) {
      try {
        decoded = jsonDecode(response.body);
      } catch (_) {
        decoded = null;
      }
    }

    if (response.statusCode >= 200 && response.statusCode < 300) {
      return decoded is Map<String, dynamic> ? decoded : <String, dynamic>{};
    }

    throw ApiException.fromResponseBody(decoded, statusCode: response.statusCode);
  }
}
