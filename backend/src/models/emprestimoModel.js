const pool = require('../config/db');

async function listarAtivos() {
  // INNER JOIN: junta empréstimos + leitores + livros pelas chaves estrangeiras
  const [linhas] = await pool.query(
    `SELECT e.id,
            le.nome_completo AS aluno,
            li.titulo        AS titulo_livro,
            e.data_emprestimo,
            e.data_devolucao_prevista,
            e.status
       FROM emprestimos e
       INNER JOIN leitores le ON le.id = e.leitor_id
       INNER JOIN livros   li ON li.id = e.livro_id
      WHERE e.status = 'ativo'
      ORDER BY e.data_emprestimo DESC`
  );
  return linhas;
}

async function criar({ leitor_id, livro_id, data_emprestimo, data_devolucao_prevista }) {
  const [resultado] = await pool.query(
    `INSERT INTO emprestimos
       (leitor_id, livro_id, data_emprestimo, data_devolucao_prevista, status)
     VALUES (?, ?, ?, ?, 'ativo')`,
    [leitor_id, livro_id, data_emprestimo, data_devolucao_prevista]
  );
  return { id: resultado.insertId };
}

async function buscarPorId(id) {
  const [linhas] = await pool.query('SELECT * FROM emprestimos WHERE id = ?', [id]);
  return linhas[0];
}

async function devolver(id, data_devolucao_real) {
  await pool.query(
    `UPDATE emprestimos SET status = 'devolvido', data_devolucao_real = ? WHERE id = ?`,
    [data_devolucao_real, id]
  );
}

module.exports = { listarAtivos, criar, buscarPorId, devolver };