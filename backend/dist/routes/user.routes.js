import { prisma } from "../lib/prisma";
import { userUpdate } from "../schemas";
export async function userRoutes(app) {
    app.put("/update", { onRequest: [app.authenticate] }, async (request, reply) => {
        const { sub } = request.user;
        const result = userUpdate.safeParse(request.body);
        if (!result.success) {
            return reply.status(400).send({ error: result.error.flatten() });
        }
        const user = await prisma.user.findUnique({
            where: { id: sub },
            select: { id: true },
        });
        if (!user)
            return reply.status(404).send({ error: "Usuário não encontrado" });
        const update = await prisma.user.update({
            where: { id: sub },
            data: result.data,
        });
        return reply.send({
            user: update,
            status: 200,
            message: "Usuario atualizado!",
        });
    });
}
//# sourceMappingURL=user.routes.js.map