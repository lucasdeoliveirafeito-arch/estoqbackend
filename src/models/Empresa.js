import mongoose from "mongoose";

const empresaSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  cnpj: { type: String },
  data_criacao: { type: Date, default: Date.now },
  ativo: { type: Boolean, default: true }
});

export const Empresa = mongoose.model("Empresa", empresaSchema);
