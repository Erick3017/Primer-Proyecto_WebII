import express from "express";
import {
  updateUser,
  getUser,
  deleteUser,
  getUsers,
  registerUser,
} from "../controllers/userControllers.js";

const router = express.Router();

// Rutas protegidas que requieren autenticación de administrador
router.post("/", registerUser);
router.put("/:id",updateUser);
router.delete("/:id",deleteUser);
router.get("/",getUsers);

// Ruta que permite a los usuarios autenticados acceder a su propia información
router.get("/:id", getUser);

export default router;
