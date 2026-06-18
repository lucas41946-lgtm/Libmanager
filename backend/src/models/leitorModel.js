const pool = require('../config/db');

async function listar() {
  const [linhas] = await pool.query(
    'SELECT id, nome_completo, cpf, email, telefone FROM leitores ORDER BY nome_completo'
  );
  return linhas;
}

async function criar({ nome_completo, cpf, email, telefone }) {
  const [resultado] = await pool.query(
    'INSERT INTO leitores (nome_completo, cpf, email, telefone) VALUES (?, ?, ?, ?)',
    [nome_completo, cpf, email, telefone || null]
  );
  return { id: resultado.insertId };
}

module.exports = { listar, criar };