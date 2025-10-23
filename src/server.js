import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import empresaRoutes from "./routes/empresaRoutes.js";
import produtoRoutes from "./routes/produtoRoutes.js";



dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Conexão com o MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado ao MongoDB com sucesso"))
  .catch((error) => console.error("❌ Erro ao conectar ao MongoDB:", error));

// Rotas
app.use("/api", authRoutes);
app.use("/api/empresa", empresaRoutes);
app.use("/api/produto", produtoRoutes);



// Rota de teste
app.get("/", (req, res) => {
  res.send("🚀 API Estoq rodando com sucesso!");
});

import { verificarToken } from "./middleware/authMiddleware.js";

app.get("/api/privado", verificarToken, (req, res) => {
  res.json({
    message: `Olá ${req.usuario.tipo_usuario}, você acessou uma rota protegida!`,
    usuario: req.usuario
  });
});


// Inicialização do servidor
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
