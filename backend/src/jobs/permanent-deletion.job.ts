import cron from "node-cron";
import { prisma } from "../lib/prisma";

export function registerPermanentDeletionJob() {
  // Executa todo dia à meia-noite
  cron.schedule("0 0 * * *", async () => {
    console.log("[CRON] Iniciando limpeza de contas expiradas...");

    try {
      // Busca DeleteRequests expirados
      const expired = await prisma.deleteRequest.findMany({
        where: { expiresAt: { lt: new Date() } },
        select: { userId: true },
      });

      if (expired.length === 0) {
        console.log("[CRON] Nenhuma conta para excluir.");
        return;
      }

      const userIds = expired.map((r) => r.userId);

      // Deleta os usuários — o Cascade no schema apaga tudo relacionado
      const { count } = await prisma.user.deleteMany({
        where: { id: { in: userIds } },
      });

      console.log(`[CRON] ${count} conta(s) excluída(s) definitivamente.`);
    } catch (error) {
      console.error("[CRON] Erro na limpeza:", error);
    }
  });
}
