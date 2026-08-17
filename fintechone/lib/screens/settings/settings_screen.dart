import 'package:flutter/material.dart';
import 'dart:async';
import 'package:package_info_plus/package_info_plus.dart';
import 'package:provider/provider.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'package:fintechone/services/backup_service.dart';
import 'package:fintechone/database/database.dart';
import 'package:fintechone/network/account_api.dart';
import 'package:fintechone/network/transaction_api.dart';

class SettingsScreen extends StatefulWidget {
  const SettingsScreen({super.key});

  @override
  State<SettingsScreen> createState() => _SettingsScreenState();
}

class _SettingsScreenState extends State<SettingsScreen> {
  String _appVersion = '';

  @override
  void initState() {
    super.initState();
    _loadAppVersion();
  }

  Future<void> _loadAppVersion() async {
    final info = await PackageInfo.fromPlatform();
    if (!mounted) return;
    setState(() {
      _appVersion = '${info.version} (${info.buildNumber})';
    });
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      // Sem backgroundColor explícito: usa o scaffoldBackgroundColor definido
      // em AppTheme.light/dark (que já respeita AMOLED e o colorScheme atual).
      body: SafeArea(
        child: ListView(
          padding: const EdgeInsets.fromLTRB(16, 24, 16, 24),
          children: [
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,

              children: [
                Row(
                  children: [
                    BackButton(color: theme.colorScheme.onSurface),
                    Text(
                      'Configurações',
                      style: theme.textTheme.headlineSmall?.copyWith(
                        fontWeight: FontWeight.bold,
                        color: theme.colorScheme.onSurface,
                      ),
                    ),
                    const SizedBox(width: 16),
                  ],
                ),
                const SizedBox(height: 24),
              ],
            ),

            // Grupo: Aparência
            _SettingsGroup(
              children: [
                _SettingsTile(
                  icon: Icons.palette_outlined,
                  title: 'Tema',
                  subtitle: 'Cores, modo claro/escuro',
                  onTap: () => Navigator.pushNamed(
                    context,
                    '/settings/theme_settings_screen',
                  ),
                ),
              ],
            ),
            const SizedBox(height: 20),

            // Grupo: Armazenamento
            _SettingsGroup(
              children: [
                _SettingsTile(
                  icon: Icons.storage_outlined,
                  title: 'Banco de dados local',
                  subtitle: 'Ver tamanho e limpar dados salvos',
                  onTap: () => Navigator.pushNamed(
                    context,
                    '/pages/cache_management_screen',
                  ),
                ),
                _SettingsTile(
                  icon: Icons.cloud_upload_outlined,
                  title: 'Backup (enviar dados ao servidor)',
                  subtitle: 'Envia contas e transações como um backup',
                  // Substitua a parte do showDialog e o código de backup por este:

                  onTap: () async {
                    // Abre um diálogo com progresso e roda o BackupService.
                    final db = context.read<AppDatabase>();
                    final accApi = context.read<AccountApi>();
                    final txApi = context.read<TransactionApi>();
                    final notifications = FlutterLocalNotificationsPlugin();

                    double lastProgress = 0.0;
                    String lastMessage = 'Iniciando...';
                    bool running = true;

                    // Referência para o serviço
                    late final BackupService service;

                    // Completer para controlar o cancelamento
                    final cancelCompleter = Completer<void>();

                    void Function(void Function())? dialogSetState;
                    BuildContext? dialogContext;

                    showDialog(
                      context: context,
                      barrierDismissible: false,
                      builder: (ctx) {
                        dialogContext = ctx;
                        return StatefulBuilder(
                          builder: (context, setState) {
                            dialogSetState = setState;
                            return AlertDialog(
                              title: const Text('Backup de dados'),
                              content: SizedBox(
                                height: 140,
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text(lastMessage),
                                    const SizedBox(height: 12),
                                    LinearProgressIndicator(
                                      value: lastProgress,
                                    ),
                                    const SizedBox(height: 12),
                                    Text(
                                      '${(lastProgress * 100).toStringAsFixed(0)}%',
                                    ),
                                  ],
                                ),
                              ),
                              actions: [
                                if (running) ...[
                                  TextButton(
                                    onPressed: () {
                                      // Cancela o serviço
                                      service.cancel();
                                      // Completa o cancelamento
                                      if (!cancelCompleter.isCompleted) {
                                        cancelCompleter.complete();
                                      }
                                      // Atualiza UI
                                      setState(() {
                                        lastMessage = 'Cancelando...';
                                      });
                                    },
                                    child: const Text('Cancelar'),
                                  ),
                                  TextButton(
                                    onPressed: null,
                                    child: const Text('Fechar'),
                                  ),
                                ] else ...[
                                  TextButton(
                                    onPressed: () {
                                      if (dialogContext != null &&
                                          Navigator.of(
                                            dialogContext!,
                                          ).canPop()) {
                                        Navigator.of(dialogContext!).pop();
                                      }
                                    },
                                    child: const Text('Fechar'),
                                  ),
                                ],
                              ],
                            );
                          },
                        );
                      },
                    );

                    // Cria o serviço
                    service = BackupService(
                      accountsDao: db.accountsDao,
                      transactionsDao: db.transactionsDao,
                      accountApi: accApi,
                      transactionApi: txApi,
                      notifications: notifications,
                    );

                    try {
                      // Executa o backup com race contra o cancelamento
                      final backupFuture = service.backupAll(
                        onProgress: (progress, message) {
                          lastProgress = progress;
                          lastMessage = message;
                          try {
                            dialogSetState?.call(() {});
                          } catch (_) {}
                        },
                      );

                      // Aguarda o primeiro a completar: backup ou cancelamento
                      final result = await Future.any([
                        backupFuture.then((_) => 'completed'),
                        cancelCompleter.future.then((_) => 'cancelled'),
                      ]);

                      running = false;

                      if (result == 'cancelled') {
                        // Se foi cancelado, espera o backup finalizar o cancelamento
                        try {
                          await backupFuture;
                        } catch (_) {
                          // Ignora erro de cancelamento
                        }

                        if (dialogContext != null &&
                            Navigator.of(dialogContext!).canPop()) {
                          Navigator.of(dialogContext!).pop();
                        }

                        ScaffoldMessenger.of(context).showSnackBar(
                          const SnackBar(content: Text('Backup cancelado')),
                        );
                      } else {
                        // Backup concluído com sucesso
                        try {
                          dialogSetState?.call(() {});
                        } catch (_) {}

                        if (dialogContext != null &&
                            Navigator.of(dialogContext!).canPop()) {
                          Navigator.of(dialogContext!).pop();
                        }

                        ScaffoldMessenger.of(context).showSnackBar(
                          const SnackBar(
                            content: Text('Backup concluído com sucesso'),
                          ),
                        );
                      }
                    } catch (e) {
                      running = false;
                      try {
                        dialogSetState?.call(() {});
                      } catch (_) {}

                      if (dialogContext != null &&
                          Navigator.of(dialogContext!).canPop()) {
                        Navigator.of(dialogContext!).pop();
                      }

                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(content: Text('Erro no backup: $e')),
                      );
                    }
                  },
                ),
              ],
            ),
            const SizedBox(height: 20),

            // Grupo: Sobre
            _SettingsGroup(
              children: [
                _SettingsTile(
                  icon: Icons.info_outline,
                  title: 'Versão do app',
                  subtitle: _appVersion.isEmpty ? 'Carregando...' : _appVersion,
                  showArrow: false,
                ),
                _SettingsTile(
                  icon: Icons.system_update_outlined,
                  title: 'Verificar atualizações',
                  subtitle: 'Checar se há uma nova versão disponível',
                  onTap: () => Navigator.pushNamed(
                    context,
                    '/pages/check_update_screen',
                  ),
                ),
                _SettingsTile(
                  icon: Icons.article_outlined,
                  title: 'Logs',
                  subtitle: 'Ver logs do app para depuração',
                  onTap: () =>
                      Navigator.pushNamed(context, '/settings/logs_screen'),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}

/// Card arredondado que agrupa vários _SettingsTile,
/// com divisores finos entre os itens (igual ao print de referência).
/// As cores vêm do ColorScheme ativo, então acompanham tema dinâmico,
/// seed color e modo claro/escuro/AMOLED automaticamente.
class _SettingsGroup extends StatelessWidget {
  final List<Widget> children;

  const _SettingsGroup({required this.children});

  @override
  Widget build(BuildContext context) {
    final cs = Theme.of(context).colorScheme;

    return Container(
      decoration: BoxDecoration(
        color: cs.surfaceContainerHigh,
        borderRadius: BorderRadius.circular(20),
      ),
      child: Column(
        children: [
          for (int i = 0; i < children.length; i++) ...[
            children[i],
            if (i != children.length - 1)
              Divider(
                height: 1,
                thickness: 1,
                indent: 68,
                color: cs.outlineVariant.withOpacity(0.3),
              ),
          ],
        ],
      ),
    );
  }
}

class _SettingsTile extends StatelessWidget {
  final IconData icon;
  final String title;
  final String subtitle;
  final VoidCallback? onTap;
  final bool showArrow;

  const _SettingsTile({
    required this.icon,
    required this.title,
    required this.subtitle,
    this.onTap,
    this.showArrow = true,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final cs = theme.colorScheme;

    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(20),
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
        child: Row(
          children: [
            Icon(icon, color: cs.onSurface, size: 24),
            const SizedBox(width: 20),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    title,
                    style: theme.textTheme.titleMedium?.copyWith(
                      color: cs.onSurface,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                  const SizedBox(height: 2),
                  Text(
                    subtitle,
                    style: theme.textTheme.bodySmall?.copyWith(
                      color: cs.onSurfaceVariant,
                    ),
                  ),
                ],
              ),
            ),
            if (showArrow)
              Icon(Icons.chevron_right, color: cs.onSurfaceVariant, size: 22),
          ],
        ),
      ),
    );
  }
}
