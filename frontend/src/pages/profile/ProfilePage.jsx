import { useAuth } from '@/entities/session';
import { LogoutButton } from '@/features/auth';

export function ProfilePage() {
  const { user } = useAuth();
  const fullName = [user.firstName, user.lastName].filter(Boolean).join(' ');

  return (
    <section className="profile container">
      <div className="profile-heading">
        <p className="eyebrow">Личный кабинет</p>
        <h1>Здравствуйте, <em>{user.firstName || 'друг'}!</em></h1>
        <p>Рады, что вы с нами.</p>
      </div>
      <div className="profile-card">
        <div className="profile-avatar" aria-hidden="true">{user.firstName?.[0]?.toUpperCase() || 'E'}</div>
        <div className="profile-details">
          <h2>{fullName || user.email}</h2>
          <p>Участник Eatasty</p>
          <dl>
            <div><dt>Электронная почта</dt><dd>{user.email}</dd></div>
            {user.phone && <div><dt>Телефон</dt><dd>{user.phone}</dd></div>}
            <div><dt>Роль</dt><dd>{user.role === 'USER' ? 'Пользователь' : user.role}</dd></div>
          </dl>
          <LogoutButton />
        </div>
      </div>
    </section>
  );
}
