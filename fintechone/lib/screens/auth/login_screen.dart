import 'package:fintechone/providers/auth_provider.dart';
import 'package:fintechone/screens/auth/forgot_password_screen.dart';
import 'package:fintechone/screens/auth/otp_request_screen.dart';
import 'package:fintechone/screens/auth/verify_code_screen.dart';
import 'package:fintechone/utils/auth_validators.dart';
import 'package:fintechone/widgets/auth_error_banner.dart';
import 'package:fintechone/widgets/auth_shared.dart';
import 'package:fintechone/widgets/auth_text_field.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import 'register_screen.dart';

/// Tela "Entrar" — mesmo layout do mockup original, agora ligada ao
/// [AuthProvider] real (JWT via POST /auth/login).
///
/// Usa o tema do app (Material 3) via [Theme.of], então acompanha
/// automaticamente os modos claro/escuro/AMOLED e o seed color definidos
/// no ThemeProvider.
class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _formKey = GlobalKey<FormState>();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  Future<void> _submit() async {
    FocusScope.of(context).unfocus();
    if (!_formKey.currentState!.validate()) return;

    final auth = context.read<AuthProvider>();
    final email = _emailController.text.trim();

    try {
      final authenticated = await auth.login(
        email: email,
        password: _passwordController.text,
      );
      if (!mounted) return;

      if (authenticated) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Login realizado com sucesso!')),
        );
        // A navegação para a Home é feita automaticamente por quem observa
        // AuthProvider.status (ex: AuthGate na raiz do MaterialApp).
      } else {
        // Conta existe mas o backend pediu confirmação por código
        // (ex: conta sem senha). Segue para a verificação.
        Navigator.of(context).push(
          MaterialPageRoute(builder: (_) => VerifyCodeScreen(email: email)),
        );
      }
    } catch (_) {
      // Erro já populado em auth.errorMessage / fieldErrors — exibido abaixo.
    }
  }

  void _goToRegister() {
    Navigator.of(
      context,
    ).push(MaterialPageRoute(builder: (_) => const RegisterScreen()));
  }

  void _goToOtpLogin() {
    context.read<AuthProvider>().clearError();
    Navigator.of(
      context,
    ).push(MaterialPageRoute(builder: (_) => const OtpRequestScreen()));
  }

  void _goToForgotPassword() {
    context.read<AuthProvider>().clearError();
    Navigator.of(
      context,
    ).push(MaterialPageRoute(builder: (_) => const ForgotPasswordScreen()));
  }

  Future<void> _signInWithGoogle() async {
    // Integração real requer o pacote `google_sign_in` configurado com o
    // Client ID do Google Cloud (Android/iOS/Web). Exemplo:
    //
    // final googleUser = await GoogleSignIn().signIn();
    // final googleAuth = await googleUser?.authentication;
    // final idToken = googleAuth?.idToken;
    // if (idToken == null) return;
    // await context.read<AuthProvider>().loginWithGoogle(idToken: idToken);
    //
    // Deixado como TODO pois depende de configuração externa (Client IDs)
    // que não faz parte da lógica de auth em si.
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('Configure o google_sign_in para habilitar este botão.'),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;
    final auth = context.watch<AuthProvider>();

    return Scaffold(
      body: SafeArea(
        child: Center(
          child: SingleChildScrollView(
            padding: const EdgeInsets.fromLTRB(24, 24, 24, 32),
            child: ConstrainedBox(
              constraints: const BoxConstraints(maxWidth: 460),
              child: Form(
                key: _formKey,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    const BrandHeader(),
                    const SizedBox(height: 36),
                    Text(
                      'Entrar',
                      style: theme.textTheme.headlineMedium?.copyWith(
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                    const SizedBox(height: 6),
                    Text(
                      'Escolha como deseja acessar sua conta',
                      style: theme.textTheme.bodyMedium?.copyWith(
                        color: colorScheme.onSurfaceVariant,
                      ),
                    ),
                    const SizedBox(height: 20),
                    if (auth.errorMessage != null) ...[
                      AuthErrorBanner(message: auth.errorMessage!),
                      const SizedBox(height: 16),
                    ],
                    _OtpTile(onTap: _goToOtpLogin),
                    const SizedBox(height: 20),
                    const LabeledDivider(label: 'OU'),
                    const SizedBox(height: 20),
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
                      textInputAction: TextInputAction.done,
                      autofillHints: const [AutofillHints.password],
                      validator: AuthValidators.loginPassword,
                    ),
                    const SizedBox(height: 12),
                    Align(
                      alignment: Alignment.centerLeft,
                      child: TextButton(
                        onPressed: _goToForgotPassword,
                        style: TextButton.styleFrom(
                          padding: EdgeInsets.zero,
                          minimumSize: const Size(0, 0),
                          tapTargetSize: MaterialTapTargetSize.shrinkWrap,
                        ),
                        child: const Text('Esqueci minha senha'),
                      ),
                    ),
                    const SizedBox(height: 16),
                    PrimaryButton(
                      label: 'Entrar',
                      loading: auth.isLoading,
                      onPressed: _submit,
                    ),
                    const SizedBox(height: 24),
                    const LabeledDivider(label: 'OU CONTINUE COM'),
                    const SizedBox(height: 20),
                    GoogleButton(onPressed: _signInWithGoogle),
                    const SizedBox(height: 24),
                    SwitchAuthText(
                      leadingText: 'Não tem uma conta? ',
                      actionText: 'Criar conta',
                      onTap: _goToRegister,
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

/// Card de destaque "Entrar com código (OTP)".
class _OtpTile extends StatelessWidget {
  const _OtpTile({required this.onTap});

  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;

    return Material(
      color: colorScheme.surfaceContainerHighest.withValues(alpha: 0.4),
      borderRadius: BorderRadius.circular(14),
      child: InkWell(
        borderRadius: BorderRadius.circular(14),
        onTap: onTap,
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Row(
            children: [
              Icon(Icons.mail_outline, size: 22, color: colorScheme.onSurface),
              const SizedBox(width: 14),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Entrar com código (OTP)',
                      style: theme.textTheme.bodyLarge?.copyWith(
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                    const SizedBox(height: 2),
                    Text(
                      'Enviaremos um código para seu e-mail',
                      style: theme.textTheme.bodySmall?.copyWith(
                        color: colorScheme.onSurfaceVariant,
                      ),
                    ),
                  ],
                ),
              ),
              Icon(Icons.chevron_right, color: colorScheme.onSurfaceVariant),
            ],
          ),
        ),
      ),
    );
  }
}
