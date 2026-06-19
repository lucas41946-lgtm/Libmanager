import { useEffect, useState } from 'react';
import api from '../api/axios';

export default function Dashboard() {
  const [livros, setLivros] = useState([]);
  const [leitores, setLeitores] = useState([]);
  const [leitorSelecionado, setLeitorSelecionado] = useState('');
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  async function carregar() {
    setErro('');
    try {
      const [resLivros, resLeitores] = await Promise.all([
        api.get('/livros'),
        api.get('/leitores'),
      ]);
      setLivros(resLivros.data);
      setLeitores(resLeitores.data);
      // por padrão já seleciona o primeiro, mas você pode trocar
      if (resLeitores.data.length > 0) {
        setLeitorSelecionado((prev) => prev || String(resLeitores.data[0].id));
      }
    } catch (err) {
      setErro('Erro ao carregar o acervo. Verifique se o servidor está rodando.');
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregar();
  }, []);

  async function emprestar(livro) {
    if (!leitorSelecionado) {
      alert('Cadastre e selecione um leitor antes de emprestar.');
      return;
    }
    try {
      // agora usa o leitor ESCOLHIDO no seletor
      await api.post('/emprestimos', {
        leitor_id: Number(leitorSelecionado),
        livro_id: livro.id,
      });
      carregar();
    } catch (err) {
      alert(err.response?.data?.erro || 'Erro ao emprestar.');
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-accent mb-6">DASHBOARD DO BIBLIOTECÁRIO</h1>

      <div className="bg-surface border border-edge rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold">Acervo de Livros</h2>
          <span className="text-sm text-accent">{livros.length} Livros Cadastrados</span>
        </div>

        {/* escolha de quem vai pegar o livro emprestado */}
        <div className="flex items-center gap-2 mb-4 text-sm">
          <span className="text-slate-400">Emprestar para:</span>
          <select
            value={leitorSelecionado}
            onChange={(e) => setLeitorSelecionado(e.target.value)}
            className="bg-base border border-edge rounded-md px-3 py-1.5 text-sm outline-none focus:border-accent"
          >
            <option value="">Selecione um leitor</option>
            {leitores.map((l) => (
              <option key={l.id} value={l.id}>{l.nome_completo}</option>
            ))}
          </select>
        </div>

        {carregando && <p className="text-slate-400 text-sm">Carregando...</p>}
        {erro && <p className="text-red-400 text-sm">{erro}</p>}

        {!carregando && !erro && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-accent text-left border-b border-edge">
                  <th className="py-2 pr-4 font-medium">Título</th>
                  <th className="py-2 pr-4 font-medium">Autor</th>
                  <th className="py-2 pr-4 font-medium">Ano</th>
                  <th className="py-2 pr-4 font-medium">Status</th>
                  <th className="py-2 pr-4 font-medium">Ação</th>
                </tr>
              </thead>
              <tbody>
                {livros.map((livro) => (
                  <tr key={livro.id} className="border-b border-edge/50">
                    <td className="py-3 pr-4">{livro.titulo}</td>
                    <td className="py-3 pr-4 text-slate-300">{livro.autor}</td>
                    <td className="py-3 pr-4 text-slate-300">{livro.ano_publicacao}</td>
                    <td className="py-3 pr-4">
                      {livro.status === 'disponivel'
                        ? <span className="text-green-400">Disponível</span>
                        : <span className="text-red-400">Emprestado</span>}
                    </td>
                    <td className="py-3 pr-4">
                      {livro.status === 'disponivel' ? (
                        <button onClick={() => emprestar(livro)}
                          className="text-xs font-semibold bg-pink-500/90 hover:bg-pink-500 text-white px-3 py-1 rounded">
                          EMPRESTAR
                        </button>
                      ) : (
                        <span className="text-xs font-semibold bg-edge text-slate-400 px-3 py-1 rounded">INDISPONÍVEL</span>
                      )}
                    </td>
                  </tr>
                ))}
                {livros.length === 0 && (
                  <tr><td colSpan={5} className="py-6 text-center text-slate-500">Nenhum livro cadastrado ainda.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}