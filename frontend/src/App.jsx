import { Routes, Route } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';

// placeholder temporário — vira o Dashboard no próximo passo
function Home() {
  const { usuario, logout } = useAuth();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold text-accent">Bem-vindo, {usuario?.nome}!</h1>
      <p className="text-slate-400">Login funcionando — token guardado.</p>
      <button onClick={logout} className="bg-edge px-4 py-2 rounded-md">Sair</button>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}