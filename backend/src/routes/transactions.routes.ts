import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import {
  createTransactionSchema,
  listTransactionsSchema,
  updateTransactionSchema,
} from "../schemas/transactions";
import { randomUUID } from "../utils/random_uuid";

export async function transactionRoutes(app: FastifyInstance) {
  const auth = { onRequest: [app.authenticate] };

  // GET /transactions (supports optional ?updatedSince=ISO)
  app.get("/", auth, async (request, reply) => {
    const { sub: userId } = request.user as { sub: string };

    const result = listTransactionsSchema.safeParse(request.query);
    if (!result.success)
      return reply.status(400).send({ error: result.error.flatten() });

    const { accountId, categoryId, type, from, to, page, limit, updatedSince } =
      result.data as any;

    const where: any = {
      userId,
      ...(accountId && { accountId }),
      ...(categoryId && { categoryId }),
      ...(type && { type }),
      ...(from || to
        ? {
            date: {
              ...(from && { gte: new Date(from) }),
              ...(to && { lte: new Date(to) }),
            },
          }
        : {}),
    };

    if (updatedSince) {
      const sinceDate = new Date(updatedSince);
      if (!isNaN(sinceDate.getTime())) {
        where.updatedAt = { gt: sinceDate };
      }
    }

    const [transactions, total] = await Promise.all([
      prisma.transaction.findMany({
        where,
        include: {
          category: true,
          account: { select: { id: true, name: true } },
        },
        orderBy: { date: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.transaction.count({ where }),
    ]);

    return reply.send({
      transactions,
      pagination: { total, page, limit, pages: Math.ceil(total / limit) },
    });
  });

  // POST /transactions
  app.post("/", auth, async (request, reply) => {
    const { sub: userId } = request.user as { sub: string };

    console.log(request.body);

    const result = createTransactionSchema.safeParse(request.body);
    if (!result.success) return reply.status(400).send({ error: result.error });

    const { accountId, amount, type, date, categoryId, categoryKey, ...rest } =
      result.data;

    const account = await prisma.account.findFirst({
      where: { id: accountId, userId },
    });
    if (!account)
      return reply.status(404).send({ error: "Conta não encontrada" });

    let selectedCategoryId: string;

    if (categoryId || categoryKey) {
      const category = await prisma.category.findFirst({
        where: categoryId ? { id: categoryId } : { key: categoryKey },
      });
      if (!category)
        return reply.status(404).send({ error: "Categoria não encontrada" });
      selectedCategoryId = category.id;
    } else {
      const categories = await prisma.category.findMany({
        select: { id: true, key: true },
      });
      if (categories.length === 0)
        return reply
          .status(404)
          .send({ error: "Nenhuma categoria disponível" });
      selectedCategoryId =
        categories[Math.floor(Math.random() * categories.length)].id;
    }

    const transaction = await prisma.transaction.create({
      data: {
        id: result.data.id ?? randomUUID(),
        ...rest,
        amount,
        type,
        accountId,
        categoryId: selectedCategoryId,
        userId,
        date: date ? new Date(date) : new Date(),
      },
      include: { category: true },
    });

    return reply.status(201).send({ transaction });
  });

  // PUT /transactions/:id  (upsert by client-provided id)
  app.put("/:id", auth, async (request, reply) => {
    const { sub: userId } = request.user as { sub: string };
    const { id } = request.params as { id: string };

    const result = createTransactionSchema.safeParse(request.body);
    if (!result.success) return reply.status(400).send({ error: result.error });

    const { accountId, amount, type, date, categoryId, categoryKey, ...rest } =
      result.data;

    const account = await prisma.account.findFirst({
      where: { id: accountId, userId },
    });
    if (!account)
      return reply.status(404).send({ error: "Conta não encontrada" });

    let selectedCategoryId: string;

    if (categoryId || categoryKey) {
      const category = await prisma.category.findFirst({
        where: categoryId ? { id: categoryId } : { key: categoryKey },
      });
      if (!category)
        return reply.status(404).send({ error: "Categoria não encontrada" });
      selectedCategoryId = category.id;
    } else {
      const categories = await prisma.category.findMany({
        select: { id: true, key: true },
      });
      if (categories.length === 0)
        return reply
          .status(404)
          .send({ error: "Nenhuma categoria disponível" });
      selectedCategoryId =
        categories[Math.floor(Math.random() * categories.length)].id;
    }

    const exists = await prisma.transaction.findFirst({
      where: { id, userId },
    });
    if (exists) {
      const transaction = await prisma.transaction.update({
        where: { id },
        data: {
          ...rest,
          amount,
          type,
          accountId,
          categoryId: selectedCategoryId,
          ...(date && { date: new Date(date) }),
        },
        include: { category: true },
      });
      return reply.send({ transaction });
    }

    const transaction = await prisma.transaction.create({
      data: {
        id,
        ...rest,
        amount,
        type,
        accountId,
        categoryId: selectedCategoryId,
        userId,
        date: date ? new Date(date) : new Date(),
      },
      include: { category: true },
    });

    return reply.status(201).send({ transaction });
  });

  // GET /transactions/:id
  app.get("/:id", auth, async (request, reply) => {
    const { sub: userId } = request.user as { sub: string };
    const { id } = request.params as { id: string };

    const transaction = await prisma.transaction.findFirst({
      where: { id, userId },
      include: {
        category: true,
        account: { select: { id: true, name: true } },
      },
    });

    if (!transaction)
      return reply.status(404).send({ error: "Transação não encontrada" });

    return reply.send({ transaction });
  });

  // PATCH /transactions/:id
  app.patch("/:id", auth, async (request, reply) => {
    const { sub: userId } = request.user as { sub: string };
    const { id } = request.params as { id: string };

    const result = updateTransactionSchema.safeParse(request.body);
    if (!result.success)
      return reply.status(400).send({ error: result.error.flatten() });

    const existing = await prisma.transaction.findFirst({
      where: { id, userId },
    });
    if (!existing)
      return reply.status(404).send({ error: "Transação não encontrada" });

    const { date, categoryId, categoryKey, ...rest } = result.data;

    let resolvedCategoryId: string | undefined;

    if (categoryId || categoryKey) {
      const category = await prisma.category.findFirst({
        where: categoryId ? { id: categoryId } : { key: categoryKey },
      });
      if (!category)
        return reply.status(404).send({ error: "Categoria não encontrada" });
      resolvedCategoryId = category.id;
    }

    const transaction = await prisma.transaction.update({
      where: { id },
      data: {
        ...rest,
        ...(resolvedCategoryId && { categoryId: resolvedCategoryId }),
        ...(date && { date: new Date(date) }),
      },
      include: { category: true },
    });

    return reply.send({ transaction });
  });

  // DELETE /transactions/:id
  app.delete("/:id?", auth, async (request, reply) => {
    const { sub: userId } = request.user as { sub: string };
    const { id } = request.params as { id: string };
    const { ids } = (request.body ?? {}) as { ids?: string[] };

    // ── exclusão em lote
    if (ids && ids.length > 0) {
      const found = await prisma.transaction.findMany({
        where: { id: { in: ids }, userId },
        select: { id: true },
      });

      if (found.length !== ids.length) {
        const foundIds = found.map((b) => b.id);
        const missing = ids.filter((i) => !foundIds.includes(i));
        return reply
          .status(404)
          .send({ error: "Transações não encontrados", missing });
      }

      await prisma.transaction.deleteMany({
        where: { id: { in: ids }, userId },
      });
      return reply.status(204).send();
    }

    if (id) {
      const existing = await prisma.transaction.findFirst({
        where: { id, userId },
      });
      if (!existing)
        return reply.status(404).send({ error: "Transação não encontrada" });

      await prisma.transaction.delete({ where: { id } });
      return reply.status(204).send();
    }
    return reply.status(400).send({ error: "Informe id ou ids para exclusão" });
  });
}
