import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

// layout das telas internas: sidebar fixa + área de conteúdo
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
      <Route path="/" element={
        <ProtectedRoute>
          <Layout><Dashboard /></Layout>
        </ProtectedRoute>
      } />
      {/* temporário: links ainda não criados voltam pro dashboard */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}