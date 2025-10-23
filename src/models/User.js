import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  tipo_usuario: { type: String, enum: ["usuario", "admin_empresa", "admin_global"], default: "usuario" },
  id_empresa: { type: String, default: null },
  criado_em: { type: Date, default: Date.now }
});

export const User = mongoose.model("User", userSchema);
