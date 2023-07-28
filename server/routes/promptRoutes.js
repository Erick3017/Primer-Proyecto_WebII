import express from "express";
import { verifyAuthorization } from "../verifyToken.js";
import {
  createPrompt,
  updatePrompt,
  deletePrompt,
  getPrompt,
  getPromptsByUser,
} from "../controllers/promptControllers.js";

const router = express.Router();

// Rutas que no requieren autenticación
router.get("/", getPrompt);
router.get("/:iduser", getPromptsByUser);

// Rutas que requieren autenticación
router.use(verifyAuthorization);
router.post("/", createPrompt);
router.put("/:id", updatePrompt);
router.delete("/:id", deletePrompt);

export default router;
