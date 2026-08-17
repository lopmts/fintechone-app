import 'package:flutter/material.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:provider/provider.dart';

import 'package:fintechone/providers/auth_provider.dart';
import 'package:fintechone/services/auth/google_auth_service.dart';
import 'package:fintechone/utils/auth_validators.dart';
import 'package:fintechone/widgets/auth_error_banner.dart';
import 'package:fintechone/widgets/auth_shared.dart';
import 'package:fintechone/widgets/auth_text_field.dart';

import 'verify_code_screen.dart';

/// Tela "Criar conta" — mesmo layout do mockup original, agora ligada ao
/// [AuthProvider] real (JWT via POST /auth/register).
///
/// Dois fluxos, na mesma tela: com senha (JWT direto na volta do POST) ou
/// só com código por e-mail (backend manda requiresVerification: true e a
/// gente empilha [VerifyCodeScreen]). Quem decide qual é o [_useEmailCode].
/// Usa o tema do app via [Theme.of].
class RegisterScreen extends StatefulWidget {
  const RegisterScreen({super.key});

  @override
  State<RegisterScreen> createState() => _RegisterScreenState();
}

class _RegisterScreenState extends State<RegisterScreen> {
  final _formKey = GlobalKey<FormState>();
  final _nameController = TextEditingController();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  final _confirmController = TextEditingController();

  String _password = '';
  bool _googleLoading = false;

  // Quando true, os campos de senha nem entram na árvore (não é só
  // "desativar validação" — eles somem de vez, porque não fazem sentido
  // nesse fluxo).
  bool _useEmailCode = false;

  @override
  void dispose() {
    _nameController.dispose();
    _emailController.dispose();
    _passwordController.dispose();
    _confirmController.dispose();
    super.dispose();
  }

  Future<void> _submit() async {
    FocusScope.of(context).unfocus();
    if (!_formKey.currentState!.validate()) return;

    final auth = context.read<AuthProvider>();
    final email = _emailController.text.trim();

    try {
      final authenticated = await auth.register(
        name: _nameController.text.trim(),
        email: email,
        // null aqui é o gatilho: o backend só entra no fluxo de código por
        // e-mail quando password vem ausente/vazio.
        password: _useEmailCode ? null : _passwordController.text,
      );
      if (!mounted) return;

      if (authenticated) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Conta criada com sucesso!')),
        );
        Navigator.of(context).pop();
      } else {
        // Backend pediu confirmação por código (fluxo sem senha).
        Navigator.of(context).pushReplacement(
          MaterialPageRoute(builder: (_) => VerifyCodeScreen(email: email)),
        );
      }
    } catch (_) {
      // Erro já populado em auth.errorMessage / fieldErrors — exibido abaixo.
    }
  }

  /// Mesmo fluxo da LoginScreen: cadastro e login com Google são a mesma
  /// chamada no backend (POST /auth/google cria a conta se ela não existir).
  Future<void> _signInWithGoogle() async {
    if (_googleLoading) return;
    final auth = context.read<AuthProvider>();
    auth.clearError();
    setState(() => _googleLoading = true);

    String? idToken;
    try {
      idToken = await GoogleAuthService.instance.signInAndGetIdToken();
    } on GoogleSignInException catch (e) {
      setState(() => _googleLoading = false);
      if (e.code == GoogleSignInExceptionCode.canceled) return;
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Não foi possível continuar com o Google (${e.code.name})')),
      );
      return;
    }

    if (idToken == null) {
      setState(() => _googleLoading = false);
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Não foi possível obter o token do Google')),
      );
      return;
    }

    try {
      await auth.loginWithGoogle(idToken: idToken);
      if (!mounted) return;
      if (auth.status == AuthStatus.authenticated) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Conta criada/conectada com Google!')),
        );
        Navigator.of(context).pop();
      }
    } catch (_) {
      // Erro do backend já populado em auth.errorMessage — exibido abaixo.
    } finally {
      if (mounted) setState(() => _googleLoading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;
    final auth = context.watch<AuthProvider>();

    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          tooltip: 'Voltar',
          onPressed: () => Navigator.of(context).maybePop(),
        ),
        backgroundColor: Colors.transparent,
        elevation: 0,
      ),
      body: SafeArea(
        top: false,
        child: Center(
          child: SingleChildScrollView(
            padding: const EdgeInsets.fromLTRB(24, 8, 24, 32),
            child: ConstrainedBox(
              constraints: const BoxConstraints(maxWidth: 460),
              child: Form(
                key: _formKey,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    Text(
                      'Criar conta',
                      style: theme.textTheme.headlineMedium?.copyWith(
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                    const SizedBox(height: 6),
                    Text(
                      'É rápido e fácil',
                      style: theme.textTheme.bodyMedium?.copyWith(
                        color: colorScheme.onSurfaceVariant,
                      ),
                    ),
                    const SizedBox(height: 20),
                    _RegistrationModeToggle(
                      useEmailCode: _useEmailCode,
                      onChanged: (value) =>
                          setState(() => _useEmailCode = value),
                    ),
                    if (_useEmailCode) ...[
                      const SizedBox(height: 12),
                      _EmailCodeHint(colorScheme: colorScheme, theme: theme),
                    ],
                    const SizedBox(height: 20),
                    if (auth.errorMessage != null) ...[
                      AuthErrorBanner(message: auth.errorMessage!),
                      const SizedBox(height: 16),
                    ],
                    AuthTextField(
                      controller: _nameController,
                      hintText: 'Nome',
                      icon: Icons.person_outline,
                      textInputAction: TextInputAction.next,
                      autofillHints: const [AutofillHints.name],
                      validator: (value) {
                        if (value == null || value.trim().length < 2) {
                          return 'Nome deve ter ao menos 2 caracteres';
                        }
                        return null;
                      },
                    ),
                    const SizedBox(height: 14),
                    AuthTextField(
                      controller: _emailController,
                      hintText: 'E-mail',
                      icon: Icons.mail_outline,
                      keyboardType: TextInputType.emailAddress,
                      textInputAction: _useEmailCode
                          ? TextInputAction.done
                          : TextInputAction.next,
                      autofillHints: const [AutofillHints.email],
                      validator: AuthValidators.email,
                    ),
                    // Só entra na árvore no fluxo com senha — no fluxo de
                    // código, o Form nem tenta validar esses campos.
                    if (!_useEmailCode) ...[
                      const SizedBox(height: 14),
                      AuthTextField(
                        controller: _passwordController,
                        hintText: 'Senha',
                        icon: Icons.lock_outline,
                        isPassword: true,
                        textInputAction: TextInputAction.next,
                        autofillHints: const [AutofillHints.newPassword],
                        validator: AuthValidators.signUpPassword,
                        onChanged: (value) => setState(() => _password = value),
                      ),
                      const SizedBox(height: 14),
                      AuthTextField(
                        controller: _confirmController,
                        hintText: 'Confirmar senha',
                        icon: Icons.lock_outline,
                        isPassword: true,
                        textInputAction: TextInputAction.done,
                        autofillHints: const [AutofillHints.newPassword],
                        validator: (value) => AuthValidators.confirmPassword(
                          value,
                          _passwordController.text,
                        ),
                      ),
                      const SizedBox(height: 16),
                      _PasswordChecklist(password: _password),
                    ],
                    const SizedBox(height: 24),
                    PrimaryButton(
                      label: _useEmailCode
                          ? 'Enviar código por e-mail'
                          : 'Criar conta',
                      loading: auth.isLoading,
                      onPressed: _submit,
                    ),
                    const SizedBox(height: 24),
                    const LabeledDivider(label: 'OU CONTINUE COM'),
                    const SizedBox(height: 20),
                    GoogleButton(onPressed: _signInWithGoogle),
                    const SizedBox(height: 24),
                    SwitchAuthText(
                      leadingText: 'Já tem uma conta? ',
                      actionText: 'Entrar',
                      onTap: () =>
                          Navigator.of(context).pushReplacementNamed('/login'),
                    ),
                    const SizedBox(height: 24),
                    const LegalFooter(),
                  ],
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}

/// Alterna entre os dois fluxos de cadastro. Não guarda estado próprio —
/// só repassa a escolha pro pai, mesmo padrão dos outros componentes de
/// formulário do app (value + onChanged).
class _RegistrationModeToggle extends StatelessWidget {
  const _RegistrationModeToggle({
    required this.useEmailCode,
    required this.onChanged,
  });

  final bool useEmailCode;
  final ValueChanged<bool> onChanged;

  @override
  Widget build(BuildContext context) {
    return SegmentedButton<bool>(
      segments: const [
        ButtonSegment(
          value: false,
          label: Text('Com senha'),
          icon: Icon(Icons.lock_outline),
        ),
        ButtonSegment(
          value: true,
          label: Text('Código por e-mail'),
          icon: Icon(Icons.mail_outline),
        ),
      ],
      selected: {useEmailCode},
      showSelectedIcon: false,
      onSelectionChanged: (selection) => onChanged(selection.first),
    );
  }
}

class _EmailCodeHint extends StatelessWidget {
  const _EmailCodeHint({required this.colorScheme, required this.theme});

  final ColorScheme colorScheme;
  final ThemeData theme;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: colorScheme.primaryContainer.withValues(alpha: 0.4),
        borderRadius: BorderRadius.circular(12),
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Icon(Icons.info_outline, size: 18, color: colorScheme.primary),
          const SizedBox(width: 10),
          Expanded(
            child: Text(
              'Vamos te enviar um código de 6 dígitos por e-mail pra '
              'confirmar a conta — sem precisar criar senha agora.',
              style: theme.textTheme.bodySmall?.copyWith(
                color: colorScheme.onSurfaceVariant,
              ),
            ),
          ),
        ],
      ),
    );
  }
}

/// Card com os requisitos da senha, marcando cada item conforme atendido.
class _PasswordChecklist extends StatelessWidget {
  const _PasswordChecklist({required this.password});

  final String password;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;

    final rules = <(String, bool)>[
      ('Mínimo de 8 caracteres', AuthValidators.hasMinLength(password)),
      ('Uma letra maiúscula', AuthValidators.hasUppercase(password)),
      ('Um número', AuthValidators.hasNumber(password)),
      ('Um caractere especial', AuthValidators.hasSpecialChar(password)),
    ];

    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: colorScheme.surfaceContainerHighest.withValues(alpha: 0.4),
        borderRadius: BorderRadius.circular(14),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(
                Icons.verified_user_outlined,
                size: 20,
                color: colorScheme.primary,
              ),
              const SizedBox(width: 10),
              Text(
                'Sua senha deve conter:',
                style: theme.textTheme.bodyMedium?.copyWith(
                  fontWeight: FontWeight.w600,
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),
          for (final rule in rules)
            Padding(
              padding: const EdgeInsets.only(left: 30, bottom: 8),
              child: _ChecklistItem(label: rule.$1, satisfied: rule.$2),
            ),
        ],
      ),
    );
  }
}

class _ChecklistItem extends StatelessWidget {
  const _ChecklistItem({required this.label, required this.satisfied});

  final String label;
  final bool satisfied;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;
    final color = satisfied
        ? colorScheme.primary
        : colorScheme.onSurfaceVariant;

    return Row(
      children: [
        Icon(
          satisfied ? Icons.check_circle : Icons.circle_outlined,
          size: 16,
          color: color,
        ),
        const SizedBox(width: 8),
        Expanded(
          child: Text(
            label,
            style: theme.textTheme.bodyMedium?.copyWith(color: color),
          ),
        ),
      ],
    );
  }
}
