import 'package:fintechone/network/api_client.dart';
import 'package:fintechone/models/auth_result.dart';
import 'package:fintechone/models/auth_user.dart';

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
}
