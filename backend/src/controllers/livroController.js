const livroModel = require('../models/livroModel');

async function listar(req, res) {
  try {
    const livros = await livroModel.listar();
    return res.json(livros);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ erro: 'Erro ao listar livros.' });
  }
}

async function criar(req, res) {
  try {
    const novo = await livroModel.criar(req.body);
    return res.status(201).json({ mensagem: 'Livro cadastrado.', id: novo.id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ erro: 'Erro ao cadastrar livro.' });
  }
}

module.exports = { listar, criar };