const leitorModel = require('../models/leitorModel');

async function listar(req, res) {
  try {
    const leitores = await leitorModel.listar();
    return res.json(leitores);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ erro: 'Erro ao listar leitores.' });
  }
}

async function criar(req, res) {
  try {
    const novo = await leitorModel.criar(req.body);
    return res.status(201).json({ mensagem: 'Leitor cadastrado.', id: novo.id });
  } catch (err) {
    // CPF duplicado viola a chave UNIQUE do banco -> erro amigável
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ erro: 'Já existe um leitor com este CPF.' });
    }
    console.error(err);
    return res.status(500).json({ erro: 'Erro ao cadastrar leitor.' });
  }
}

module.exports = { listar, criar };