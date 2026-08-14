//
// Só responde "tem internet agora?". Reaproveitável em qualquer lugar do
// app que precise saber isso (banner "offline", tela de sync, etc).

import 'package:connectivity_plus/connectivity_plus.dart';

class ConnectivityService {
  final Connectivity _connectivity = Connectivity();

  Future<bool> hasInternet() async {
    final results = await _connectivity.checkConnectivity();
    return results.any((r) => r != ConnectivityResult.none);
  }

  /// Stream útil pra um widget mostrar "Você está offline" em tempo real,
  /// ou pro SyncGateService dar um retry automático assim que a conexão
  /// voltar.
  Stream<bool> get onChange => _connectivity.onConnectivityChanged.map(
    (results) => results.any((r) => r != ConnectivityResult.none),
  );
}
