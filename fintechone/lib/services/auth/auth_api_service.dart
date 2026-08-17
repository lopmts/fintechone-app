import 'package:fintechone/network/api_client.dart';
import 'package:fintechone/models/auth_result.dart';
import 'package:fintechone/models/auth_user.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

/// Espelha 1:1 as rotas registradas em `authRoutes` (`/api/auth/*`).
///
/// Nota sobre segurança do backend: o código de 6 dígitos é armazenado como
/// SHA-256 no banco (`hashCode`), mas isso é transparente para o app — o
/// client sempre envia o código em texto puro, exatamente como o usuário digita.
class AuthApiService {
  final ApiClient _client;

  AuthApiService(this._client);

  /// POST /auth/register
  Future<AuthResult> register({
    required String name,
    required String email,
    String? password,
  }) async {
    final json = await _client.post(
      '/auth/register',
      body: {
        'name': name,
        'email': email,
        if (password != null && password.isNotEmpty) 'password': password,
      },
    );
    return AuthResult.fromJson(json);
  }

  /// POST /auth/login
  /// Com [password] -> valida e retorna token.
  /// Sem [password] -> dispara código OTP por e-mail.
  Future<AuthResult> login({required String email, String? password}) async {
    final json = await _client.post(
      '/auth/login',
      body: {
        'email': email,
        if (password != null && password.isNotEmpty) 'password': password,
      },
    );
    return AuthResult.fromJson(json);
  }

  /// POST /auth/verify
  Future<AuthResult> verifyCode({
    required String email,
    required String code,
  }) async {
    final json = await _client.post(
      '/auth/verify',
      body: {'email': email, 'code': code},
    );
    return AuthResult.fromJson(json);
  }

  /// POST /auth/resend-code
  Future<AuthMessage> resendCode({required String email}) async {
    final json = await _client.post(
      '/auth/resend-code',
      body: {'email': email},
    );
    return AuthMessage.fromJson(json);
  }

  /// POST /auth/password-reset
  Future<AuthMessage> requestPasswordReset({required String email}) async {
    final json = await _client.post(
      '/auth/password-reset',
      body: {'email': email},
    );
    return AuthMessage.fromJson(json);
  }

  /// POST /auth/set-password
  Future<AuthResult> setPassword({
    required String email,
    required String code,
    required String newPassword,
  }) async {
    final json = await _client.post(
      '/auth/set-password',
      body: {'email': email, 'code': code, 'newPassword': newPassword},
    );
    return AuthResult.fromJson(json);
  }

  /// POST /auth/google
  Future<AuthResult> loginWithGoogle({required String idToken}) async {
    final json = await _client.post('/auth/google', body: {'idToken': idToken});
    return AuthResult.fromJson(json);
  }

  /// GET /auth/me — requer token já setado no ApiClient.
  Future<AuthUser> me() async {
    final json = await _client.get('/auth/me');
    return AuthUser.fromJson(json['user'] as Map<String, dynamic>);
  }

  /// GET /auth/me using a provided token string. This bypasses ApiClient's
  /// internal headers so boot-time auto-login can validate the saved token.
  Future<AuthUser> meWithToken(String token) async {
    final uri = Uri.parse('${_client.baseUrl}/auth/me');
    final res = await http.get(
      uri,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer $token',
      },
    );
    if (res.statusCode < 200 || res.statusCode >= 300) {
      throw Exception('Failed to fetch /auth/me');
    }
    final jsonBody = jsonDecode(res.body) as Map<String, dynamic>;
    return AuthUser.fromJson(jsonBody['user'] as Map<String, dynamic>);
  }
}
