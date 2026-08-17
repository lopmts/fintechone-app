import 'dart:convert';

import 'package:fintechone/network/api_client.dart';
import 'package:fintechone/network/api_exception.dart';
import 'package:fintechone/models/auth_result.dart';
import 'package:fintechone/models/auth_user.dart';
import 'package:fintechone/services/auth/auth_api_service.dart';
import 'package:fintechone/services/auth/token_storage.dart';

/// Combina [AuthApiService] (HTTP) com [TokenStorage] (persistência local
/// do token — a MESMA fonte que AccountApi/TransactionApi usam via
/// `getToken: auth.readToken` no app_providers.dart).
class AuthRepository {
  final ApiClient _client;
  final AuthApiService _api;
  final TokenStorage _authService;

  AuthRepository({
    required ApiClient client,
    required TokenStorage authService,
    AuthApiService? apiService,
  }) : _client = client,
       _authService = authService,
       _api = apiService ?? AuthApiService(client);

  Future<void> _persistSession(AuthResult result) async {
    if (result.token != null) {
      await _authService.saveToken(result.token!);
      _client.setAuthToken(result.token);
    }
  }

  Future<AuthResult> register({
    required String name,
    required String email,
    String? password,
  }) async {
    final result = await _api.register(
      name: name,
      email: email,
      password: password,
    );
    await _persistSession(result);
    return result;
  }

  Future<AuthResult> login({required String email, String? password}) async {
    final result = await _api.login(email: email, password: password);
    await _persistSession(result);
    return result;
  }

  Future<AuthResult> verifyCode({
    required String email,
    required String code,
  }) async {
    final result = await _api.verifyCode(email: email, code: code);
    await _persistSession(result);
    return result;
  }

  Future<AuthMessage> resendCode({required String email}) =>
      _api.resendCode(email: email);

  Future<AuthMessage> requestPasswordReset({required String email}) =>
      _api.requestPasswordReset(email: email);

  Future<AuthResult> setPassword({
    required String email,
    required String code,
    required String newPassword,
  }) async {
    final result = await _api.setPassword(
      email: email,
      code: code,
      newPassword: newPassword,
    );
    await _persistSession(result);
    return result;
  }

  Future<AuthResult> loginWithGoogle({required String idToken}) async {
    final result = await _api.loginWithGoogle(idToken: idToken);
    await _persistSession(result);
    return result;
  }

  /// Tenta restaurar a sessão salva no boot do app.
  ///
  /// Regra importante (o app é local-first): só limpa o token quando o
  /// backend CONFIRMA que ele é inválido de verdade (401). Qualquer outro
  /// problema — sem internet, timeout, servidor fora do ar, IP de LAN
  /// inalcançável fora de casa — NÃO desloga o usuário. Nesse caso,
  /// decodificamos os claims do próprio JWT (sub/email) pra devolver um
  /// usuário "otimista", sem precisar do backend responder.
  ///
  /// Retorna `null` só quando: não há token salvo, OU o token é
  /// comprovadamente inválido (401).
  Future<AuthUser?> tryAutoLogin() async {
    final token = await _authService.readToken();
    if (token == null) return null;

    _client.setAuthToken(token);
    try {
      return await _api.me();
    } on ApiException catch (e) {
      if (e.isUnauthorized) {
        await logout();
        return null;
      }
      // Backend respondeu, mas não com 401 (500, 503, etc.) — mantém sessão.
      return _decodeUserFromToken(token);
    } catch (_) {
      // Sem rede / timeout / host inalcançável — idem, mantém sessão.
      return _decodeUserFromToken(token);
    }
  }

  Future<void> logout() async {
    await _authService.clear();
    _client.setAuthToken(null);
  }

  /// Lê `sub` (id) e `email` do payload do JWT SEM validar assinatura —
  /// só pra ter algo pra mostrar offline. A validação de verdade é sempre
  /// feita pelo backend (`app.authenticate` / `GET /me`) quando há rede.
  AuthUser? _decodeUserFromToken(String token) {
    try {
      final parts = token.split('.');
      if (parts.length != 3) return null;

      final payload =
          jsonDecode(_base64UrlDecode(parts[1])) as Map<String, dynamic>;
      final id = payload['sub'] as String?;
      final email = payload['email'] as String?;
      if (id == null || email == null) return null;

      return AuthUser(id: id, email: email);
    } catch (_) {
      return null;
    }
  }

  String _base64UrlDecode(String input) {
    var output = input.replaceAll('-', '+').replaceAll('_', '/');
    switch (output.length % 4) {
      case 2:
        output += '==';
        break;
      case 3:
        output += '=';
        break;
    }
    return utf8.decode(base64Url.decode(output));
  }
}
