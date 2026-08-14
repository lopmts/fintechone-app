import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import 'package:fintechone/providers/auth_provider.dart';
import 'package:fintechone/utils/auth_validators.dart';
import 'package:fintechone/widgets/auth_error_banner.dart';
import 'package:fintechone/widgets/auth_shared.dart';
import 'package:fintechone/widgets/auth_text_field.dart';

import 'verify_code_screen.dart';

/// Tela "Criar conta" — mesmo layout do mockup original, agora ligada ao
/// [AuthProvider] real (JWT via POST /auth/register).
///
/// Traz validação de e-mail, senha forte (com checklist de requisitos em
/// tempo real) e confirmação de senha. Usa o tema do app via [Theme.of].
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
        password: _passwordController.text,
      );
      if (!mounted) return;

      if (authenticated) {
        ScaffoldMessenger.of(
          context,
        ).showSnackBar(const SnackBar(content: Text('Conta criada com sucesso!')));
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

  Future<void> _signInWithGoogle() async {
    // Ver observação em login_screen.dart — requer google_sign_in configurado.
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Configure o google_sign_in para habilitar este botão.')),
    );
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
                      textInputAction: TextInputAction.next,
                      autofillHints: const [AutofillHints.email],
                      validator: AuthValidators.email,
                    ),
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
                    const SizedBox(height: 24),
                    PrimaryButton(
                      label: 'Criar conta',
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
                      onTap: () => Navigator.of(context).maybePop(),
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
