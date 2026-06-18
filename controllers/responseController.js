import Response from "../models/Response.js";
import { sendEmail } from "../utils/sendEmail.js";

export const saveResponse = async (req, res) => {
  try {
    const { action, message } = req.body;

    await Response.create({
      action,
      message,
    });

    let emailMessage = "";

    if (action === "accepted") {
      emailMessage = `
  Bhoomi Accepted😊

Message:
${message}
`;
    } else {
      emailMessage = `
  Bhoomi Rejected😢

Message:
${message}
`;
    }

    await sendEmail(emailMessage);

    res.json({
      success: true,
      message: "Response saved",
    });

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

export const getResponses = async (req, res) => {
  try {
    const responses = await Response.find().sort({ createdAt: -1 });

    res.json({ success: true, responses });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};