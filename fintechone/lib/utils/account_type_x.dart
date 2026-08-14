import 'package:flutter/material.dart';

import '../database/enums.dart';

extension AccountTypeX on AccountType {
  String get label => switch (this) {
    AccountType.checking => 'Conta corrente',
    AccountType.savings => 'Poupança',
    AccountType.credit => 'Cartão de crédito',
    AccountType.main => 'Principal',
  };

  IconData get icon => switch (this) {
    AccountType.checking => Icons.account_balance_outlined,
    AccountType.savings => Icons.savings_outlined,
    AccountType.credit => Icons.credit_card_outlined,
    AccountType.main => Icons.account_balance_wallet_outlined,
  };
}
