import { FastifyInstance } from "fastify";
import { calcSummary } from "../services/feedbackReport.service";

export async function reportRoutes(app: FastifyInstance) {
  app.get(
    "/report/weekly",
    { onRequest: [app.authenticate] },
    async (req, reply) => {
      const { sub } = req.user as { sub: string };
      const userId = sub;
      const now = new Date();
      const from = new Date(now);
      from.setDate(now.getDate() - 7);

      const summary = await calcSummary(userId, from, now);
      return reply.send({
        period: "weekly",
        from,
        to: now,
        totalIncome: summary.totalIncome.toFixed(2),
        totalExpense: summary.totalExpense.toFixed(2),
        net: summary.net.toFixed(2),
        byCategory: summary.byCategory.map((c) => ({
          ...c,
          total: c.total.toFixed(2),
        })),
      });
    },
  );

  app.get(
    "/report/monthly",
    { onRequest: [app.authenticate] },
    async (req, reply) => {
      const { sub } = req.user as { sub: string };
      const userId = sub;
      const now = new Date();
      const from = new Date(now.getFullYear(), now.getMonth(), 1);

      const summary = await calcSummary(userId, from, now);
      return reply.send({
        period: "monthly",
        from,
        to: now,
        totalIncome: summary.totalIncome.toFixed(2),
        totalExpense: summary.totalExpense.toFixed(2),
        net: summary.net.toFixed(2),
        byCategory: summary.byCategory.map((c) => ({
          ...c,
          total: c.total.toFixed(2),
        })),
      });
    },
  );
}
