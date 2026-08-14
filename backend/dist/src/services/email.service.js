export async function sendVerificationEmail({ to, code, userName, }) {
    const name = userName ?? "usuário";
    // ── Formato do e-mail
    const subject = `Seu código de acesso: ${code}`;
    const html = `
    <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px 24px">
      <h2 style="margin:0 0 8px;font-size:20px;color:#1a1a1a">Olá, ${name}!</h2>
      <p style="color:#555;margin:0 0 24px">
        Use o código abaixo para acessar sua conta. Ele expira em <strong>10 minutos</strong>.
      </p>
      <div style="background:#f5f5f5;border-radius:12px;padding:24px;text-align:center;letter-spacing:8px;font-size:36px;font-weight:700;color:#1a1a1a">
        ${code}
      </div>
      <p style="color:#aaa;font-size:12px;margin:24px 0 0">
        Se você não solicitou este código, ignore este e-mail.
      </p>
    </div>
  `;
    // ── Transport
    // Opção A: Nodemailer SMTP (padrão)
    await sendViaSMTP({ to, subject, html });
    // Opção B: Resend — descomente e instale `resend`
    // await sendViaResend({ to, subject, html })
}
// ── Nodemailer
async function sendViaSMTP({ to, subject, html, }) {
    // Importação dinâmica para não quebrar se não tiver nodemailer instalado
    const nodemailer = await import("nodemailer").catch(() => {
        throw new Error("Instale nodemailer: npm install nodemailer @types/nodemailer");
    });
    const transport = nodemailer.createTransport({
        host: process.env.SMTP_HOST ?? "smtp.mailtrap.io",
        port: Number(process.env.SMTP_PORT ?? 587),
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });
    await transport.sendMail({
        from: process.env.SMTP_FROM ?? '"App Gastos" <noreply@seuapp.com>',
        to,
        subject,
        html,
    });
}
export async function sendDeleteWarningEmail({ to, userName, expiresAt, }) {
    const name = userName ?? "usuário";
    const dateStr = expiresAt.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
    const subject = "Sua conta será excluída em breve";
    const html = `
    <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px 24px">
      <h2 style="margin:0 0 8px;font-size:20px;color:#1a1a1a">Olá, ${name}</h2>
      <p style="color:#555;margin:0 0 16px">
        Recebemos uma solicitação para excluir sua conta.
        Ela será <strong>permanentemente deletada</strong> em:
      </p>
      <div style="background:#fef2f2;border:1px solid #fca5a5;border-radius:12px;padding:20px;text-align:center;font-size:20px;font-weight:700;color:#dc2626">
        ${dateStr}
      </div>
      <p style="color:#555;margin:16px 0 24px">
        Se você mudar de ideia, pode reativar sua conta acessando o app
        e confirmando sua identidade por e-mail antes dessa data.
      </p>
      <p style="color:#aaa;font-size:12px;margin:0">
        Se você não solicitou isso, entre em contato com o suporte imediatamente.
      </p>
    </div>
  `;
    await sendViaSMTP({ to, subject, html });
}
export async function sendReactivateCodeEmail({ to, userName, code, }) {
    const name = userName ?? "usuário";
    const subject = `Código de reativação: ${code}`;
    const html = `
    <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px 24px">
      <h2 style="margin:0 0 8px;font-size:20px;color:#1a1a1a">Reativar conta, ${name}</h2>
      <p style="color:#555;margin:0 0 24px">
        Use o código abaixo para reativar sua conta. Ele expira em <strong>10 minutos</strong>.
      </p>
      <div style="background:#f0fdf4;border:1px solid #86efac;border-radius:12px;padding:24px;text-align:center;letter-spacing:8px;font-size:36px;font-weight:700;color:#16a34a">
        ${code}
      </div>
      <p style="color:#aaa;font-size:12px;margin:24px 0 0">
        Se você não solicitou a reativação, ignore este e-mail.
      </p>
    </div>
  `;
    await sendViaSMTP({ to, subject, html });
}
// ── Resend (alternativa moderna) ─────────────────────────────────────────────
// async function sendViaResend({ to, subject, html }: { to: string; subject: string; html: string }) {
//   const { Resend } = await import('resend')
//   const resend = new Resend(process.env.RESEND_API_KEY)
//   await resend.emails.send({ from: 'App Gastos <noreply@seuapp.com>', to, subject, html })
// }
//# sourceMappingURL=email.service.js.map