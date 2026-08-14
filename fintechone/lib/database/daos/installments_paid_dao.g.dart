// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'installments_paid_dao.dart';

// ignore_for_file: type=lint
mixin _$InstallmentsPaidDaoMixin on DatabaseAccessor<AppDatabase> {
  $FinancingsTable get financings => attachedDatabase.financings;
  $InstallmentsPaidTable get installmentsPaid =>
      attachedDatabase.installmentsPaid;
  InstallmentsPaidDaoManager get managers => InstallmentsPaidDaoManager(this);
}

class InstallmentsPaidDaoManager {
  final _$InstallmentsPaidDaoMixin _db;
  InstallmentsPaidDaoManager(this._db);
  $$FinancingsTableTableManager get financings =>
      $$FinancingsTableTableManager(_db.attachedDatabase, _db.financings);
  $$InstallmentsPaidTableTableManager get installmentsPaid =>
      $$InstallmentsPaidTableTableManager(
        _db.attachedDatabase,
        _db.installmentsPaid,
      );
}
