// primeira conta.

import 'package:fintechone/screens/forms/account_form_screen.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../../controller/account_controller.dart';
import '../../controller/transaction_controller.dart';
import '../../database/enums.dart';
import '../../models/account_model.dart';
import '../../models/transaction_model.dart';
import '../../utils/transaction_type_x.dart';
import '../../widgets/form/app_date_form_field.dart';
import '../../widgets/form/app_dropdown_form_field.dart';
import '../../widgets/form/app_form_submit_button.dart';
import '../../widgets/form/app_text_form_field.dart';
import '../../widgets/form/category_picker_field.dart';
import '../../widgets/form/money_form_field.dart';

class TransactionFormScreen extends StatefulWidget {
  const TransactionFormScreen({super.key, this.transaction});

  final TransactionModel? transaction;

  bool get isEditing => transaction != null;

  @override
  State<TransactionFormScreen> createState() => _TransactionFormScreenState();
}

class _TransactionFormScreenState extends State<TransactionFormScreen> {
  final _formKey = GlobalKey<FormState>();
  late final TextEditingController _descriptionController;
  late final TextEditingController _notesController;
  late final TextEditingController _amountController;
  late TransactionType _selectedType;
  late DateTime _selectedDate;
  String? _selectedCategoryId;

  // Resolvido no primeiro build (ver _resolveSelectedAccount) porque
  // depende da lista de contas, que só temos com segurança depois que o
  // Provider já está disponível — não dá pra confiar nisso no initState.
  AccountModel? _selectedAccount;

  @override
  void initState() {
    super.initState();
    final t = widget.transaction;
    _descriptionController = TextEditingController(text: t?.description ?? '');
    _notesController = TextEditingController(text: t?.notes ?? '');
    _amountController = moneyController(t?.amountCents);
    _selectedType = t?.type ?? TransactionType.expense;
    _selectedDate = t?.date ?? DateTime.now();
    _selectedCategoryId = t?.categoryId;
  }

  @override
  void dispose() {
    _descriptionController.dispose();
    _notesController.dispose();
    _amountController.dispose();
    super.dispose();
  }

  void _resolveSelectedAccount(List<AccountModel> accounts) {
    if (_selectedAccount != null || accounts.isEmpty) return;
    _selectedAccount = accounts.firstWhere(
      (a) => a.id == widget.transaction?.accountId,
      orElse: () => accounts.first,
    );
  }

  Future<void> _submit() async {
    if (!_formKey.currentState!.validate()) return;

    final controller = context.read<TransactionController>();
    final description = _descriptionController.text.trim();
    final notes = _notesController.text.trim();
    final amountCents = centsOf(_amountController);

    if (widget.isEditing) {
      final updated = widget.transaction!.copyWith(
        accountId: _selectedAccount!.id,
        categoryId: _selectedCategoryId,
        clearCategory: _selectedCategoryId == null,
        description: description,
        notes: notes.isEmpty ? null : notes,
        clearNotes: notes.isEmpty,
        amountCents: amountCents,
        type: _selectedType,
        date: _selectedDate,
      );
      await controller.updateTransaction(updated);
    } else {
      final created = TransactionModel.createFromCents(
        accountId: _selectedAccount!.id,
        categoryId: _selectedCategoryId,
        description: description,
        notes: notes.isEmpty ? null : notes,
        amountCents: amountCents,
        type: _selectedType,
        date: _selectedDate,
      );
      await controller.addTransaction(created);
    }

    if (mounted) Navigator.of(context).pop();
  }

  @override
  Widget build(BuildContext context) {
    final accounts = context.watch<AccountController>().accounts;

    if (accounts.isEmpty) {
      return const _NoAccountsPrompt();
    }

    _resolveSelectedAccount(accounts);
    final isSaving = context.watch<TransactionController>().isSaving;

    return Scaffold(
      appBar: AppBar(
        title: Text(widget.isEditing ? 'Editar transação' : 'Nova transação'),
      ),
      body: Form(
        key: _formKey,
        child: ListView(
          padding: const EdgeInsets.all(16),
          children: [
            AppDropdownFormField<TransactionType>(
              label: 'Tipo',
              value: _selectedType,
              items: TransactionType.values,
              labelBuilder: (type) => type.label,
              onChanged: (type) => setState(() {
                _selectedType = type;
                // Categoria de despesa não existe pra receita (e
                // vice-versa) — troca o tipo, some a categoria escolhida.
                _selectedCategoryId = null;
              }),
            ),
            const SizedBox(height: 16),
            CategoryPickerField(
              transactionType: _selectedType,
              selectedCategoryId: _selectedCategoryId,
              onChanged: (category) =>
                  setState(() => _selectedCategoryId = category?.id),
            ),
            const SizedBox(height: 16),
            MoneyFormField(controller: _amountController, label: 'Valor'),
            const SizedBox(height: 16),
            AppTextFormField(
              controller: _descriptionController,
              label: 'Descrição',
              textInputAction: TextInputAction.next,
            ),
            const SizedBox(height: 16),
            AppDropdownFormField<AccountModel>(
              label: 'Conta',
              value: _selectedAccount!,
              items: accounts,
              labelBuilder: (a) => a.name,
              onChanged: (a) => setState(() => _selectedAccount = a),
            ),
            const SizedBox(height: 16),
            AppDateFormField(
              label: 'Data',
              value: _selectedDate,
              onChanged: (date) => setState(() => _selectedDate = date),
            ),
            const SizedBox(height: 16),
            AppTextFormField(
              controller: _notesController,
              label: 'Notas (opcional)',
              required: false,
              maxLines: 3,
            ),
            const SizedBox(height: 24),
            AppFormSubmitButton(
              isSaving: isSaving,
              onPressed: _submit,
              label: widget.isEditing ? 'Salvar alterações' : 'Criar transação',
            ),
          ],
        ),
      ),
    );
  }
}

class _NoAccountsPrompt extends StatelessWidget {
  const _NoAccountsPrompt();

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Scaffold(
      appBar: AppBar(title: const Text('Nova transação')),
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(24),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Icon(
                Icons.account_balance_wallet_outlined,
                size: 40,
                color: theme.colorScheme.outline,
              ),
              const SizedBox(height: 12),
              Text(
                'Você ainda não tem nenhuma conta',
                style: theme.textTheme.titleMedium,
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 4),
              Text(
                'Toda transação precisa estar ligada a uma conta. '
                'Crie a primeira pra começar a lançar.',
                style: theme.textTheme.bodyMedium,
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 20),
              FilledButton(
                onPressed: () => Navigator.of(context).push(
                  MaterialPageRoute(builder: (_) => const AccountFormScreen()),
                ),
                child: const Text('Criar conta'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
