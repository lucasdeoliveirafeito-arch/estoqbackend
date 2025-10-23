import { Produto } from "../models/Produto.js";

// Criar produto
export const criarProduto = async (req, res) => {
  try {
    const { nome, categoria, unidade, preco_custo, preco_venda, estoque_atual } = req.body;

    if (!nome) {
      return res.status(400).json({ message: "O nome do produto é obrigatório." });
    }

    // Pega a empresa do usuário logado (via token)
    const id_empresa = req.usuario.id_empresa;

    if (!id_empresa) {
      return res.status(403).json({ message: "Usuário não vinculado a uma empresa." });
    }

    const novoProduto = await Produto.create({
      nome,
      categoria,
      unidade,
      preco_custo,
      preco_venda,
      estoque_atual,
      id_empresa
    });

    res.status(201).json({
      message: "Produto criado com sucesso!",
      produto: novoProduto
    });
  } catch (error) {
    console.error("Erro ao criar produto:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
};

// Listar produtos da empresa do usuário logado
export const listarProdutos = async (req, res) => {
  try {
    const id_empresa = req.usuario.id_empresa;
    const produtos = await Produto.find({ id_empresa });
    res.status(200).json(produtos);
  } catch (error) {
    console.error("Erro ao listar produtos:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
};

// Atualizar produto
export const atualizarProduto = async (req, res) => {
  try {
    const { id } = req.params;
    const produtoAtualizado = await Produto.findByIdAndUpdate(id, req.body, { new: true });
    if (!produtoAtualizado) {
      return res.status(404).json({ message: "Produto não encontrado." });
    }
    res.status(200).json({ message: "Produto atualizado com sucesso!", produto: produtoAtualizado });
  } catch (error) {
    console.error("Erro ao atualizar produto:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
};

// Excluir produto
export const excluirProduto = async (req, res) => {
  try {
    const { id } = req.params;
    const produtoRemovido = await Produto.findByIdAndDelete(id);
    if (!produtoRemovido) {
      return res.status(404).json({ message: "Produto não encontrado." });
    }
    res.status(200).json({ message: "Produto excluído com sucesso!" });
  } catch (error) {
    console.error("Erro ao excluir produto:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
};
