/// Exceção lançada por qualquer chamada à API.
///
/// Espelha o formato de erro do backend:
/// - Erros de validação (zod `safeParse` + `flatten()`):
///   `{ error: { formErrors: string[], fieldErrors: { [campo]: string[] } } }`
/// - Erros simples: `{ error: "mensagem" }`
class ApiException implements Exception {
  final int? statusCode;
  final String message;

  /// Erros de campo específico, ex: { "email": ["E-mail inválido"] }
  final Map<String, List<String>> fieldErrors;

  /// Erros gerais de formulário (não ligados a um campo específico)
  final List<String> formErrors;

  const ApiException({
    required this.message,
    this.statusCode,
    this.fieldErrors = const {},
    this.formErrors = const [],
  });

  /// Constrói a exceção a partir do corpo JSON retornado pelo Fastify.
  factory ApiException.fromResponseBody(
    dynamic body, {
    required int statusCode,
  }) {
    // Caso body não seja um Map (ex: HTML de erro, resposta vazia, etc.)
    if (body is! Map<String, dynamic>) {
      return ApiException(
        message: 'Erro inesperado do servidor (HTTP $statusCode)',
        statusCode: statusCode,
      );
    }

    final error = body['error'];

    // Erro de validação do zod: { error: { formErrors, fieldErrors } }
    if (error is Map<String, dynamic>) {
      final rawFieldErrors = error['fieldErrors'];
      final rawFormErrors = error['formErrors'];

      final fieldErrors = <String, List<String>>{};
      if (rawFieldErrors is Map<String, dynamic>) {
        rawFieldErrors.forEach((key, value) {
          if (value is List) {
            fieldErrors[key] = value.map((e) => e.toString()).toList();
          }
        });
      }

      final formErrors = <String>[
        if (rawFormErrors is List) ...rawFormErrors.map((e) => e.toString()),
      ];

      final firstMessage = formErrors.isNotEmpty
          ? formErrors.first
          : (fieldErrors.values.isNotEmpty
              ? fieldErrors.values.first.first
              : 'Dados inválidos');

      return ApiException(
        message: firstMessage,
        statusCode: statusCode,
        fieldErrors: fieldErrors,
        formErrors: formErrors,
      );
    }

    // Erro simples: { error: "mensagem" }
    if (error is String) {
      return ApiException(message: error, statusCode: statusCode);
    }

    return ApiException(
      message: 'Erro inesperado do servidor (HTTP $statusCode)',
      statusCode: statusCode,
    );
  }

  factory ApiException.network([String? detail]) => ApiException(
        message: detail ?? 'Falha de conexão. Verifique sua internet.',
      );

  factory ApiException.timeout() => const ApiException(
        message: 'O servidor demorou para responder. Tente novamente.',
      );

  bool get isUnauthorized => statusCode == 401;
  bool get isConflict => statusCode == 409;
  bool get isValidation => statusCode == 400;

  @override
  String toString() => 'ApiException($statusCode): $message';
}
