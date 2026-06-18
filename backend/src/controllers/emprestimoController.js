const emprestimoModel = require('../models/emprestimoModel');
const livroModel = require('../models/livroModel');

function dataHoje() {
  return new Date().toISOString().slice(0, 10); // formato YYYY-MM-DD
}
function somarDias(dias) {
  const d = new Date();
  d.setDate(d.getDate() + dias);
  return d.toISOString().slice(0, 10);
}

async function listar(req, res) {
  try {
    const emprestimos = await emprestimoModel.listarAtivos();
    return res.json(emprestimos);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ erro: 'Erro ao listar empréstimos.' });
  }
}

async function criar(req, res) {
  try {
    const { leitor_id, livro_id } = req.body;
    const livro = await livroModel.buscarPorId(livro_id);
    if (!livro) return res.status(404).json({ erro: 'Livro não encontrado.' });
    if (livro.status === 'emprestado')
      return res.status(409).json({ erro: 'Este livro já está emprestado.' });

    const novo = await emprestimoModel.criar({
      leitor_id,
      livro_id,
      data_emprestimo: dataHoje(),
      data_devolucao_prevista: somarDias(14), // prazo de 14 dias
    });
    await livroModel.atualizarStatus(livro_id, 'emprestado'); // livro fica indisponível

    return res.status(201).json({ mensagem: 'Empréstimo registrado.', id: novo.id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ erro: 'Erro ao registrar empréstimo.' });
  }
}

async function devolver(req, res) {
  try {
    const { id } = req.params;
    const emprestimo = await emprestimoModel.buscarPorId(id);
    if (!emprestimo) return res.status(404).json({ erro: 'Empréstimo não encontrado.' });
    if (emprestimo.status === 'devolvido')
      return res.status(409).json({ erro: 'Este empréstimo já foi devolvido.' });

    await emprestimoModel.devolver(id, dataHoje());
    await livroModel.atualizarStatus(emprestimo.livro_id, 'disponivel'); // livro volta a ficar livre

    return res.json({ mensagem: 'Livro devolvido com sucesso.' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ erro: 'Erro ao devolver livro.' });
  }
}

module.exports = { listar, criar, devolver };