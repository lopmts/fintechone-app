import cron from "node-cron";
import { sendMonthlyReport, sendWeeklyReport, } from "../services/feedbackReport.service";
export function registerFeedbackReportJobs() {
    // Todo domingo às 20h
    cron.schedule("0 20 * * 0", async () => {
        console.log("[CRON] Sending weekly feedback reports...");
        await sendWeeklyReport();
    });
    // Todo último dia do mês às 21h
    cron.schedule("0 21 * * *", async () => {
        const now = new Date();
        const tomorrow = new Date(now);
        tomorrow.setDate(now.getDate() + 1);
        const isLastDayOfMonth = tomorrow.getMonth() !== now.getMonth();
        if (!isLastDayOfMonth)
            return;
        console.log("[CRON] Sending monthly feedback reports...");
        await sendMonthlyReport();
    });
}
//# sourceMappingURL=feedbackReport.job.js.map