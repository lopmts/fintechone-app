// Componente separado da home de propósito — qualquer outra tela (uma tela
// "Contas" dedicada, por exemplo) pode reaproveitar. Lista horizontal, um
// card por conta, com a cor/ícone do banco — igual a imagem de referência.
//
// Lê as contas do AccountController (já exposto via Provider) — não
// recebe lista por parâmetro, então não precisa de nenhum "wiring" extra
// pra usar em outra tela, só colocar o widget.

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../../controller/account_controller.dart';
import '../../database/enums.dart';
import '../../models/account_model.dart';
import '../../utils/account_type_x.dart';
import '../../utils/bank_type_x.dart';
import '../form/currency_input_formatter.dart' show formatCents;

class AccountsSummaryCard extends StatelessWidget {
  const AccountsSummaryCard({
    super.key,
    this.onSeeAll,
    this.onAddAccount,
    this.onEditAccount,
  });

  final VoidCallback? onSeeAll;
  final VoidCallback? onAddAccount;

  /// Se null, o botão "⋮ > Editar" não aparece em nenhum card.
  final ValueChanged<AccountModel>? onEditAccount;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final accounts = context.watch<AccountController>().accounts;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 4),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text('Contas', style: theme.textTheme.titleMedium),
              if (accounts.isNotEmpty)
                TextButton(onPressed: onSeeAll, child: const Text('Ver todas')),
            ],
          ),
        ),
        const SizedBox(height: 8),
        if (accounts.isEmpty)
          Center(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                _EmptyState(onAddAccount: onAddAccount),
                const SizedBox(height: 8),
              ],
            ),
          )
        else
          SizedBox(
            height: 148,
            child: ListView.separated(
              scrollDirection: Axis.horizontal,
              clipBehavior: Clip.none,
              itemCount: accounts.length,
              separatorBuilder: (_, __) => const SizedBox(width: 12),
              itemBuilder: (context, index) => _AccountBankCard(
                account: accounts[index],
                onEdit: onEditAccount,
                onDelete: (account) =>
                    context.read<AccountController>().removeAccount(account.id),
              ),
            ),
          ),
      ],
    );
  }
}

enum _AccountCardAction { edit, delete }

class _AccountBankCard extends StatelessWidget {
  const _AccountBankCard({required this.account, this.onEdit, this.onDelete});

  final AccountModel account;
  final ValueChanged<AccountModel>? onEdit;
  final ValueChanged<AccountModel>? onDelete;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final brandColor = account.bank.brandColor;
    // Se a conta não tem banco associado (BankType.other), mostra o tipo
    // (Conta corrente, Poupança...) como legenda; se tem, mostra o nome do
    // banco — é o mesmo padrão da imagem de referência.
    final subtitle = account.bank == BankType.other
        ? account.type.label
        : account.bank.label;

    return SizedBox(
      width: 168,
      child: Card(
        margin: EdgeInsets.zero,
        clipBehavior: Clip.antiAlias,
        child: Padding(
          padding: const EdgeInsets.all(14),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  CircleAvatar(
                    radius: 18,
                    backgroundColor: brandColor,
                    child: Icon(
                      account.bank.icon,
                      color: Colors.white,
                      size: 18,
                    ),
                  ),
                  const Spacer(),
                  if (onEdit != null || onDelete != null)
                    PopupMenuButton<_AccountCardAction>(
                      padding: EdgeInsets.zero,
                      icon: Icon(
                        Icons.more_vert,
                        size: 18,
                        color: theme.colorScheme.onSurfaceVariant,
                      ),
                      onSelected: (action) {
                        switch (action) {
                          case _AccountCardAction.edit:
                            onEdit?.call(account);
                          case _AccountCardAction.delete:
                            onDelete?.call(account);
                        }
                      },
                      itemBuilder: (context) => [
                        if (onEdit != null)
                          const PopupMenuItem(
                            value: _AccountCardAction.edit,
                            child: Text('Editar'),
                          ),
                        if (onDelete != null)
                          const PopupMenuItem(
                            value: _AccountCardAction.delete,
                            child: Text('Excluir'),
                          ),
                      ],
                    ),
                ],
              ),
              const SizedBox(height: 10),
              Text(
                account.name,
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
                style: theme.textTheme.bodyLarge?.copyWith(
                  fontWeight: FontWeight.w600,
                ),
              ),
              const SizedBox(height: 2),
              // Por enquanto mostra o saldo inicial — quando o cálculo de
              // saldo por transações existir, troca só essa linha por ele.
              Text(
                'R\$ ${formatCents(account.initialBalanceCents)}',
                style: theme.textTheme.titleMedium?.copyWith(
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 4),
            ],
          ),
        ),
      ),
    );
  }
}

class _EmptyState extends StatelessWidget {
  const _EmptyState({this.onAddAccount});

  final VoidCallback? onAddAccount;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 24, horizontal: 16),
      child: Column(
        children: [
          Icon(
            Icons.account_balance_wallet_outlined,
            size: 32,
            color: theme.colorScheme.outline,
          ),
          const SizedBox(height: 8),
          Text('Nenhuma conta cadastrada', style: theme.textTheme.bodyMedium),
          const SizedBox(height: 12),
          FilledButton.tonal(
            onPressed: onAddAccount,
            child: const Text('Adicionar conta'),
          ),
        ],
      ),
    );
  }
}
