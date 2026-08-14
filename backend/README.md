# Expense API

Backend para app de gerenciamento de gastos pessoais — Fastify + Prisma + TypeScript + PostgreSQL.

---

## Instalação

```bash
# 1. Instalar dependências
npm install

# 2. Configurar variáveis de ambiente
cp .env.example .env
# edite .env com sua DATABASE_URL e JWT_SECRET

# 3. Rodar migrations
npm run db:migrate

# 4. Iniciar em desenvolvimento
npm run dev
```

---

## Endpoints

### Auth

| Método | Rota         | Descrição              | Auth |
|--------|--------------|------------------------|------|
| POST   | /auth/register | Criar conta           | ✗    |
| POST   | /auth/login    | Login                 | ✗    |
| GET    | /auth/me       | Dados do usuário      | ✓    |

**Exemplo — register:**
```json
POST /auth/register
{
  "name": "João Silva",
  "email": "joao@email.com",
  "password": "senha123"
}
```

### Contas (Accounts)

| Método | Rota           | Descrição              | Auth |
|--------|----------------|------------------------|------|
| GET    | /accounts      | Listar contas + saldo total | ✓ |
| POST   | /accounts      | Criar conta            | ✓    |
| GET    | /accounts/:id  | Buscar conta           | ✓    |
| PATCH  | /accounts/:id  | Atualizar conta        | ✓    |
| DELETE | /accounts/:id  | Excluir conta          | ✓    |

**Exemplo — criar conta:**
```json
POST /accounts
{
  "name": "Nubank",
  "balance": 1500.00,
  "salary": 4000.00
}
```

### Transações

| Método | Rota                | Descrição              | Auth |
|--------|---------------------|------------------------|------|
| GET    | /transactions       | Listar com filtros     | ✓    |
| POST   | /transactions       | Registrar transação    | ✓    |
| GET    | /transactions/:id   | Detalhe                | ✓    |
| PATCH  | /transactions/:id   | Atualizar              | ✓    |
| DELETE | /transactions/:id   | Excluir (reverte saldo)| ✓    |

**Filtros disponíveis em GET /transactions:**
```
?accountId=xxx&categoryId=xxx&type=EXPENSE&from=2025-01-01T00:00:00Z&to=2025-01-31T23:59:59Z&page=1&limit=20
```

**Exemplo — registrar gasto:**
```json
POST /transactions
{
  "accountId": "cuid_da_conta",
  "categoryId": "cuid_da_categoria",
  "description": "Supermercado",
  "amount": 250.00,
  "type": "EXPENSE",
  "date": "2025-01-15T10:00:00Z"
}
```

### Orçamentos (Budgets)

| Método | Rota          | Descrição                       | Auth |
|--------|---------------|---------------------------------|------|
| GET    | /budgets      | Listar com progresso de gastos  | ✓    |
| POST   | /budgets      | Criar orçamento                 | ✓    |
| PATCH  | /budgets/:id  | Atualizar                       | ✓    |
| DELETE | /budgets/:id  | Excluir                         | ✓    |

**Exemplo — criar orçamento semanal:**
```json
POST /budgets
{
  "name": "Alimentação semana",
  "amount": 300.00,
  "period": "WEEKLY",
  "startDate": "2025-01-13T00:00:00Z",
  "endDate": "2025-01-19T23:59:59Z"
}
```

### Resumo (Summary)  ⭐ Endpoint principal

```
GET /summary?accountId=xxx  (accountId é opcional — sem ele retorna todas as contas)
```

**Resposta:**
```json
{
  "period": {
    "weekStart": "2025-01-13T00:00:00.000Z",
    "weekEnd": "2025-01-19T23:59:59.999Z",
    "monthStart": "2025-01-01T00:00:00.000Z",
    "monthEnd": "2025-01-31T23:59:59.999Z"
  },
  "week": {
    "totalExpenses": 185.50,
    "totalIncome": 0,
    "balance": -185.50
  },
  "month": {
    "totalExpenses": 1320.00,
    "totalIncome": 4000.00,
    "balance": 2680.00
  },
  "accounts": {
    "list": [...],
    "totalBalance": 3200.00,
    "totalSalary": 4000.00,
    "projectedBalance": 5880.00
  },
  "budgets": [
    {
      "id": "...",
      "name": "Alimentação semana",
      "period": "WEEKLY",
      "limit": 300,
      "spentAmount": 185.50,
      "remaining": 114.50,
      "percentage": 61.8,
      "status": "ok"
    }
  ],
  "topSpendingCategories": [
    { "category": { "id": "...", "name": "Alimentação" }, "total": 520.00 }
  ]
}
```

**Status dos orçamentos:**
- `ok` — abaixo de 80% do limite
- `warning` — entre 80% e 100%
- `exceeded` — acima de 100%

---

## Autenticação

Todas as rotas protegidas exigem o header:
```
Authorization: Bearer <token_jwt>
```

---

## Estrutura do projeto

```
src/
├── server.ts          # Entrada, registro de plugins e rotas
├── prisma.ts          # Singleton do Prisma Client
├── routes/
│   ├── auth.ts        # Registro e login
│   ├── accounts.ts    # Contas bancárias
│   ├── transactions.ts # Gastos e receitas
│   ├── budgets.ts     # Orçamentos com progresso
│   ├── categories.ts  # Categorias de gasto
│   └── summary.ts     # Resumo consolidado ⭐
├── schemas/
│   └── index.ts       # Validações Zod
└── utils/
    └── dates.ts       # Helpers de semana/mês
prisma/
└── schema.prisma      # Modelos do banco
```
