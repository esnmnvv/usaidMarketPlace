import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '@/entities/session';
import { apiError } from '@/shared/api';

export function LogoutButton() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);

  async function submitLogout() {
    if (busy) return;
    setBusy(true);
    try {
      await logout();
      toast.success('Вы вышли из аккаунта');
      navigate('/', { replace: true });
    } catch (error) {
      toast.error(apiError(error, 'Не удалось выйти'));
    } finally {
      setBusy(false);
    }
  }

  return (
    <button className="button button-outline" onClick={submitLogout} disabled={busy} type="button">
      {busy ? 'Выходим…' : 'Выйти из аккаунта'} <span aria-hidden="true">→</span>
    </button>
  );
}
