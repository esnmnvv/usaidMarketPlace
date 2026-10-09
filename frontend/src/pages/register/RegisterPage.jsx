import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '@/entities/session';
import { RegisterForm } from '@/features/auth';
import { AuthShell } from '@/widgets/auth-shell';

export function RegisterPage() {
  const { user } = useAuth();
  if (user) return <Navigate to="/profile" replace />;

  return (
    <AuthShell eyebrow="Присоединяйтесь" title="Создать аккаунт" description="Пара деталей — и можно начинать."
      alternate={<>Уже есть аккаунт? <Link to="/login">Войти</Link></>}>
      <RegisterForm />
    </AuthShell>
  );
}
