// Serviço de validação central: combina AuthService + ConnectivityService
// pra responder UMA pergunta — "posso sincronizar agora?". Reaproveitado
// por TODOS os *Service do app (AccountService, TransactionService,
// BudgetService, FinancingService...) — nenhum deles reimplementa essa
// checagem.
//
// Regra: só sincroniza se (1) o usuário tem token salvo E (2) tem internet.
// Se qualquer uma falhar, o app continua 100% funcional offline — sync é
// sempre best-effort, nunca bloqueante.

import 'package:fintechone/services/auth/token_storage.dart';

import 'connectivity_service.dart';

class SyncGateService {
  SyncGateService(this._auth, this._connectivity);

  final TokenStorage _auth;
  final ConnectivityService _connectivity;

  Future<bool> canSync() async {
    final loggedIn = await _auth.isLoggedIn();
    if (!loggedIn) return false;
    return _connectivity.hasInternet();
  }
}
