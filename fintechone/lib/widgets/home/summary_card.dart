// Card "Resumo geral": saldo total + donut de entradas/saídas do mês.
// Lê do SummaryController (Provider) — não recebe nada por parâmetro além
// de callbacks, então dá pra usar em outra tela sem passar dado nenhum.

import 'dart:math' as math;

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../../controller/summary_controller.dart';
import '../form/currency_input_formatter.dart' show formatCents;

class SummaryCard extends StatelessWidget {
  const SummaryCard({super.key, this.onTap});

  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final controller = context.watch<SummaryController>();

    return Card(
      margin: EdgeInsets.zero,
      clipBehavior: Clip.antiAlias,
      child: InkWell(
        onTap: onTap,
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            children: [
              Row(
                children: [
                  Text('Resumo geral', style: theme.textTheme.titleMedium),
                  IconButton(
                    visualDensity: VisualDensity.compact,
                    tooltip: controller.valuesHidden
                        ? 'Mostrar valores'
                        : 'Ocultar valores',
                    onPressed: controller.toggleValuesVisibility,
                    icon: Icon(
                      controller.valuesHidden
                          ? Icons.visibility_off_outlined
                          : Icons.visibility_outlined,
                      size: 20,
                    ),
                  ),
                  const Spacer(),
                  if (onTap != null)
                    Icon(Icons.chevron_right, color: theme.colorScheme.outline),
                ],
              ),
              Text('Saldo total', style: theme.textTheme.bodyMedium),
              const SizedBox(height: 4),
              Text(
                controller.valuesHidden
                    ? 'R\$ ••••••'
                    : 'R\$ ${formatCents(controller.totalBalanceCents)}',
                style: theme.textTheme.headlineSmall?.copyWith(
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 20),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  _FlowIndicator(
                    icon: Icons.arrow_upward_rounded,
                    color: Colors.green,
                    label: 'Entradas',
                    cents: controller.monthIncomeCents,
                    hidden: controller.valuesHidden,
                  ),
                  _FlowDonut(
                    incomeCents: controller.monthIncomeCents,
                    expenseCents: controller.monthExpenseCents,
                  ),
                  _FlowIndicator(
                    icon: Icons.arrow_downward_rounded,
                    color: theme.colorScheme.error,
                    label: 'Saídas',
                    cents: controller.monthExpenseCents,
                    hidden: controller.valuesHidden,
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _FlowIndicator extends StatelessWidget {
  const _FlowIndicator({
    required this.icon,
    required this.color,
    required this.label,
    required this.cents,
    required this.hidden,
  });

  final IconData icon;
  final Color color;
  final String label;
  final int cents;
  final bool hidden;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Column(
      children: [
        CircleAvatar(
          radius: 18,
          backgroundColor: color.withValues(alpha: 0.15),
          child: Icon(icon, color: color, size: 18),
        ),
        const SizedBox(height: 6),
        Text(label, style: theme.textTheme.bodySmall?.copyWith(color: color)),
        const SizedBox(height: 2),
        Text(
          hidden ? 'R\$ ••••••' : 'R\$ ${formatCents(cents)}',
          style: theme.textTheme.titleSmall,
        ),
      ],
    );
  }
}

class _FlowDonut extends StatelessWidget {
  const _FlowDonut({required this.incomeCents, required this.expenseCents});

  final int incomeCents;
  final int expenseCents;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final total = incomeCents + expenseCents;
    // Sem transações ainda -> anel meio a meio, só pra não ficar "quebrado".
    final incomeFraction = total == 0 ? 0.5 : incomeCents / total;

    return SizedBox(
      width: 84,
      height: 84,
      child: Stack(
        alignment: Alignment.center,
        children: [
          CustomPaint(
            size: const Size(84, 84),
            painter: _DonutPainter(
              incomeFraction: incomeFraction,
              incomeColor: Colors.green,
              expenseColor: theme.colorScheme.error,
            ),
          ),
          CircleAvatar(
            radius: 22,
            backgroundColor: theme.colorScheme.surfaceContainerHighest,
            child: Icon(
              Icons.account_balance_wallet_outlined,
              color: theme.colorScheme.onSurfaceVariant,
              size: 20,
            ),
          ),
        ],
      ),
    );
  }
}

class _DonutPainter extends CustomPainter {
  _DonutPainter({
    required this.incomeFraction,
    required this.incomeColor,
    required this.expenseColor,
  });

  final double incomeFraction;
  final Color incomeColor;
  final Color expenseColor;

  static const _strokeWidth = 8.0;
  static const _start = -math.pi / 2; // começa no topo, igual relógio

  @override
  void paint(Canvas canvas, Size size) {
    final ringRect = (Offset.zero & size).deflate(_strokeWidth / 2);
    final paint = Paint()
      ..style = PaintingStyle.stroke
      ..strokeWidth = _strokeWidth
      ..strokeCap = StrokeCap.round;

    // Desenha o anel de "saídas" inteiro primeiro...
    canvas.drawArc(
      ringRect,
      _start,
      2 * math.pi,
      false,
      paint..color = expenseColor,
    );
    // ...e por cima a fatia proporcional de "entradas".
    canvas.drawArc(
      ringRect,
      _start,
      2 * math.pi * incomeFraction,
      false,
      paint..color = incomeColor,
    );
  }

  @override
  bool shouldRepaint(covariant _DonutPainter oldDelegate) =>
      oldDelegate.incomeFraction != incomeFraction ||
      oldDelegate.incomeColor != incomeColor ||
      oldDelegate.expenseColor != expenseColor;
}
