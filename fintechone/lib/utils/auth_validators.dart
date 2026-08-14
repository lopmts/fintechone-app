/// Regras de validação compartilhadas entre login e cadastro.
///
/// Mantê-las em um único lugar garante que a checklist visual da tela de
/// cadastro use exatamente os mesmos critérios da validação do formulário.
class AuthValidators {
  AuthValidators._();

  static final RegExp _emailRegExp = RegExp(
    r"^[\w.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$",
  );

  static String? email(String? value) {
    final email = value?.trim() ?? '';
    if (email.isEmpty) return 'Informe seu e-mail';
    if (!_emailRegExp.hasMatch(email)) return 'E-mail inválido';
    return null;
  }

  /// Validação simples de senha para o login (só exige preenchimento).
  static String? loginPassword(String? value) {
    if (value == null || value.isEmpty) return 'Informe sua senha';
    return null;
  }

  // Critérios individuais usados tanto na validação quanto na checklist.
  static bool hasMinLength(String value) => value.length >= 8;
  static bool hasUppercase(String value) => value.contains(RegExp(r'[A-Z]'));
  static bool hasNumber(String value) => value.contains(RegExp(r'[0-9]'));
  static bool hasSpecialChar(String value) =>
      value.contains(RegExp(r'[!@#$%^&*(),.?":{}|<>_\-]'));

  static bool isStrongPassword(String value) =>
      hasMinLength(value) &&
      hasUppercase(value) &&
      hasNumber(value) &&
      hasSpecialChar(value);

  /// Validação de senha forte para o cadastro.
  static String? signUpPassword(String? value) {
    final password = value ?? '';
    if (password.isEmpty) return 'Informe uma senha';
    if (!isStrongPassword(password)) return 'A senha não atende aos requisitos';
    return null;
  }

  static String? confirmPassword(String? value, String original) {
    if (value == null || value.isEmpty) return 'Confirme sua senha';
    if (value != original) return 'As senhas não coincidem';
    return null;
  }
}
