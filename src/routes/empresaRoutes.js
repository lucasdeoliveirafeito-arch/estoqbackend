import express from "express";
import { criarEmpresa, listarEmpresas } from "../controllers/empresaController.js";
import { verificarToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Criar nova empresa (apenas usuários autenticados)
router.post("/", verificarToken, criarEmpresa);

// Listar empresas (apenas admin_global)
router.get("/", verificarToken, listarEmpresas);

export default router;
