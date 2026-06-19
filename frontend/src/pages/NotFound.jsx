import { useNavigate } from 'react-router-dom';
import { LibraryBig } from 'lucide-react';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-base flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        <h1 className="text-3xl font-bold mb-6">Oops! Algo deu errado.</h1>
        <div className="flex justify-center mb-6 text-slate-500">
          <LibraryBig size={90} />
        </div>
        <h2 className="text-xl font-semibold mb-6">Acesso Negado ou Página não Encontrada.</h2>
        <button onClick={() => navigate('/')}
          className="bg-accent text-base font-semibold px-6 py-2.5 rounded-md hover:opacity-90 transition">
          Voltar ao Início
        </button>
        <p className="text-sm text-slate-500 mt-8">Tratamento de exceções e feedback de permissão (401 / 403 / 404).</p>
      </div>
    </div>
  );
}