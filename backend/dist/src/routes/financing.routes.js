import z from "zod";
import { createFinancing, deleteFinancing, getFinancingById, getFinancings, markInstallmentsPaid, updateFinancing, } from "../services/financing.service";
// Campos percentuais/taxa são opcionais E aceitam null (o front manda null
// quando o campo fica vazio, em vez de simplesmente omitir a chave).
const optionalPercent = z.number().min(0).nullable().optional();
const createFinancingSchema = {
    body: z.object({
        title: z.string().min(1).max(130),
        amount: z.number().min(0.01),
        installmentAmount: z.number().min(0.01),
        interestRate: optionalPercent, // % ao mês — opcional, apenas informativo
        installments: z.number().int().min(1),
        startDate: z.string().datetime(),
        lateFeeRate: optionalPercent, // % multa única sobre a parcela
        lateInterestRate: optionalPercent, // % mora ao dia sobre a parcela
    }),
};
const listFinancingsSchema = {
    querystring: z.object({
        filter: z.enum(["all", "paid", "unpaid", "overdue"]).optional(),
    }),
};
const getFinancingSchema = {
    params: z.object({
        id: z.string(),
    }),
};
const updateFinancingSchema = {
    params: z.object({
        id: z.string(),
    }),
    body: z.object({
        title: z.string().min(1).max(130).optional(),
        amount: z.number().min(0.01).optional(),
        installmentAmount: z.number().min(0.01).optional(),
        interestRate: optionalPercent,
        installments: z.number().int().min(1).optional(),
        startDate: z.string().datetime().optional(),
        lateFeeRate: optionalPercent,
        lateInterestRate: optionalPercent,
    }),
};
const markPaidSchema = {
    params: z.object({
        id: z.string(),
    }),
    body: z.object({
        installmentNumbers: z.array(z.number().int().min(1)).min(1),
        paidAt: z.string().datetime().optional(),
    }),
};
const deleteFinancingSchema = {
    params: z.object({
        id: z.string(),
    }),
};
export async function financingRoutes(app) {
    const auth = { onRequest: [app.authenticate] };
    /**
     * POST /api/financings
     * Cria um novo financiamento. userId vem do JWT (request.user.sub).
     */
    app.post("/", { ...auth, schema: createFinancingSchema }, async (req, reply) => {
        const { sub: userId } = req.user;
        const body = req.body;
        const financing = await createFinancing({
            ...body,
            userId,
            startDate: new Date(body.startDate),
        });
        return reply.status(201).send({ financing });
    });
    /**
     * GET /api/financings
     * Lista financiamentos com filtros: all | paid | unpaid | overdue
     */
    app.get("/", { ...auth, schema: listFinancingsSchema }, async (req, reply) => {
        const { sub: userId } = req.user;
        const { filter = "all" } = req.query;
        const data = await getFinancings(userId, filter);
        return reply.send(data);
    });
    /**
     * GET /api/financings/:id
     * Detalhe de um financiamento com todas as parcelas.
     */
    app.get("/:id", { ...auth, schema: getFinancingSchema }, async (req, reply) => {
        const { sub: userId } = req.user;
        const { id } = req.params;
        const financing = await getFinancingById(userId, id);
        if (!financing)
            return reply.status(404).send({ message: "Financing not found" });
        return reply.send({ financing });
    });
    /**
     * PATCH /api/financings/:id
     * Edita dados do financiamento.
     */
    app.patch("/:id", { ...auth, schema: updateFinancingSchema }, async (req, reply) => {
        const { sub: userId } = req.user;
        const { id } = req.params;
        const body = req.body;
        try {
            const financing = await updateFinancing(userId, id, {
                ...body,
                startDate: body.startDate ? new Date(body.startDate) : undefined,
            });
            return reply.send({ financing });
        }
        catch (err) {
            if (err.message === "Financing not found") {
                return reply.status(404).send({ message: err.message });
            }
            if (err.message?.startsWith("Cannot set installments")) {
                return reply.status(400).send({ message: err.message });
            }
            throw err;
        }
    });
    /**
     * PATCH /api/financings/:id/installments/pay
     * Marca uma ou mais parcelas como pagas.
     */
    app.patch("/:id/installments/pay", { ...auth, schema: markPaidSchema }, async (req, reply) => {
        const { sub: userId } = req.user;
        const { id } = req.params;
        const body = req.body;
        try {
            const financing = await markInstallmentsPaid(userId, {
                financingId: id,
                installmentNumbers: body.installmentNumbers,
                paidAt: body.paidAt ? new Date(body.paidAt) : undefined,
            });
            return reply.send({ financing });
        }
        catch (err) {
            if (err.message === "Financing not found") {
                return reply.status(404).send({ message: err.message });
            }
            throw err;
        }
    });
    /**
     * DELETE /api/financings/:id
     * Remove um financiamento (e suas parcelas via cascade).
     */
    app.delete("/:id", { ...auth, schema: deleteFinancingSchema }, async (req, reply) => {
        const { sub: userId } = req.user;
        const { id } = req.params;
        const deleted = await deleteFinancing(userId, id);
        if (!deleted)
            return reply.status(404).send({ message: "Financing not found" });
        return reply.status(204).send();
    });
}
//# sourceMappingURL=financing.routes.js.map