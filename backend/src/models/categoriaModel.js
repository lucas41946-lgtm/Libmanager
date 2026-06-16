const pool = require('../config/db');

async function listar() {
  const [linhas] = await pool.query('SELECT id, nome FROM categorias ORDER BY nome');
  return linhas;
}

module.exports = { listar };