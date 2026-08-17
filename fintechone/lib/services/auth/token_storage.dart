import 'package:flutter_secure_storage/flutter_secure_storage.dart';

/// Persiste o JWT com segurança (Keychain no iOS, EncryptedSharedPreferences
/// no Android). Nunca guardar token em SharedPreferences puro.
class TokenStorage {
  static const _tokenKey = 'fintechone_auth_token';

  final FlutterSecureStorage _storage;

  TokenStorage({FlutterSecureStorage? storage})
    : _storage =
          storage ??
          const FlutterSecureStorage(
            aOptions: AndroidOptions(
              migrateOnAlgorithmChange: true,

              resetOnError: true,
            ),
          );

  Future<void> saveToken(String token) =>
      _storage.write(key: _tokenKey, value: token);

  Future<String?> readToken() => _storage.read(key: _tokenKey);
  Future<bool> isLoggedIn() async => (await readToken()) != null;

  Future<void> clear() => _storage.delete(key: _tokenKey);
}
