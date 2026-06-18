import dotenv from "dotenv";
dotenv.config();

import nodemailer from "nodemailer";


const transporter = nodemailer.createTransport({

  host: "smtp.gmail.com",

  port: 587,

  secure: false,

  requireTLS: true,

  auth: {

    user: process.env.EMAIL_USER,

    pass: process.env.EMAIL_PASS,

  },

});


export const sendEmail = async(message)=>{

  try{


    await transporter.verify();

    console.log("SMTP READY");


    await transporter.sendMail({

      from: process.env.EMAIL_USER,

      to: "jangidritesh570@gmail.com",

      subject:"❤️ Bhoomi Response",

      text:message,

    });


    console.log("EMAIL SENT");


  }
  catch(err){

    console.log("EMAIL ERROR:",err.message);

    throw err;

  }

};