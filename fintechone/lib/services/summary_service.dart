// Espelha o que o /summary do backend calcula (saldo real, entradas/saídas
// do mês) — mas 100% local, via Drift. Não faz nenhuma chamada de rede:
// a Home nunca deve travar esperando o backend só pra mostrar o resumo.
//
// Se um dia quiser usar o /summary de verdade (ex: pra comparar com outro
// aparelho), essa classe é o lugar certo pra adicionar um fallback: tenta
// local primeiro (instantâneo), e deixa o valor do backend só invalidar
// via sync — nunca troca o "local first" pela resposta da rede.

import '../database/daos/transactions_dao.dart';

class SummaryService {
  SummaryService({required TransactionsDao transactionsDao})
    : _transactionsDao = transactionsDao;

  final TransactionsDao _transactionsDao;

  /// Entradas/saídas de TODAS as contas, no mês corrente — equivalente ao
  /// bloco `month` do /summary.
  Stream<({int expense, int income, int transfer})> watchMonthFlows() {
    final (start, end) = _currentMonthRange();
    return _transactionsDao.watchFlows(from: start, to: end);
  }

  /// Entradas/saídas de TODO o histórico, de todas as contas — combinado
  /// com o saldo inicial de cada conta (feito no SummaryController), dá o
  /// equivalente ao `accounts.totalRealBalance` do /summary.
  Stream<({int expense, int income, int transfer})> watchAllTimeFlows() =>
      _transactionsDao.watchFlows();

  /// Despesas do mês corrente agrupadas por categoria — equivalente ao
  /// `topSpendingCategories` do /summary, só que sem limitar a 5: aqui
  /// mostra toda categoria com gasto no mês (o SummaryController decide o
  /// que fazer com isso, incluindo calcular o % de cada uma).
  Stream<List<({String categoryId, int totalCents})>>
  watchMonthExpensesByCategory() {
    final (start, end) = _currentMonthRange();
    return _transactionsDao.watchExpensesByCategory(from: start, to: end);
  }

  (DateTime start, DateTime end) _currentMonthRange() {
    final now = DateTime.now();
    final start = DateTime(now.year, now.month, 1);
    final end = DateTime(
      now.year,
      now.month + 1,
      1,
    ).subtract(const Duration(milliseconds: 1));
    return (start, end);
  }
}
