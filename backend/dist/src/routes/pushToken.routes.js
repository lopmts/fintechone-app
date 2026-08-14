import { prisma } from "../lib/prisma";
export async function pushTokenRoutes(app) {
    app.post("/push-token", { onRequest: [app.authenticate] }, async (req, reply) => {
        const { sub: userId } = req.user;
        const { token } = req.body;
        if (!token || !token.startsWith("ExponentPushToken[")) {
            return reply.status(400).send({ error: "Token inválido" });
        }
        await prisma.pushToken.upsert({
            where: { token },
            update: { userId },
            create: { userId, token },
        });
        return reply.send({ ok: true });
    });
    app.delete("/push-token", { onRequest: [app.authenticate] }, async (req, reply) => {
        const { token } = req.body;
        await prisma.pushToken.deleteMany({ where: { token } });
        return reply.send({ ok: true });
    });
}
//# sourceMappingURL=pushToken.routes.js.map