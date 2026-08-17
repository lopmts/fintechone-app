import 'package:fintechone/providers/auth_provider.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

/// Dispara `AuthProvider.bootstrap()` UMA vez, assim que este widget entra
/// na árvore — sem bloquear nada visualmente (login é opcional no app, então
/// não faz sentido mostrar splash/loading esperando a checagem).
///
/// Uso no main.dart:
/// ```dart
/// home: AuthBootstrapper(child: const MainTabScreen()),
/// ```
///
/// Isso resolve "fecho o app e ele desloga sozinho": sem ISSO (ou uma
/// chamada equivalente a `bootstrap()` em algum initState lá em cima),
/// AuthProvider.status nunca sai de `unknown` e o token salvo nunca é lido
/// de volta — mesmo que ele continue perfeitamente válido no storage.
class AuthBootstrapper extends StatefulWidget {
  final Widget child;
  const AuthBootstrapper({super.key, required this.child});

  @override
  State<AuthBootstrapper> createState() => _AuthBootstrapperState();
}

class _AuthBootstrapperState extends State<AuthBootstrapper> {
  @override
  void initState() {
    super.initState();
    // Direto no initState (sem addPostFrameCallback): Provider já está
    // disponível aqui porque AppProviders envolve o MaterialApp inteiro,
    // então não precisamos esperar o primeiro frame.
    context.read<AuthProvider>().bootstrap();
  }

  @override
  Widget build(BuildContext context) => widget.child;
}
