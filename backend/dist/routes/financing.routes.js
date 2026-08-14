import { createFinancing, deleteFinancing, getFinancingById, getFinancings, markInstallmentsPaid, } from "../services/financing.service";
const createFinancingSchema = {
    body: {
        type: "object",
        required: ["userId", "amount", "interestRate", "installments", "startDate"],
        properties: {
            userId: { type: "string" },
            amount: { type: "number", minimum: 0.01 },
            interestRate: { type: "number", minimum: 0 }, // % ao mês
            installments: { type: "integer", minimum: 1 },
            startDate: { type: "string", format: "date-time" },
        },
    },
};
const listFinancingsSchema = {
    querystring: {
        type: "object",
        properties: {
            userId: { type: "string" },
            filter: { type: "string", enum: ["all", "paid", "unpaid", "overdue"] },
        },
        required: ["userId"],
    },
};
const getFinancingSchema = {
    params: {
        type: "object",
        required: ["id"],
        properties: { id: { type: "string" } },
    },
    querystring: {
        type: "object",
        required: ["userId"],
        properties: { userId: { type: "string" } },
    },
};
const markPaidSchema = {
    params: {
        type: "object",
        required: ["id"],
        properties: { id: { type: "string" } },
    },
    body: {
        type: "object",
        required: ["installmentNumbers"],
        properties: {
            installmentNumbers: {
                type: "array",
                items: { type: "integer", minimum: 1 },
                minItems: 1,
            },
            paidAt: { type: "string", format: "date-time" },
        },
    },
};
const deleteFinancingSchema = {
    params: {
        type: "object",
        required: ["id"],
        properties: { id: { type: "string" } },
    },
    querystring: {
        type: "object",
        required: ["userId"],
        properties: { userId: { type: "string" } },
    },
};
export async function financingRoutes(app) {
    /**
     * POST /financings
     * Cria um novo financiamento.
     */
    app.post("/financings", { schema: createFinancingSchema }, async (req, reply) => {
        const body = req.body;
        const result = await createFinancing({
            ...body,
            startDate: new Date(body.startDate),
        });
        return reply.status(201).send(result);
    });
    /**
     * GET /financings
     * Lista financiamentos com filtros: all | paid | unpaid | overdue
     * Inclui sumário total dos valores.
     *
     * Query: userId, filter?
     */
    app.get("/financings", { schema: listFinancingsSchema }, async (req, reply) => {
        const { userId, filter = "all" } = req.query;
        const data = await getFinancings(userId, filter);
        return reply.send(data);
    });
    /**
     * GET /financings/:id
     * Detalhe de um financiamento com todas as parcelas.
     *
     * Query: userId
     */
    app.get("/financings/:id", { schema: getFinancingSchema }, async (req, reply) => {
        const { id } = req.params;
        const { userId } = req.query;
        const data = await getFinancingById(userId, id);
        if (!data)
            return reply.status(404).send({ message: "Financing not found" });
        return reply.send(data);
    });
    /**
     * PATCH /financings/:id/installments/pay
     * Marca uma ou mais parcelas como pagas.
     *
     * Body: { installmentNumbers: number[], paidAt?: string }
     */
    app.patch("/financings/:id/installments/pay", { schema: markPaidSchema }, async (req, reply) => {
        const { id } = req.params;
        const body = req.body;
        try {
            const result = await markInstallmentsPaid({
                financingId: id,
                installmentNumbers: body.installmentNumbers,
                paidAt: body.paidAt ? new Date(body.paidAt) : undefined,
            });
            return reply.send(result);
        }
        catch (err) {
            if (err.message === "Financing not found") {
                return reply.status(404).send({ message: err.message });
            }
            throw err;
        }
    });
    /**
     * DELETE /financings/:id
     * Remove um financiamento (e suas parcelas via cascade).
     *
     * Query: userId
     */
    app.delete("/financings/:id", { schema: deleteFinancingSchema }, async (req, reply) => {
        const { id } = req.params;
        const { userId } = req.query;
        const deleted = await deleteFinancing(userId, id);
        if (!deleted)
            return reply.status(404).send({ message: "Financing not found" });
        return reply.status(204).send();
    });
}
//# sourceMappingURL=financing.routes.js.map