import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function NovoLeitor() {
  const navigate = useNavigate();
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const [salvando, setSalvando] = useState(false);

  async function salvar() {
    setErro(''); setSucesso(''); setSalvando(true);
    try {
      await api.post('/leitores', { nome_completo: nome, cpf, email, telefone });
      setSucesso('Leitor cadastrado com sucesso!');
      setNome(''); setCpf(''); setEmail(''); setTelefone('');
    } catch (err) {
      const detalhes = err.response?.data?.detalhes;
      setErro(detalhes ? detalhes.map((d) => d.mensagem).join(' ') : (err.response?.data?.erro || 'Erro ao cadastrar.'));
    } finally {
      setSalvando(false);
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-accent mb-6">CADASTRAR NOVO LEITOR</h1>
      <div className="bg-surface border border-edge rounded-xl p-6 max-w-2xl">
        <h2 className="font-semibold mb-4">Formulário de Cadastro de Usuário</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-slate-400 mb-1">Nome Completo</label>
            <input value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Digite o nome completo"
              className="w-full bg-base border border-edge rounded-md px-3 py-2 text-sm outline-none focus:border-accent" />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1">CPF</label>
            <input value={cpf} onChange={(e) => setCpf(e.target.value)} placeholder="Ex: 000.000.000-00"
              className="w-full bg-base border border-edge rounded-md px-3 py-2 text-sm outline-none focus:border-accent" />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1">E-mail</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Digite o e-mail"
              className="w-full bg-base border border-edge rounded-md px-3 py-2 text-sm outline-none focus:border-accent" />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1">Telefone/WhatsApp</label>
            <input value={telefone} onChange={(e) => setTelefone(e.target.value)} placeholder="(11) 99999-9999"
              className="w-full bg-base border border-edge rounded-md px-3 py-2 text-sm outline-none focus:border-accent" />
          </div>
        </div>
        {erro && <p className="text-sm text-red-400 mt-4">{erro}</p>}
        {sucesso && <p className="text-sm text-green-400 mt-4">{sucesso}</p>}
        <div className="flex gap-3 mt-5">
          <button onClick={salvar} disabled={salvando}
            className="bg-accent text-base font-semibold px-5 py-2 rounded-md hover:opacity-90 transition disabled:opacity-60">
            {salvando ? 'Salvando...' : 'Salvar Leitor'}
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