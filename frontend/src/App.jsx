import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import NovoLivro from './pages/NovoLivro';
import NovoLeitor from './pages/NovoLeitor';
import Emprestimos from './pages/Emprestimos';
import NotFound from './pages/NotFound';

function Layout({ children }) {
  return (
    <div className="flex min-h-screen bg-base">
      <Sidebar />
      <main className="flex-1 p-6 md:p-10 overflow-x-auto">{children}</main>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<ProtectedRoute><Layout><Dashboard /></Layout></ProtectedRoute>} />
      <Route path="/livros/novo" element={<ProtectedRoute><Layout><NovoLivro /></Layout></ProtectedRoute>} />
      <Route path="/leitores/novo" element={<ProtectedRoute><Layout><NovoLeitor /></Layout></ProtectedRoute>} />
      <Route path="/emprestimos" element={<ProtectedRoute><Layout><Emprestimos /></Layout></ProtectedRoute>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}