import { Link } from 'react-router-dom';
import { useAuth } from '@/entities/session';
import { Brand } from '@/shared/ui/brand';

export function Header() {
  const { user } = useAuth();
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Brand />
        <nav aria-label="Основная навигация">
          <Link to="/" className="nav-link">Главная</Link>
          <Link to={user ? '/profile' : '/login'} className="nav-button">
            {user ? 'Мой профиль' : 'Войти'} <span aria-hidden="true">→</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
