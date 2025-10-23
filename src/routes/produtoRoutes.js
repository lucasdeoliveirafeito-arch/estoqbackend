import express from "express";
import {
  criarProduto,
  listarProdutos,
  atualizarProduto,
  excluirProduto
} from "../controllers/produtoController.js";
import { verificarToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Todas as rotas de produto exigem login (token JWT)
router.post("/", verificarToken, criarProduto);
router.get("/", verificarToken, listarProdutos);
router.patch("/:id", verificarToken, atualizarProduto);
router.delete("/:id", verificarToken, excluirProduto);

export default router;
