import Response from "../models/Response.js";
import { sendEmail } from "../utils/sendEmail.js";

export const saveResponse = async (req, res) => {
  try {
    const { action, message } = req.body;

    if (!action) {
      return res.status(400).json({
        success: false,
        error: "Action required",
      });
    }

    await Response.create({
      action,
      message: message || "",
    });

    let emailMessage = "";

    if (action === "accepted") {
      emailMessage = `
 😊Bhoomi Accepted Your Sorry 

💌 Bhoomi's Message:

${message}

------------------------
Status : ACCEPTED
      `;
    } else {
      emailMessage = `
😢 Bhoomi Rejected Your Sorry
      `;
    }

    await sendEmail(emailMessage);

    res.status(200).json({
      success: true,
      message: "Response saved and email sent",
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

export const getResponses = async (req, res) => {
  try {
    const responses = await Response.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      responses,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};