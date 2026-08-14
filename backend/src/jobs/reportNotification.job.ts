import cron from "node-cron";
import { sendPeriodReportNotifications } from "../services/pushNotification.service";

export function registerReportNotificationJobs() {
  // Todo domingo às 20h
  cron.schedule("0 20 * * 0", async () => {
    console.log("[CRON] Enviando notificações semanais...");
    await sendPeriodReportNotifications("weekly");
  });

  // Último dia do mês às 20h
  cron.schedule("0 20 28-31 * *", async () => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);

    // Só executa se amanhã for dia 1 (= hoje é o último dia do mês)
    if (tomorrow.getDate() === 1) {
      console.log("[CRON] Enviando notificações mensais...");
      await sendPeriodReportNotifications("monthly");
    }
  });

  console.log("[CRON] Jobs de notificação registrados.");
}
