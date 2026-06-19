import { NavLink, useNavigate } from 'react-router-dom';
import { BookOpen, Home, PlusCircle, Users, ClipboardList, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const itens = [
  { to: '/', label: 'Início', icon: Home, end: true },
  { to: '/livros/novo', label: 'Novo Livro', icon: PlusCircle },
  { to: '/leitores/novo', label: 'Gestão de Usuários', icon: Users },
  { to: '/emprestimos', label: 'Empréstimos', icon: ClipboardList },
];

export default function Sidebar() {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  function sair() {
    logout();
    navigate('/login');
  }

  return (
    <aside className="w-60 shrink-0 bg-surface border-r border-edge min-h-screen p-5 flex flex-col">
      <div className="flex items-center gap-2 mb-8">
        <BookOpen className="text-accent" size={22} />
        <span className="font-semibold text-lg">LibManager</span>
      </div>

      <nav className="flex flex-col gap-1 flex-1">
        {itens.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={label}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md text-sm transition ${
                isActive
                  ? 'text-accent font-medium'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-edge/50'
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-edge pt-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-full bg-accent/20 text-accent flex items-center justify-center text-sm font-bold">
            {usuario?.nome?.charAt(0) || 'B'}
          </div>
          <div className="text-sm">
            <div className="font-medium">{usuario?.nome}</div>
            <div className="text-xs text-slate-500">Bibliotecário</div>
          </div>
        </div>
        <button onClick={sair} className="flex items-center gap-2 text-sm text-slate-400 hover:text-red-400 transition">
          <LogOut size={16} /> Sair
        </button>
      </div>
    </aside>
  );
}