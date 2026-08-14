import 'package:fintechone/network/api_exception.dart';
import 'package:fintechone/models/auth_user.dart';
import 'package:fintechone/services/auth/auth_repository.dart';
import 'package:flutter/foundation.dart';

enum AuthStatus {
  /// Boot do app: ainda não sabemos se há sessão salva.
  unknown,
  authenticating,
  authenticated,
  unauthenticated,
}

/// Estado central de autenticação (JWT + usuário atual), consumido pelas
/// telas via `context.watch<AuthProvider>()` / `context.read<AuthProvider>()`.
///
/// Fluxo de código por e-mail (register/login sem senha, e reset de senha):
/// 1. `register` / `login` / `requestPasswordReset` retornam sinal de que o
///    código foi enviado.
/// 2. A tela navega para a verificação, usando [pendingVerificationEmail].
/// 3. `verifyCode` (ou `setPassword`) autentica de fato.
class AuthProvider extends ChangeNotifier {
  final AuthRepository _repository;

  AuthProvider(this._repository);

  AuthStatus _status = AuthStatus.unknown;
  AuthUser? _user;
  String? _errorMessage;
  Map<String, List<String>> _fieldErrors = const {};

  String? pendingVerificationEmail;

  AuthStatus get status => _status;
  AuthUser? get user => _user;
  String? get errorMessage => _errorMessage;
  Map<String, List<String>> get fieldErrors => _fieldErrors;
  bool get isLoading => _status == AuthStatus.authenticating;
  bool get isAuthenticated => _status == AuthStatus.authenticated;

  void _setLoading() {
    _status = AuthStatus.authenticating;
    _errorMessage = null;
    _fieldErrors = const {};
    notifyListeners();
  }

  void _setError(Object error) {
    if (error is ApiException) {
      _errorMessage = error.message;
      _fieldErrors = error.fieldErrors;
    } else {
      _errorMessage = 'Algo deu errado. Tente novamente.';
      _fieldErrors = const {};
    }
    _status = AuthStatus.unauthenticated;
    notifyListeners();
  }

  void clearError() {
    _errorMessage = null;
    _fieldErrors = const {};
    notifyListeners();
  }

  /// Chame no boot do app (splash / AuthGate) para restaurar sessão salva.
  Future<void> bootstrap() async {
    try {
      final user = await _repository.tryAutoLogin();
      _user = user;
      _status = user != null
          ? AuthStatus.authenticated
          : AuthStatus.unauthenticated;
    } catch (_) {
      _status = AuthStatus.unauthenticated;
    }
    notifyListeners();
  }

  /// Retorna `true` se autenticou direto, `false` se precisa verificar código.
  Future<bool> register({
    required String name,
    required String email,
    String? password,
  }) async {
    _setLoading();
    try {
      final result = await _repository.register(
        name: name,
        email: email,
        password: password,
      );
      if (result.isAuthenticated) {
        _user = result.user;
        _status = AuthStatus.authenticated;
        notifyListeners();
        return true;
      }
      pendingVerificationEmail = email;
      _status = AuthStatus.unauthenticated;
      notifyListeners();
      return false;
    } catch (e) {
      _setError(e);
      rethrow;
    }
  }

  /// Retorna `true` se autenticou direto (login com senha), `false` se um
  /// código OTP foi enviado por e-mail (login sem senha).
  Future<bool> login({required String email, String? password}) async {
    _setLoading();
    try {
      final result = await _repository.login(email: email, password: password);
      if (result.isAuthenticated) {
        _user = result.user;
        _status = AuthStatus.authenticated;
        notifyListeners();
        return true;
      }
      pendingVerificationEmail = email;
      _status = AuthStatus.unauthenticated;
      notifyListeners();
      return false;
    } catch (e) {
      _setError(e);
      rethrow;
    }
  }

  Future<void> verifyCode({required String email, required String code}) async {
    _setLoading();
    try {
      final result = await _repository.verifyCode(email: email, code: code);
      _user = result.user;
      _status = AuthStatus.authenticated;
      pendingVerificationEmail = null;
      notifyListeners();
    } catch (e) {
      _setError(e);
      rethrow;
    }
  }

  Future<String> resendCode({required String email}) async {
    try {
      return (await _repository.resendCode(email: email)).message;
    } catch (e) {
      _setError(e);
      rethrow;
    }
  }

  Future<String> requestPasswordReset({required String email}) async {
    try {
      final result = await _repository.requestPasswordReset(email: email);
      pendingVerificationEmail = email;
      return result.message;
    } catch (e) {
      _setError(e);
      rethrow;
    }
  }

  Future<void> setPassword({
    required String email,
    required String code,
    required String newPassword,
  }) async {
    _setLoading();
    try {
      final result = await _repository.setPassword(
        email: email,
        code: code,
        newPassword: newPassword,
      );
      _user = result.user;
      _status = AuthStatus.authenticated;
      pendingVerificationEmail = null;
      notifyListeners();
    } catch (e) {
      _setError(e);
      rethrow;
    }
  }

  Future<void> loginWithGoogle({required String idToken}) async {
    _setLoading();
    try {
      final result = await _repository.loginWithGoogle(idToken: idToken);
      _user = result.user;
      _status = AuthStatus.authenticated;
      notifyListeners();
    } catch (e) {
      _setError(e);
      rethrow;
    }
  }

  Future<void> logout() async {
    await _repository.logout();
    _user = null;
    pendingVerificationEmail = null;
    _status = AuthStatus.unauthenticated;
    notifyListeners();
  }
}
