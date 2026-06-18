import express from "express";
import {
  saveResponse,
  getResponses,
} from "../controllers/responseController.js";

const router = express.Router();

router.post("/respond", saveResponse);
router.get("/responses", getResponses);

export default router;