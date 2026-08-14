import { prisma } from "../lib/prisma";
export async function categoryRoutes(app) {
    const auth = { onRequest: [app.authenticate] };
    app.get("/", auth, async (_request, reply) => {
        const categories = await prisma.category.findMany({
            orderBy: { name: "asc" },
        });
        return reply.send({ categories });
    });
}
//# sourceMappingURL=categories.routes.js.map