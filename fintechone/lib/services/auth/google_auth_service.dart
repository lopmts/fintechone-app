import 'package:flutter/foundation.dart';
import 'package:google_sign_in/google_sign_in.dart';

/// Serviço único do Google Sign-In (google_sign_in v7+, API `.instance`).
///
/// Centraliza a inicialização e a extração do `idToken` pra não duplicar
/// essa lógica em LoginScreen e RegisterScreen — os dois só chamam
/// [signInAndGetIdToken] e mandam o resultado pro [AuthProvider.loginWithGoogle].
///
/// IMPORTANTE sobre o `serverClientId`:
/// É ele — o Web Client ID do Google Cloud Console — que aparece como
/// `audience` dentro do idToken, em QUALQUER plataforma (Android, iOS, Web).
/// O Android Client ID e o iOS Client ID só existem pra casar,
/// respectivamente, o SHA-1 do seu keystore e o Bundle ID do app — eles
/// nunca aparecem dentro do token.
class GoogleAuthService {
  GoogleAuthService._();
  static final GoogleAuthService instance = GoogleAuthService._();

  // TODO: troque pelo Web Client ID do seu projeto no Google Cloud Console
  // (Credentials -> OAuth 2.0 Client IDs -> tipo "Web application").
  // É o MESMO valor que vai em GOOGLE_WEB_CLIENT_ID no .env do backend.
  static const _serverClientId =
      '312105624686-oh8vsmjbl31bfbhkouvf4psek7abbh7a.apps.googleusercontent.com';

  bool _initialized = false;

  /// Idempotente — pode chamar quantas vezes quiser (ex: uma vez no boot
  /// do app e de novo, por garantia, antes do primeiro toque no botão).
  Future<void> initialize() async {
    if (_initialized) return;

    if (_serverClientId.startsWith('SEU_')) {
      // Falha ALTO E CLARO em vez de deixar o Google devolver um erro
      // nativo genérico (tipo "ApiException: 10" / DEVELOPER_ERROR) que
      // some sem UI nenhuma. Se você está lendo essa mensagem, é isso.
      throw StateError(
        'GoogleAuthService: troque _serverClientId pelo Web Client ID real '
        '(Google Cloud Console -> Credentials -> OAuth 2.0 Client IDs -> '
        'Web application) antes de usar o login com Google.',
      );
    }

    await GoogleSignIn.instance.initialize(serverClientId: _serverClientId);
    _initialized = true;
  }

  /// Abre o seletor de conta do Google e devolve o `idToken` pronto pra
  /// mandar em `POST /auth/google`.
  ///
  /// Retorna `null` só se o Google devolver a conta sem idToken (raro,
  /// geralmente config errada de serverClientId). Cancelamento do usuário
  /// joga [GoogleSignInException] com `code == GoogleSignInExceptionCode.canceled`.
  Future<String?> signInAndGetIdToken() async {
    await initialize();
    final account = await GoogleSignIn.instance.authenticate();
    final idToken = account.authentication.idToken;

    if (kDebugMode) {
      debugPrint(
        'GoogleAuthService: conta selecionada = ${account.email}, '
        'idToken ${idToken == null ? "VEIO NULO" : "ok (${idToken.length} chars)"}',
      );
    }

    return idToken;
  }

  /// Chame no logout do app pra não deixar o Google "lembrando" a conta e
  /// pulando o seletor na próxima vez que o usuário quiser trocar de conta.
  /// Seguro chamar mesmo se o usuário nunca usou login com Google.
  Future<void> signOut() async {
    try {
      await GoogleSignIn.instance.signOut();
    } catch (_) {
      // Sem sessão Google ativa — não é um erro que precise propagar.
    }
  }
}
