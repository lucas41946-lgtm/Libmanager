import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  async function handleSubmit() {
    setErro('');
    setCarregando(true);
    try {
      await login(email, senha);
      navigate('/'); // redireciona pro dashboard
    } catch (err) {
      setErro(err.response?.data?.erro || 'Não foi possível entrar.');
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-surface border border-edge rounded-xl p-8">
        <h1 className="text-2xl font-semibold text-center mb-1 text-accent">LibManager</h1>
        <p className="text-center text-slate-400 mb-6">Login do Bibliotecário</p>

        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sm text-slate-400 mb-1">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="bibliotecario@biblioteca.com"
              className="w-full bg-base border border-edge rounded-md px-3 py-2 text-sm outline-none focus:border-accent"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1">Senha</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              placeholder="Digite sua senha"
              className="w-full bg-base border border-edge rounded-md px-3 py-2 text-sm outline-none focus:border-accent"
            />
          </div>

          {erro && <p className="text-sm text-red-400">{erro}</p>}

          <button
            onClick={handleSubmit}
            disabled={carregando}
            className="w-full bg-accent text-base font-semibold rounded-md py-2.5 hover:opacity-90 transition disabled:opacity-60"
          >
            {carregando ? 'Entrando...' : 'Entrar'}
          </button>
        </div>
      </div>
    </div>
  );
}