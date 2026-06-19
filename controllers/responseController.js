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

    // ✅ 1. Save to DB first
    await Response.create({
      action,
      message: message || "",
    });

    // ✅ 2. Prepare email content
    let emailSubject = "";
    let emailMessage = "";

    if (action === "accepted") {
      emailSubject = "🎉Sorry Accepted";
      emailMessage = `
😊 Bhoomi Accepted Your Sorry

💌 Bhoomi's Message:

${message || "No message"}

------------------------
Status : ACCEPTED
      `;
    } else {
      emailSubject = "😢Sorry Rejected";
      emailMessage = `
    😭Bhoomi rejected your sorry

------------------------
Status : REJECTED
      `;
    }

    // 🚀 3. SEND EMAIL IN BACKGROUND (NON-BLOCKING)
    sendEmail(emailMessage, emailSubject)
      .then(() => {
        console.log("✅ Email sent successfully");
      })
      .catch((err) => {
        console.log("❌ Email failed:", err.message);
      });

    // ⚡ 4. RETURN RESPONSE IMMEDIATELY (IMPORTANT FIX)
    return res.status(200).json({
      success: true,
      message: "Response saved successfully",
    });

  } catch (err) {
    console.log(err);

    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

export const getResponses = async (req, res) => {
  try {
    const responses = await Response.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      responses,
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};