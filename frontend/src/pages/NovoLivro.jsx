import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function NovoLivro() {
  const navigate = useNavigate();
  const [categorias, setCategorias] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [categoriaId, setCategoriaId] = useState('');
  const [ano, setAno] = useState(new Date().getFullYear());
  const [erro, setErro] = useState('');
  const [salvando, setSalvando] = useState(false);

  // carrega as categorias do banco pra preencher o <select>
  useEffect(() => {
    api.get('/categorias')
      .then((res) => setCategorias(res.data))
      .catch(() => setErro('Erro ao carregar categorias.'));
  }, []);

  async function salvar() {
    setErro('');
    setSalvando(true);
    try {
      await api.post('/livros', {
        titulo, autor, categoria_id: categoriaId, ano_publicacao: ano,
      });
      navigate('/'); // volta ao dashboard
    } catch (err) {
      const detalhes = err.response?.data?.detalhes; // erros do Zod
      setErro(detalhes ? detalhes.map((d) => d.mensagem).join(' ') : (err.response?.data?.erro || 'Erro ao salvar.'));
    } finally {
      setSalvando(false);
    }
  }

  return (
    <div className="max-w-lg">
      <h1 className="text-xl font-bold mb-6">Cadastrar Novo Livro</h1>
      <div className="bg-surface border border-edge rounded-xl p-6 flex flex-col gap-4">
        <div>
          <label className="block text-sm text-slate-400 mb-1">Título</label>
          <input value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder="Digite o título do livro"
            className="w-full bg-base border border-edge rounded-md px-3 py-2 text-sm outline-none focus:border-accent" />
        </div>
        <div>
          <label className="block text-sm text-slate-400 mb-1">Autor</label>
          <input value={autor} onChange={(e) => setAutor(e.target.value)} placeholder="Digite o nome do autor"
            className="w-full bg-base border border-edge rounded-md px-3 py-2 text-sm outline-none focus:border-accent" />
        </div>
        <div>
          <label className="block text-sm text-slate-400 mb-1">Categoria</label>
          <select value={categoriaId} onChange={(e) => setCategoriaId(e.target.value)}
            className="w-full bg-base border border-edge rounded-md px-3 py-2 text-sm outline-none focus:border-accent">
            <option value="">Selecione a categoria</option>
            {categorias.map((c) => <option key={c.id} value={c.id}>{c.nome}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm text-slate-400 mb-1">Ano de Publicação</label>
          <input type="number" value={ano} onChange={(e) => setAno(e.target.value)}
            className="w-full bg-base border border-edge rounded-md px-3 py-2 text-sm outline-none focus:border-accent" />
        </div>
        {erro && <p className="text-sm text-red-400">{erro}</p>}
        <div className="flex gap-3 mt-2">
          <button onClick={salvar} disabled={salvando}
            className="bg-accent text-base font-semibold px-5 py-2 rounded-md hover:opacity-90 transition disabled:opacity-60">
            {salvando ? 'Salvando...' : 'Salvar'}
          </button>
          <button onClick={() => navigate('/')}
            className="bg-edge text-slate-200 px-5 py-2 rounded-md hover:bg-edge/70 transition">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}