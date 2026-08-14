import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../../controller/account_controller.dart';
import '../../database/enums.dart';
import '../../models/account_model.dart';
import '../../utils/account_type_x.dart';
import '../../utils/bank_type_x.dart';
import '../../widgets/form/app_dropdown_form_field.dart';
import '../../widgets/form/app_form_submit_button.dart';
import '../../widgets/form/app_text_form_field.dart';
import '../../widgets/form/money_form_field.dart';

class AccountFormScreen extends StatefulWidget {
  /// Passe [account] pra abrir em modo edição (campos pré-preenchidos).
  /// Deixe null pra criar uma conta nova.
  const AccountFormScreen({super.key, this.account});

  final AccountModel? account;

  bool get isEditing => account != null;

  @override
  State<AccountFormScreen> createState() => _AccountFormScreenState();
}

class _AccountFormScreenState extends State<AccountFormScreen> {
  final _formKey = GlobalKey<FormState>();
  late final TextEditingController _nameController;
  late final TextEditingController _balanceController;
  late final TextEditingController _salaryController;
  late AccountType _selectedType;
  late BankType _selectedBank;

  @override
  void initState() {
    super.initState();
    final account = widget.account;
    _nameController = TextEditingController(text: account?.name ?? '');
    // moneyController já formata a partir de centavos — sem double aqui.
    _balanceController = moneyController(account?.initialBalanceCents);
    _salaryController = moneyController(account?.salaryCents);
    _selectedType = account?.type ?? AccountType.checking;
    _selectedBank = account?.bank ?? BankType.other;
  }

  @override
  void dispose() {
    _nameController.dispose();
    _balanceController.dispose();
    _salaryController.dispose();
    super.dispose();
  }

  Future<void> _submit() async {
    if (!_formKey.currentState!.validate()) return;

    final controller = context.read<AccountController>();
    final name = _nameController.text.trim();
    final balanceCents = centsOf(_balanceController);
    final salaryCents = centsOfOrNull(_salaryController);

    if (widget.isEditing) {
      final updated = widget.account!.copyWith(
        name: name,
        type: _selectedType,
        bank: _selectedBank,
        initialBalanceCents: balanceCents,
        salaryCents: salaryCents,
        clearSalary: salaryCents == null,
      );
      await controller.updateAccount(updated);
    } else {
      final created = AccountModel.createFromCents(
        name: name,
        type: _selectedType,
        bank: _selectedBank,
        initialBalanceCents: balanceCents,
        salaryCents: salaryCents,
      );
      await controller.addAccount(created);
    }

    if (mounted) Navigator.of(context).pop();
  }

  @override
  Widget build(BuildContext context) {
    final isSaving = context.watch<AccountController>().isSaving;

    return Scaffold(
      appBar: AppBar(
        title: Text(widget.isEditing ? 'Editar conta' : 'Nova conta'),
      ),
      body: Form(
        key: _formKey,
        child: ListView(
          padding: const EdgeInsets.all(16),
          children: [
            AppTextFormField(
              controller: _nameController,
              label: 'Nome da conta',
              textInputAction: TextInputAction.next,
            ),
            const SizedBox(height: 16),
            AppDropdownFormField<AccountType>(
              label: 'Tipo',
              value: _selectedType,
              items: AccountType.values,
              labelBuilder: (type) => type.label,
              onChanged: (type) => setState(() => _selectedType = type),
            ),
            const SizedBox(height: 16),
            AppDropdownFormField<BankType>(
              label: 'Banco',
              value: _selectedBank,
              items: BankType.values,
              labelBuilder: (bank) => bank.label,
              onChanged: (bank) => setState(() => _selectedBank = bank),
            ),
            const SizedBox(height: 16),
            MoneyFormField(
              controller: _balanceController,
              label: 'Saldo inicial',
              // Mexer no saldo inicial depois de criado é sensível (mexe na
              // base de todo o histórico já calculado) — trave na edição:
              enabled: !widget.isEditing,
            ),
            const SizedBox(height: 16),
            MoneyFormField(
              controller: _salaryController,
              label: 'Salário (opcional)',
              required: false,
            ),
            const SizedBox(height: 24),
            AppFormSubmitButton(
              isSaving: isSaving,
              onPressed: _submit,
              label: widget.isEditing ? 'Salvar alterações' : 'Criar conta',
            ),
          ],
        ),
      ),
    );
  }
}
