// Fiação (dependency injection) de todo o app usando package:provider.
// Coloque <AppProviders> envolvendo o MaterialApp no main.dart.
// Pra adicionar transactions/budgets/financing depois, é só repetir o
// mesmo padrão dos 3 ProxyProvider abaixo (Api -> Service -> Controller).

import 'package:fintechone/controller/category_controller.dart';
import 'package:fintechone/controller/summary_controller.dart';
import 'package:fintechone/controller/transaction_controller.dart';
import 'package:fintechone/database/enums.dart';
import 'package:fintechone/network/api_client.dart';
import 'package:fintechone/network/transaction_api.dart';
import 'package:fintechone/providers/auth_provider.dart';
import 'package:fintechone/services/auth/auth_repository.dart';
import 'package:fintechone/services/auth/token_storage.dart';
import 'package:fintechone/services/category_service.dart';
import 'package:fintechone/services/summary_service.dart';
import 'package:fintechone/services/transaction_service.dart';
import 'package:flutter/widgets.dart';
import 'package:provider/provider.dart';

import '../controller/account_controller.dart';
import '../database/database.dart';
import '../network/account_api.dart';
import '../services/account_service.dart';
import '../services/connectivity_service.dart';
import '../services/sync_gate_service.dart';
import 'theme_provider.dart';

const _backendBaseUrl = 'http://localhost:3333';

class AppProviders extends StatelessWidget {
  AppProviders({super.key, required this.child})
    : authRepository = AuthRepository(
        client: apiClient,
        authService: authService,
      );

  final Widget child;

  // `static` porque um field initializer (a linha `: authRepository = ...`
  // acima) roda ANTES de `this` estar totalmente construído — então ele só
  // pode referenciar membros estáticos, não membros de instância.
  // Isso continua sendo uma única instância compartilhada por todo o app
  // (é um singleton de fato, já que AppProviders só é criado uma vez na raiz).
  static final ApiClient apiClient = ApiClient(
    baseUrl: 'https://localhost:3333/api',
  );

  // MESMA instância usada tanto pelo AuthRepository (login/registro) quanto
  // pelo Provider<TokenStorage> abaixo, que alimenta `auth.readToken` em
  // AccountApi/TransactionApi. Fonte única de verdade do JWT no app inteiro.
  static final TokenStorage authService = TokenStorage();

  final AuthRepository authRepository;

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => ThemeProvider()),
        ChangeNotifierProvider(create: (_) => AuthProvider(authRepository)),
        // ── Infra (uma instância só, compartilhada por todo o app) ──
        Provider<AppDatabase>(
          create: (_) => AppDatabase(),
          dispose: (_, db) => db.close(),
        ),
        Provider<TokenStorage>(create: (_) => authService),
        Provider<ConnectivityService>(create: (_) => ConnectivityService()),
        ProxyProvider2<TokenStorage, ConnectivityService, SyncGateService>(
          update: (_, auth, connectivity, __) =>
              SyncGateService(auth, connectivity),
        ),

        // ── Feature: Accounts ──
        ProxyProvider<TokenStorage, AccountApi>(
          update: (_, auth, __) =>
              AccountApi(baseUrl: _backendBaseUrl, getToken: auth.readToken),
        ),
        ProxyProvider3<
          AppDatabase,
          AccountApi,
          SyncGateService,
          AccountService
        >(
          update: (_, db, api, syncGate, __) =>
              AccountService(dao: db.accountsDao, api: api, syncGate: syncGate),
        ),
        ChangeNotifierProxyProvider<AccountService, AccountController>(
          create: (context) =>
              AccountController(context.read<AccountService>()),
          update: (_, service, controller) =>
              controller ?? AccountController(service),
        ),

        // ── Feature: Transactions ──
        // Mesmo padrão de Accounts: Api -> Service -> Controller. Repare
        // que reaproveita o MESMO SyncGateService — não é uma instância
        // nova por feature.
        ProxyProvider<TokenStorage, TransactionApi>(
          update: (_, auth, __) => TransactionApi(
            baseUrl: _backendBaseUrl,
            getToken: auth.readToken,
          ),
        ),
        ProxyProvider3<
          AppDatabase,
          TransactionApi,
          SyncGateService,
          TransactionService
        >(
          update: (_, db, api, syncGate, __) => TransactionService(
            dao: db.transactionsDao,
            api: api,
            syncGate: syncGate,
          ),
        ),
        ChangeNotifierProxyProvider<TransactionService, TransactionController>(
          create: (context) =>
              TransactionController(context.read<TransactionService>()),
          update: (_, service, controller) =>
              controller ?? TransactionController(service),
        ),

        // ── Feature: Categories ──
        // Sem Api/sync por enquanto — é uma lista fixa, semeada localmente
        // (ver CategoryService._ensureSeeded). Quando categorias
        // personalizadas existirem, ganha um Api/sync igual as outras.
        ProxyProvider<AppDatabase, CategoryService>(
          update: (_, db, __) => CategoryService(dao: db.categoriesDao),
        ),
        ChangeNotifierProxyProvider<CategoryService, CategoryController>(
          create: (context) =>
              CategoryController(context.read<CategoryService>()),
          update: (_, service, controller) =>
              controller ?? CategoryController(service),
        ),

        // ── Feature: Resumo geral (Home) ──
        // Não depende de rede nem de outro Controller — só do banco local,
        // através do AccountService (contas) e do SummaryService (fluxos).
        ProxyProvider<AppDatabase, SummaryService>(
          update: (_, db, __) =>
              SummaryService(transactionsDao: db.transactionsDao),
        ),
        ChangeNotifierProxyProvider2<
          AccountService,
          SummaryService,
          SummaryController
        >(
          create: (context) => SummaryController(
            accountService: context.read<AccountService>(),
            summaryService: context.read<SummaryService>(),
          ),
          update: (_, accountService, summaryService, controller) =>
              controller ??
              SummaryController(
                accountService: accountService,
                summaryService: summaryService,
              ),
        ),
      ],
      child: child,
    );
  }
}
