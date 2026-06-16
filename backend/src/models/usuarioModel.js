const pool = require('../config/db');

async function buscarPorEmail(email) {
  const [linhas] = await pool.query(
    'SELECT * FROM usuarios WHERE email = ? LIMIT 1',
    [email]
  );
  return linhas[0];
}

async function criar({ nome, email, senhaHash }) {
  const [resultado] = await pool.query(
    'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)',
    [nome, email, senhaHash]
  );
  return { id: resultado.insertId, nome, email };
}

module.exports = { buscarPorEmail, criar };