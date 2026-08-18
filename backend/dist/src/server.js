import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";
import "dotenv/config";
import Fastify from "fastify";
import { serializerCompiler, validatorCompiler, } from "fastify-type-provider-zod";
import { accountRoutes } from "./routes/accounts.routes";
import { authRoutes } from "./routes/auth.routes";
import { budgetRoutes } from "./routes/budgets.routes";
import { categoryRoutes } from "./routes/categories.routes";
import { summaryRoutes } from "./routes/summary.routes";
import { transactionRoutes } from "./routes/transactions.routes";
import { userRoutes } from "./routes/user.routes";
//cron time
import { registerFeedbackReportJobs } from "./jobs/feedbackReport.job";
import { registerPermanentDeletionJob } from "./jobs/permanent-deletion.job";
import { registerReportNotificationJobs } from "./jobs/reportNotification.job";
import { deleteAccountRoutes } from "./routes/delete-account.routes";
import { financingRoutes } from "./routes/financing.routes";
import { pushTokenRoutes } from "./routes/pushToken.routes";
import { reportRoutes } from "./routes/report.routes";
const app = Fastify({ logger: true });
// Inicia os jobs de envio de relatórios e limpeza de contas
registerFeedbackReportJobs();
registerPermanentDeletionJob();
registerReportNotificationJobs();
app.register(swagger, {
    openapi: {
        info: {
            title: "NoAzul API",
            version: "1.0.0",
        },
    },
});
app.register(swaggerUI, {
    routePrefix: "/docs",
});
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);
// Plugins
app.register(cors, { origin: true });
app.register(jwt, {
    secret: process.env.JWT_SECRET ?? "changeme-use-env-in-production",
    sign: {
        expiresIn: "30d", // ou "7d", "1h", etc.
    },
});
// Decorator de autenticação reutilizável
app.decorate("authenticate", async function (request, reply) {
    try {
        await request.jwtVerify();
    }
    catch {
        reply.status(401).send({ error: "Token inválido ou expirado" });
    }
});
// Rotas
app.register(authRoutes, { prefix: "/api/auth" });
app.register(financingRoutes, { prefix: "/api/financings" });
app.register(userRoutes, { prefix: "/api/user" });
app.register(deleteAccountRoutes, { prefix: "/api/user" });
app.register(accountRoutes, { prefix: "/api/accounts" });
app.register(transactionRoutes, { prefix: "/api/transactions" });
app.register(budgetRoutes, { prefix: "/api/budgets" });
app.register(categoryRoutes, { prefix: "/api/categories" });
app.register(summaryRoutes, { prefix: "/api/summary" });
app.register(reportRoutes, { prefix: "/api/reports" });
app.register(pushTokenRoutes, { prefix: "/api/notifications" });
// Health check
app.get("/health", async () => ({
    status: {
        ok: true,
        message: "Servidor está funcionando corretamente",
    },
    timestamp: new Date().toISOString(),
}));
app.setErrorHandler((error, request, reply) => {
    app.log.error(error);
    reply.status(500).send({
        status: "error",
        message: "Ocorreu um erro interno no servidor",
    });
});
app.get("/logs", async (request, reply) => {
    try {
        const logs = await app.log;
        reply.send(logs);
    }
    catch (error) {
        app.log.error(error);
        reply.status(500).send({
            status: "error",
            message: "Ocorreu um erro ao buscar os logs",
        });
    }
});
const start = async () => {
    try {
        const port = Number(process.env.PORT) || 3333;
        await app.listen({ port, host: "0.0.0.0" });
        console.log(`🚀 Servidor rodando em http://localhost:${port}`);
    }
    catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};
start();
//# sourceMappingURL=server.js.map