import dotenv from "dotenv";
dotenv.config();

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,

  family: 4,

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },

  connectionTimeout: 60000,
  greetingTimeout: 60000,
  socketTimeout: 60000,

  logger: true,
  debug: true,
});


export const sendEmail = async (message) => {
  try {

    console.log("EMAIL USER:", process.env.EMAIL_USER);

    await transporter.verify();

    console.log("SMTP READY");


    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "jangidritesh570@gmail.com",
      subject: "❤️ Bhoomi Accepted Your Sorry",
      text: message,
    });


    console.log("EMAIL SENT:", info.messageId);


  } catch (error) {

    console.log("EMAIL ERROR:", error);

    throw error;

  }
};