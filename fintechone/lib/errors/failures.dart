//
// Erros de infraestrutura. Nunca lançados pra "quebrar" o app — em geral
// são engolidos silenciosamente na camada de sync (ver AccountService),
// porque uma falha de rede/auth não pode impedir o uso offline do app.

sealed class Failure {
  final String message;
  const Failure(this.message);

  @override
  String toString() => message;
}

class DatabaseFailure extends Failure {
  const DatabaseFailure([super.message = 'Erro ao acessar dados locais.']);
}

class NetworkFailure extends Failure {
  const NetworkFailure([super.message = 'Sem conexão com a internet.']);
}

class AuthFailure extends Failure {
  const AuthFailure([super.message = 'Usuário não autenticado.']);
}

class SyncFailure extends Failure {
  const SyncFailure([super.message = 'Falha ao sincronizar com o servidor.']);
}
