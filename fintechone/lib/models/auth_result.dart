import 'auth_user.dart';

/// Resultado de /register, /login, /verify e /set-password.
///
/// O backend tem dois formatos possíveis:
/// 1) Autenticado direto: `{ user, token }`
/// 2) Precisa de código: `{ user?, message, requiresVerification: true }`
class AuthResult {
  final AuthUser? user;
  final String? token;
  final bool requiresVerification;
  final String? message;

  const AuthResult({
    this.user,
    this.token,
    this.requiresVerification = false,
    this.message,
  });

  bool get isAuthenticated => token != null && user != null;

  factory AuthResult.fromJson(Map<String, dynamic> json) {
    final userJson = json['user'];
    return AuthResult(
      user: userJson is Map<String, dynamic> ? AuthUser.fromJson(userJson) : null,
      token: json['token'] as String?,
      requiresVerification: json['requiresVerification'] == true,
      message: json['message'] as String?,
    );
  }
}

class AuthMessage {
  final String message;
  const AuthMessage(this.message);

  factory AuthMessage.fromJson(Map<String, dynamic> json) =>
      AuthMessage(json['message'] as String? ?? 'Feito.');
}
