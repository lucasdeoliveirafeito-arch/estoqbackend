import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { Empresa } from "../models/Empresa.js";

// Função para gerar token JWT
const gerarToken = (id, tipo_usuario, id_empresa) => {
  return jwt.sign(
    { id, tipo_usuario, id_empresa },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};


// Cadastrar usuário
export const registrarUsuario = async (req, res) => {
  try {
    const { nome, email, senha, tipo_usuario, empresa_nome, cnpj } = req.body;

    // Verifica se o usuário já existe
    const usuarioExistente = await User.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ message: "Usuário já cadastrado." });
    }

    // Cria ou vincula empresa
    let empresa = null;
    if (empresa_nome) {
      empresa = await Empresa.findOne({ nome: empresa_nome });
      if (!empresa) {
        empresa = await Empresa.create({ nome: empresa_nome, cnpj });
      }
    }

    // Criptografa a senha
    const senhaCriptografada = await bcrypt.hash(senha, 10);

    // Cria o usuário com vínculo de empresa
    const novoUsuario = await User.create({
      nome,
      email,
      senha: senhaCriptografada,
      tipo_usuario: tipo_usuario || "usuario",
      id_empresa: empresa ? empresa._id : null
    });

    res.status(201).json({
      message: "Usuário cadastrado com sucesso!",
      usuario: {
        id: novoUsuario._id,
        nome: novoUsuario.nome,
        email: novoUsuario.email,
        empresa: empresa ? empresa.nome : "Nenhuma"
      }
    });
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
};

// Login de usuário
export const loginUsuario = async (req, res) => {
  try {
    const { email, senha } = req.body;

    const usuario = await User.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ message: "Usuário não encontrado." });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(400).json({ message: "Senha incorreta." });
    }

    const token = gerarToken(usuario._id, usuario.tipo_usuario, usuario.id_empresa);

    res.status(200).json({
      message: "Login realizado com sucesso!",
      token,
      usuario: {
        id: usuario._id,
        nome: usuario.nome,
        tipo_usuario: usuario.tipo_usuario,
        id_empresa: usuario.id_empresa
      }
    });
  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
};
