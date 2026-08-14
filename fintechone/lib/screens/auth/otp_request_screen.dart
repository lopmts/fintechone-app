import 'package:fintechone/providers/auth_provider.dart';
import 'package:fintechone/utils/auth_validators.dart';
import 'package:fintechone/widgets/auth_error_banner.dart';
import 'package:fintechone/widgets/auth_shared.dart';
import 'package:fintechone/widgets/auth_text_field.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import 'verify_code_screen.dart';

/// Aberta ao tocar em "Entrar com código (OTP)" na LoginScreen.
/// Chama POST /auth/login sem senha, que dispara o código por e-mail.
class OtpRequestScreen extends StatefulWidget {
  const OtpRequestScreen({super.key});

  @override
  State<OtpRequestScreen> createState() => _OtpRequestScreenState();
}

class _OtpRequestScreenState extends State<OtpRequestScreen> {
  final _formKey = GlobalKey<FormState>();
  final _emailController = TextEditingController();

  @override
  void dispose() {
    _emailController.dispose();
    super.dispose();
  }

  Future<void> _submit() async {
    if (!_formKey.currentState!.validate()) return;
    FocusScope.of(context).unfocus();

    final auth = context.read<AuthProvider>();
    final email = _emailController.text.trim();

    try {
      // password=null -> backend sempre envia o código, mesmo se a conta tiver senha.
      await auth.login(email: email);
      if (!mounted) return;
      Navigator.of(context).push(
        MaterialPageRoute(builder: (_) => VerifyCodeScreen(email: email)),
      );
    } catch (_) {
      // Erro exibido via auth.errorMessage.
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
                      'Entrar com código',
                      style: theme.textTheme.headlineMedium?.copyWith(fontWeight: FontWeight.w700),
                    ),
                    const SizedBox(height: 6),
                    Text(
                      'Informe seu e-mail e enviaremos um código de 6 dígitos',
                      style: theme.textTheme.bodyMedium?.copyWith(
                        color: colorScheme.onSurfaceVariant,
                      ),
                    ),
                    const SizedBox(height: 24),
                    if (auth.errorMessage != null) ...[
                      AuthErrorBanner(message: auth.errorMessage!),
                      const SizedBox(height: 16),
                    ],
                    AuthTextField(
                      controller: _emailController,
                      hintText: 'E-mail',
                      icon: Icons.mail_outline,
                      keyboardType: TextInputType.emailAddress,
                      textInputAction: TextInputAction.done,
                      autofillHints: const [AutofillHints.email],
                      validator: AuthValidators.email,
                    ),
                    const SizedBox(height: 24),
                    PrimaryButton(
                      label: 'Enviar código',
                      loading: auth.isLoading,
                      onPressed: _submit,
                    ),
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
