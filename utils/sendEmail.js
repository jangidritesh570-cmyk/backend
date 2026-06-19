import dotenv from "dotenv";
dotenv.config();

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (message, subject) => {
  console.log("📧 EMAIL SENDING...");

  const data = await resend.emails.send({
    from: "Bhoomi App <onboarding@resend.dev>",
    to: "jangidritesh570@gmail.com",
    reply_to: "jangidritesh570@gmail.com",
    subject,

    // 🔥 IMPORTANT: HTML improves inbox chance slightly
    html: `
      <div style="font-family: Arial; padding: 10px;">
        <h2>${subject}</h2>
        <pre style="font-size: 14px;">${message}</pre>
      </div>
    `,
  });

  console.log("📧 EMAIL SENT:", data);
  return data;
};