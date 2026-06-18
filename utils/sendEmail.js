import dotenv from "dotenv";
dotenv.config();

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  pool: true,
});

export const sendEmail = async (message) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "jangidritesh570@gmail.com",
      subject: "Bhoomi Response",
      text: message,
      html: `
        <h2>Bhoomi Response</h2>
        <pre>${message}</pre>
      `,
    });

    console.log("EMAIL SENT");
  } catch (err) {
    console.log("EMAIL ERROR:", err.message);
  }
};