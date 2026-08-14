import { prisma } from "../lib/prisma";
import { calcSummary } from "./feedbackReport.service";
const EXPO_PUSH_URL = "https://exp.host/--/api/v2/push/send";
async function sendExpoPush(messages) {
    const res = await fetch(EXPO_PUSH_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify(messages),
    });
    if (!res.ok) {
        console.error("[Push] Expo API error:", await res.text());
    }
    return res.json();
}
export async function sendPeriodReportNotifications(period) {
    const now = new Date();
    const from = period === "weekly"
        ? (() => {
            const d = new Date(now);
            d.setDate(now.getDate() - 7);
            return d;
        })()
        : new Date(now.getFullYear(), now.getMonth(), 1);
    // Busca todos os tokens únicos
    const tokens = await prisma.pushToken.findMany({
        include: { user: true },
        where: {
            user: {
                is: {
                    deletedAt: null,
                },
            },
        },
    });
    // Gera as mensagens em paralelo
    const messages = await Promise.all(tokens.map(async ({ token, userId }) => {
        try {
            const summary = await calcSummary(userId, from, now);
            const net = Number(summary.net);
            const emoji = net >= 0 ? "📈" : "📉";
            const label = period === "weekly" ? "Semana" : "Mês";
            return {
                to: token,
                sound: "default",
                title: `${emoji} Relatório ${label} NoAzul`,
                body: net >= 0
                    ? `Você ficou no azul! Saldo: R$ ${summary.net.toFixed(2)}`
                    : `Atenção: saldo negativo de R$ ${Math.abs(net).toFixed(2)}`,
                data: { period, screen: "Reports" },
            };
        }
        catch (err) {
            console.error(`[Push] Erro ao gerar summary p/ ${userId}:`, err);
            return null;
        }
    }));
    const valid = messages.filter(Boolean);
    if (valid.length === 0)
        return;
    // Expo aceita até 100 por batch
    for (let i = 0; i < valid.length; i += 100) {
        await sendExpoPush(valid.slice(i, i + 100));
    }
    console.log(`[Push] ${valid.length} notificações enviadas (${period})`);
}
//# sourceMappingURL=pushNotification.service.js.map