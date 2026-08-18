import { createFinancingSchema, deleteFinancingSchema, getFinancingSchema, listFinancingsSchema, markPaidSchema, updateFinancingSchema, } from "../schemas/financing_schema";
import { createFinancing, deleteFinancing, getFinancingById, getFinancings, markInstallmentsPaid, updateFinancing, } from "../services/financing.service";
import { randomUUID } from "../utils/random_uuid";
// Campos percentuais/taxa são opcionais E aceitam null (o front manda null
// quando o campo fica vazio, em vez de simplesmente omitir a chave).
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
            id: body.id ?? randomUUID(),
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