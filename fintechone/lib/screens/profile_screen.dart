import 'package:fintechone/providers/auth_provider.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

/// Tela básica de perfil do usuário.
/// - Exibe header com avatar: se houver imageUrl usa NetworkImage,
///   caso contrário mostra as iniciais (letras) do nome/email.
/// - Mostra nome, email e ações simples (logout).
class ProfileScreen extends StatelessWidget {
  const ProfileScreen({super.key});

  String _initials(String? name, String email) {
    if (name != null && name.trim().isNotEmpty) {
      final parts = name.trim().split(RegExp(r"\s+"));
      if (parts.length == 1) {
        return parts[0].substring(0, 1).toUpperCase();
      }
      return (parts[0].substring(0, 1) + parts.last.substring(0, 1)).toUpperCase();
    }
    // Fallback: use first letter of email local-part
    final local = email.split('@').first;
    return local.isNotEmpty ? local.substring(0, 1).toUpperCase() : '?';
  }

  @override
  Widget build(BuildContext context) {
    final auth = context.watch<AuthProvider>();
    final user = auth.user;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Perfil'),
        centerTitle: true,
      ),
      body: SafeArea(
        child: user == null
            ? Center(
                child: Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      const Icon(Icons.person_off, size: 72),
                      const SizedBox(height: 12),
                      const Text('Nenhum usuário autenticado.'),
                      const SizedBox(height: 8),
                      ElevatedButton(
                        onPressed: () => Navigator.of(context).pop(),
                        child: const Text('Voltar'),
                      ),
                    ],
                  ),
                ),
              )
            : ListView(
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 24),
                children: [
                  // Header
                  Row(
                    children: [
                      CircleAvatar(
                        radius: 44,
                        backgroundColor: Theme.of(context).colorScheme.primaryContainer,
                        backgroundImage: user.imageUrl != null ? NetworkImage(user.imageUrl!) : null,
                        child: user.imageUrl == null
                            ? Text(
                                _initials(user.name, user.email),
                                style: TextStyle(
                                  fontSize: 28,
                                  color: Theme.of(context).colorScheme.onPrimaryContainer,
                                  fontWeight: FontWeight.bold,
                                ),
                              )
                            : null,
                      ),
                      const SizedBox(width: 16),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              user.name ?? 'Sem nome',
                              style: Theme.of(context).textTheme.titleLarge?.copyWith(fontWeight: FontWeight.bold),
                            ),
                            const SizedBox(height: 4),
                            Text(
                              user.email,
                              style: Theme.of(context).textTheme.bodyMedium?.copyWith(color: Theme.of(context).colorScheme.onSurfaceVariant),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),

                  const SizedBox(height: 24),

                  // Informações adicionais (placeholder)
                  Card(
                    child: ListTile(
                      leading: const Icon(Icons.person),
                      title: const Text('Conta'),
                      subtitle: Text('ID: ${user.id}'),
                    ),
                  ),

                  const SizedBox(height: 8),

                  Card(
                    child: ListTile(
                      leading: const Icon(Icons.email_outlined),
                      title: const Text('Email'),
                      subtitle: Text(user.email),
                    ),
                  ),

                  const SizedBox(height: 24),

                  ElevatedButton.icon(
                    onPressed: () async {
                      await auth.logout();
                      if (context.mounted) Navigator.of(context).pop();
                    },
                    icon: const Icon(Icons.logout),
                    label: const Text('Sair'),
                    style: ElevatedButton.styleFrom(
                      padding: const EdgeInsets.symmetric(vertical: 12),
                    ),
                  ),
                ],
              ),
      ),
    );
  }
}
