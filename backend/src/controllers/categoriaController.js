const categoriaModel = require('../models/categoriaModel');

async function listar(req, res) {
  try {
    const categorias = await categoriaModel.listar();
    return res.json(categorias);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ erro: 'Erro ao listar categorias.' });
  }
}

module.exports = { listar };