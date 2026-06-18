import mongoose from "mongoose";

const responseSchema = new mongoose.Schema(
  {
    action: {
      type: String,
      enum: ["accepted", "not_yet"],
      required: true,
    },
    message: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Response", responseSchema);