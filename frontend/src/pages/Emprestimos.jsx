import { useEffect, useState } from 'react';
import api from '../api/axios';

export default function Emprestimos() {
  const [emprestimos, setEmprestimos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  async function carregar() {
    setErro('');
    try {
      const { data } = await api.get('/emprestimos');
      setEmprestimos(data);
    } catch (err) {
      setErro('Erro ao carregar empréstimos.');
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => { carregar(); }, []);

  async function devolver(id) {
    try {
      await api.patch(`/emprestimos/${id}/devolver`);
      carregar();
    } catch (err) {
      alert(err.response?.data?.erro || 'Erro ao devolver.');
    }
  }

  const fmt = (d) => (d ? String(d).slice(0, 10) : '-');

  return (
    <div>
      <h1 className="text-2xl font-bold text-accent mb-1">Gestão de Empréstimos</h1>
      <p className="text-xs text-green-400 mb-6">Dados relacionais exibidos via INNER JOIN.</p>

      <div className="bg-surface border border-edge rounded-xl p-5">
        {carregando && <p className="text-slate-400 text-sm">Carregando...</p>}
        {erro && <p className="text-red-400 text-sm">{erro}</p>}

        {!carregando && !erro && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-accent text-left border-b border-edge">
                  <th className="py-2 pr-4 font-medium">Aluno (Nome Completo)</th>
                  <th className="py-2 pr-4 font-medium">Título do Livro</th>
                  <th className="py-2 pr-4 font-medium">Data do Empréstimo</th>
                  <th className="py-2 pr-4 font-medium">Devolução Prevista</th>
                  <th className="py-2 pr-4 font-medium">Ação</th>
                </tr>
              </thead>
              <tbody>
                {emprestimos.map((e) => (
                  <tr key={e.id} className="border-b border-edge/50">
                    <td className="py-3 pr-4">{e.aluno}</td>
                    <td className="py-3 pr-4 text-slate-300">{e.titulo_livro}</td>
                    <td className="py-3 pr-4 text-slate-300">{fmt(e.data_emprestimo)}</td>
                    <td className="py-3 pr-4 text-slate-300">{fmt(e.data_devolucao_prevista)}</td>
                    <td className="py-3 pr-4">
                      <button onClick={() => devolver(e.id)}
                        className="text-xs font-semibold bg-pink-500/90 hover:bg-pink-500 text-white px-3 py-1 rounded">
                        Devolver
                      </button>
                    </td>
                  </tr>
                ))}
                {emprestimos.length === 0 && (
                  <tr><td colSpan={5} className="py-6 text-center text-slate-500">Nenhum empréstimo ativo.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}