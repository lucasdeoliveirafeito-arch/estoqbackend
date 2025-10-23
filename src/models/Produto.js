import mongoose from "mongoose";

const produtoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  categoria: { type: String },
  unidade: { type: String }, // ex: kg, L, un, caixa
  preco_custo: { type: Number, default: 0 },
  preco_venda: { type: Number, default: 0 },
  estoque_atual: { type: Number, default: 0 },
  ativo: { type: Boolean, default: true },
  id_empresa: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Empresa",
    required: true
  },
  data_criacao: { type: Date, default: Date.now }
});

export const Produto = mongoose.model("Produto", produtoSchema);
