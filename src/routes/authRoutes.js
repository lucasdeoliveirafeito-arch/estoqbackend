import express from "express";
import { registrarUsuario, loginUsuario } from "../controllers/authController.js";

const router = express.Router();

// Rota de cadastro
router.post("/register", registrarUsuario);

// Rota de login
router.post("/login", loginUsuario);

export default router;
