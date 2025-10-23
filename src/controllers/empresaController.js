import { Empresa } from "../models/Empresa.js";

// Criar nova empresa
export const criarEmpresa = async (req, res) => {
  try {
    const { nome, cnpj } = req.body;

    if (!nome) {
      return res.status(400).json({ message: "O nome da empresa é obrigatório." });
    }

    const novaEmpresa = await Empresa.create({ nome, cnpj });
    res.status(201).json({
      message: "Empresa criada com sucesso!",
      empresa: novaEmpresa
    });
  } catch (error) {
    console.error("Erro ao criar empresa:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
};

// Listar todas as empresas
export const listarEmpresas = async (req, res) => {
  try {
    const empresas = await Empresa.find();
    res.status(200).json(empresas);
  } catch (error) {
    console.error("Erro ao listar empresas:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
};
