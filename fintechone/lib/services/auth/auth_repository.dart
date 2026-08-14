import 'package:fintechone/network/api_client.dart';
import 'package:fintechone/models/auth_result.dart';
import 'package:fintechone/models/auth_user.dart';
import 'package:fintechone/services/auth/auth_api_service.dart';
import 'package:fintechone/services/auth/token_storage.dart';

/// Combina [AuthApiService] (HTTP) com [TokenStorage] (persistência local
/// do token — a MESMA fonte que AccountApi/TransactionApi usam via
/// `readToken: auth.readToken` no app_providers.dart).
///
/// Sempre que uma chamada retorna um token novo, ele é salvo pelo
/// [TokenStorage] E injetado no [ApiClient] para as próximas requisições
/// autenticadas feitas por este repository (ex: GET /auth/me).
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
  /// Retorna `null` (e limpa o storage) se o token estiver ausente/expirado.
  Future<AuthUser?> tryAutoLogin() async {
    final token = await _authService.readToken();
    if (token == null) return null;

    _client.setAuthToken(token);
    try {
      return await _api.me();
    } catch (_) {
      await logout();
      return null;
    }
  }

  Future<void> logout() async {
    await _authService.clear();
    _client.setAuthToken(null);
  }
}
