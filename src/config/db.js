import mongoose from "mongoose";

export async function connectDB() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI não definido no .env");
    }
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Conectado ao MongoDB com sucesso");
  } catch (err) {
    console.error("❌ Erro ao conectar ao MongoDB:", err.message);
    process.exit(1);
  }
}
