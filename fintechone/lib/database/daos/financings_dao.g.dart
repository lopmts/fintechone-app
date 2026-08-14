// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'financings_dao.dart';

// ignore_for_file: type=lint
mixin _$FinancingsDaoMixin on DatabaseAccessor<AppDatabase> {
  $FinancingsTable get financings => attachedDatabase.financings;
  FinancingsDaoManager get managers => FinancingsDaoManager(this);
}

class FinancingsDaoManager {
  final _$FinancingsDaoMixin _db;
  FinancingsDaoManager(this._db);
  $$FinancingsTableTableManager get financings =>
      $$FinancingsTableTableManager(_db.attachedDatabase, _db.financings);
}
