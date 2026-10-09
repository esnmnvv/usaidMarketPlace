import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '@/entities/session';
import { LoginForm } from '@/features/auth';
import { AuthShell } from '@/widgets/auth-shell';

export function LoginPage() {
  const { user } = useAuth();
  if (user) return <Navigate to="/profile" replace />;

  return (
    <AuthShell eyebrow="Рады видеть вас снова" title="С возвращением!" description="Войдите и продолжите с того места, где остановились."
      alternate={<>Ещё нет аккаунта? <Link to="/register">Зарегистрироваться</Link></>}>
      <LoginForm />
    </AuthShell>
  );
}
