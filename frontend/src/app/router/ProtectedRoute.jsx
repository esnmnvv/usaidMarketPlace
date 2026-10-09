import { Navigate } from 'react-router-dom';
import { useAuth } from '@/entities/session';

export function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}
