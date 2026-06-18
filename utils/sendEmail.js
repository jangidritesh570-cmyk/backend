import dotenv from "dotenv";
dotenv.config();

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);


export const sendEmail = async (message) => {
  try {

    console.log("EMAIL SENDING...");

    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "jangidritesh570@gmail.com",
      subject: "❤️ Bhoomi Accepted Your Sorry",
      text: message,
    });


    console.log("EMAIL SENT:", data);


  } catch (error) {

    console.log("EMAIL ERROR:", error);

    throw error;

  }
};