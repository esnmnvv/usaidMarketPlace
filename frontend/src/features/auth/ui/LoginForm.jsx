import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '@/entities/session';
import { apiError } from '@/shared/api';
import { Field } from '@/shared/ui/field';

export function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(event) {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    try {
      await login(email.trim().toLowerCase(), password);
      toast.success('С возвращением!');
      navigate('/profile', { replace: true });
    } catch (error) {
      toast.error(apiError(error, 'Не удалось войти'));
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="auth-form">
      <Field label="Электронная почта" id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="name@example.com" autoComplete="email" required />
      <Field label="Пароль" id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Ваш пароль" autoComplete="current-password" required />
      <button className="button button-primary form-submit" disabled={busy} type="submit">
        {busy ? 'Входим…' : 'Войти в аккаунт'} <span aria-hidden="true">→</span>
      </button>
    </form>
  );
}
