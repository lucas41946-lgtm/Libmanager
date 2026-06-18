const pool = require('../config/db');

async function listar() {
  const [linhas] = await pool.query(
    `SELECT l.id, l.titulo, l.autor, l.ano_publicacao, l.status,
            l.categoria_id, c.nome AS categoria
       FROM livros l
       LEFT JOIN categorias c ON c.id = l.categoria_id
      ORDER BY l.titulo`
  );
  return linhas;
}

async function criar({ titulo, autor, ano_publicacao, categoria_id }) {
  const [resultado] = await pool.query(
    'INSERT INTO livros (titulo, autor, ano_publicacao, categoria_id) VALUES (?, ?, ?, ?)',
    [titulo, autor, ano_publicacao, categoria_id]
  );
  return { id: resultado.insertId };
}

async function buscarPorId(id) {
  const [linhas] = await pool.query('SELECT * FROM livros WHERE id = ?', [id]);
  return linhas[0];
}

async function atualizarStatus(id, status) {
  await pool.query('UPDATE livros SET status = ? WHERE id = ?', [status, id]);
}

module.exports = { listar, criar, buscarPorId, atualizarStatus };