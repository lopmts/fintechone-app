import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import {
  createCategorySchema,
  listCategoriesSchema,
  updateCategorySchema,
} from "../schemas/categories";
import { randomUUID } from "../utils/random_uuid";

export async function categoryRoutes(app: FastifyInstance) {
  const auth = { onRequest: [app.authenticate] };

  // GET /categories (supports optional ?updatedSince=ISO)
  app.get("/", auth, async (request, reply) => {
    const result = listCategoriesSchema.safeParse(request.query ?? {});
    if (!result.success)
      return reply.status(400).send({ error: result.error.flatten() });

    // NOTE: categories model doesn't include updatedAt in the schema, so
    // updatedSince is currently ignored. Keep param for compatibility.
    const { page, limit } = result.data;

    const [categories, total] = await Promise.all([
      prisma.category.findMany({
        orderBy: { name: "asc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.category.count(),
    ]);

    return reply.send({
      categories,
      pagination: { total, page, limit, pages: Math.ceil(total / limit) },
    });
  });

  // POST /categories
  app.post("/", auth, async (request, reply) => {
    const result = createCategorySchema.safeParse(request.body);
    if (!result.success)
      return reply.status(400).send({ error: result.error.flatten() });

    try {
      const payload = {
        id: result.data.id ?? randomUUID(),
        key: result.data.key,
        name: result.data.name,
        type: result.data.type,
        icon: result.data.icon ?? result.data.key,
        color: result.data.color ?? "#000000",
      } as const;

      const category = await prisma.category.create({
        data: payload as any,
      });
      return reply.status(201).send({ category });
    } catch (error: any) {
      // Unique constraint on key
      if (error?.code === "P2002")
        return reply
          .status(409)
          .send({ error: "Categoria com essa key já existe" });
      return reply
        .status(500)
        .send({ error: "Erro ao criar categoria", detail: String(error) });
    }
  });

  // PUT /categories/:id  (upsert by client-provided id)
  app.put("/:id", auth, async (request, reply) => {
    const { id } = request.params as { id: string };

    const result = createCategorySchema.safeParse(request.body);
    if (!result.success)
      return reply.status(400).send({ error: result.error.flatten() });

    const exists = await prisma.category.findUnique({ where: { id } });
    if (exists) {
      const updatePayload: any = { ...result.data };
      // ensure icon/color not set to undefined when updating required cols
      if (updatePayload.icon === undefined) delete updatePayload.icon;
      if (updatePayload.color === undefined) delete updatePayload.color;

      const category = await prisma.category.update({
        where: { id },
        data: updatePayload,
      });
      return reply.send({ category });
    }

    const createPayload = {
      id,
      key: result.data.key,
      name: result.data.name,
      type: result.data.type,
      icon: result.data.icon ?? result.data.key,
      color: result.data.color ?? "#000000",
    } as any;

    const category = await prisma.category.create({ data: createPayload });
    return reply.status(201).send({ category });
  });

  // GET /categories/:id
  app.get("/:id", auth, async (request, reply) => {
    const { id } = request.params as { id: string };
    const category = await prisma.category.findUnique({ where: { id } });
    if (!category)
      return reply.status(404).send({ error: "Categoria não encontrada" });
    return reply.send({ category });
  });

  // PATCH /categories/:id
  app.patch("/:id", auth, async (request, reply) => {
    const { id } = request.params as { id: string };
    const result = updateCategorySchema.safeParse(request.body);
    if (!result.success)
      return reply.status(400).send({ error: result.error.flatten() });

    const exists = await prisma.category.findUnique({ where: { id } });
    if (!exists)
      return reply.status(404).send({ error: "Categoria não encontrada" });

    try {
      const category = await prisma.category.update({
        where: { id },
        data: result.data,
      });
      return reply.send({ category });
    } catch (error: any) {
      if (error?.code === "P2002")
        return reply
          .status(409)
          .send({ error: "Categoria com essa key já existe" });
      return reply
        .status(500)
        .send({ error: "Erro ao atualizar categoria", detail: String(error) });
    }
  });

  // DELETE /categories/:id?
  app.delete("/:id?", auth, async (request, reply) => {
    const { id } = request.params as { id?: string };
    const { ids } = (request.body as { ids?: string[] }) ?? {};

    const targets = id ? [id] : (ids ?? []);
    if (!targets.length)
      return reply.status(400).send({ error: "Informe id ou ids" });

    // Check for transactions referencing categories
    const referenced = await prisma.transaction.count({
      where: { categoryId: { in: targets } },
    });
    if (referenced > 0)
      return reply.status(400).send({
        error:
          "Uma ou mais categorias possuem transações e não podem ser removidas",
      });

    await prisma.category.deleteMany({ where: { id: { in: targets } } });
    return reply.status(204).send();
  });
}
