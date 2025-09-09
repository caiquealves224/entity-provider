import { MailtrapClient } from "mailtrap";
import { env } from "../../utils/env.ts";
import { VERIFICATION_EMAIL_TEMPLATE } from "./mailtrap.templates.ts";

// Cliente configurado para sandbox (testing)
const client = new MailtrapClient({
  token: env.MAILTRAP_API_TOKEN,
  testInboxId: 4017800,
  accountId: env.MAILTRAP_ACCOUNT_ID,
  sandbox: true,
});


const sender = {
  email: env.MAILTRAP_SENDER_EMAIL,
  name: env.MAILTRAP_SENDER_NAME,
};

export async function sendEmail({ to, subject, category, html }: { to: string; subject: string; category: string; html: string }) {
  try {
    // Para sandbox, usamos o método send diretamente
    const response = await client.send({
      from: sender,
      to: [{ email: "caiquealves224@gmail.com" }],
      subject,
      category,
      html,
    });
    
    console.log('Email enviado com sucesso:', response);
    return response;
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    throw error;
  }
}

const replacePlaceholders = (template: string, placeholders: Record<string, string>) => {
  let result = template;
  for (const [key, value] of Object.entries(placeholders)) {
    const regex = new RegExp(`{${key}}`, 'g');
    result = result.replace(regex, value);
  }
  return result;
};

export async function sendVerificationEmail(to: string, verificationCode: string) {
  const subject = "Verify Your Email";
  const html = replacePlaceholders(VERIFICATION_EMAIL_TEMPLATE, {
    verificationCode,
    company: env.MAILTRAP_COMPANY_NAME,
  });

  return sendEmail({ to: 'TODO', subject, category: "verification", html });
}