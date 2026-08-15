//
// Enums compartilhados entre as tabelas locais. Mantidos em arquivo próprio
// pra evitar import cíclico entre as tabelas que os usam.

enum AccountType { checking, savings, credit, main }

enum TransactionType { expense, income, transfer }

enum BudgetPeriod { weekly, monthly }

enum CategoryKey {
  food,
  transport,
  housing,
  health,
  leisure,
  education,
  clothing,
  salary,
  freelance,
  investment,
  card,
  other,
}

enum BankType {
  nubank,
  itau,
  bradesco,
  santander,
  caixa,
  banco_do_brasil,
  inter,
  c6_bank,
  pagbank,
  next,
  original,
  other,
}

// Não usados nas tabelas locais (accounts/transactions/financing/budgets/
// categories) — pertencem ao domínio de autenticação do backend (User).
// Só inclua aqui se algum dia precisar espelhar dados de login localmente.
enum AuthProviderEnum { local, google, apple }

enum DevicePlatform { android, ios, web }
