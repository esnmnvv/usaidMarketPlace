import { Route, Routes } from 'react-router-dom';
import { useAuth } from '@/entities/session';
import { HomePage } from '@/pages/home';
import { RegisterPage } from '@/pages/register';
import { LoginPage } from '@/pages/login';
import { ProfilePage } from '@/pages/profile';
import { NotFoundPage } from '@/pages/not-found';
import { ProtectedRoute } from './ProtectedRoute';

export function AppRouter() {
  const { loading } = useAuth();

  if (loading) return <div className="loading-screen" role="status">Загружаем Eatasty…</div>;

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
