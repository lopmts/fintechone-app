import 'package:fintechone/providers/auth_provider.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:fintechone/screens/profile_user.dart';
import 'package:fintechone/screens/auth/register_screen.dart';

class HomeHeader extends StatelessWidget {
  const HomeHeader({
    super.key,
    this.appName = 'FintechOne',
    this.avatarUrl,
    this.hasUnreadNotifications = false,
    this.onMenuTap,
    this.onNotificationsTap,
    this.onProfileTap,
  });

  final String appName;
  final String? avatarUrl;
  final bool hasUnreadNotifications;
  final VoidCallback? onMenuTap;
  final VoidCallback? onNotificationsTap;
  final VoidCallback? onProfileTap;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;

    return Row(
      children: [
        IconButton(onPressed: onMenuTap, icon: const Icon(Icons.menu)),
        Icon(Icons.bar_chart_rounded, color: colorScheme.primary),
        const SizedBox(width: 6),
        Text(
          appName,
          style: theme.textTheme.titleLarge?.copyWith(
            fontWeight: FontWeight.bold,
          ),
        ),
        const Spacer(),
        IconButton(
          onPressed: onNotificationsTap,
          icon: Badge(
            isLabelVisible: hasUnreadNotifications,
            backgroundColor: colorScheme.error,
            smallSize: 8,
            child: const Icon(Icons.notifications_outlined),
          ),
        ),
        InkWell(
          borderRadius: BorderRadius.circular(24),
          onTap: () async {
            // If parent provided a handler, prefer it (keeps existing behavior).
            if (onProfileTap != null) {
              onProfileTap!();
              return;
            }

            final auth = context.read<AuthProvider>();
            if (auth.isAuthenticated) {
              // Usuário autenticado: ir para perfil
              Navigator.of(context).push(
                MaterialPageRoute(builder: (_) => const ProfileUser()),
              );
            } else {
              // Não autenticado: perguntar se deseja criar conta
              final create = await showDialog<bool>(
                context: context,
                builder: (ctx) => AlertDialog(
                  title: const Text('Criar conta'),
                  content: const Text('Você ainda não tem uma conta. Deseja criar uma agora?'),
                  actions: [
                    TextButton(
                      onPressed: () => Navigator.of(ctx).pop(false),
                      child: const Text('Cancelar'),
                    ),
                    TextButton(
                      onPressed: () => Navigator.of(ctx).pop(true),
                      child: const Text('Criar conta'),
                    ),
                  ],
                ),
              );

              if (create == true) {
                Navigator.of(context).push(
                  MaterialPageRoute(builder: (_) => const RegisterScreen()),
                );
              }
            }
          },
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 4, vertical: 8),
            child: Row(
              children: [
                CircleAvatar(
                  radius: 18,
                  backgroundColor: colorScheme.secondaryContainer,
                  backgroundImage: avatarUrl != null
                      ? NetworkImage(avatarUrl!)
                      : null,
                  child: avatarUrl == null
                      ? Icon(
                          Icons.person,
                          color: colorScheme.onSecondaryContainer,
                        )
                      : null,
                ),
                Icon(
                  Icons.keyboard_arrow_down,
                  color: colorScheme.onSurfaceVariant,
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }
}
