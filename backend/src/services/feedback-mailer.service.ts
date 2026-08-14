import { Decimal } from "@prisma/client/runtime/library";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

type FeedbackEmailPayload = {
  email: string; // era "to: Date" — renomeado para evitar conflito
  name: string;
  period: "semanal" | "mensal";
  startDate: Date; // era "from"
  endDate: Date; // era "to"
  summary: {
    totalIncome: Decimal;
    totalExpense: Decimal;
    net: Decimal;
    byCategory: { name: string; icon: string; color: string; total: Decimal }[];
  };
};

function fmt(value: Decimal) {
  return value.toFixed(2).replace(".", ",");
}

function buildEmailHtml(payload: FeedbackEmailPayload) {
  const { name, period, summary, startDate, endDate } = payload;
  const isPositive = summary.net.gte(0);
  const dateRange = `${startDate.toLocaleDateString("pt-BR")} – ${endDate.toLocaleDateString("pt-BR")}`;

  const categoryRows = summary.byCategory
    .map(
      (c) => `
      <tr>
        <td style="padding:6px 0">${c.icon} ${c.name}</td>
        <td style="padding:6px 0;text-align:right;color:#ef4444">R$ ${fmt(c.total)}</td>
      </tr>`,
    )
    .join("");

  return `
  <div style="font-family:sans-serif;max-width:520px;margin:auto;background:#0f172a;color:#f1f5f9;padding:32px;border-radius:12px">
    <h2 style="margin:0 0 4px">📊 Relatório ${period}</h2>
    <p style="color:#94a3b8;margin:0 0 24px">${dateRange}</p>

    <p>Olá, <strong>${name}</strong>! Aqui está o resumo ${period} da sua vida financeira no <strong>NoAzul</strong>:</p>

    <div style="display:flex;gap:12px;margin:20px 0">
      <div style="flex:1;background:#14532d;padding:16px;border-radius:8px;text-align:center">
        <div style="font-size:12px;color:#86efac">RECEITAS</div>
        <div style="font-size:20px;font-weight:bold;color:#4ade80">R$ ${fmt(summary.totalIncome)}</div>
      </div>
      <div style="flex:1;background:#450a0a;padding:16px;border-radius:8px;text-align:center">
        <div style="font-size:12px;color:#fca5a5">GASTOS</div>
        <div style="font-size:20px;font-weight:bold;color:#ef4444">R$ ${fmt(summary.totalExpense)}</div>
      </div>
      <div style="flex:1;background:${isPositive ? "#1e3a5f" : "#3b0764"};padding:16px;border-radius:8px;text-align:center">
        <div style="font-size:12px;color:#93c5fd">SALDO</div>
        <div style="font-size:20px;font-weight:bold;color:${isPositive ? "#60a5fa" : "#c084fc"}">
          ${isPositive ? "+" : ""}R$ ${fmt(summary.net)}
        </div>
      </div>
    </div>

    ${
      summary.byCategory.length > 0
        ? `
    <h3 style="margin:24px 0 8px">Gastos por categoria</h3>
    <table style="width:100%;border-collapse:collapse">
      ${categoryRows}
    </table>`
        : ""
    }

    <p style="margin-top:24px;color:#64748b;font-size:12px">
      Você recebeu este email pois tem uma conta ativa no NoAzul. 
    </p>
  </div>`;
}

export async function sendFeedbackEmail(payload: FeedbackEmailPayload) {
  const subject =
    payload.period === "semanal"
      ? "📊 Seu relatório semanal - NoAzul"
      : "📅 Seu relatório mensal - NoAzul";

  await transporter.sendMail({
    from: `"NoAzul" <${process.env.SMTP_USER}>`,
    to: payload.email, // string de email, não Date
    subject,
    html: buildEmailHtml(payload),
  });
}
