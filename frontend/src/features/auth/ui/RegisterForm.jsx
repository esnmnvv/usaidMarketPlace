import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '@/entities/session';
import { api, apiError } from '@/shared/api';
import { Field } from '@/shared/ui/field';

export function RegisterForm() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [values, setValues] = useState({ firstName: '', lastName: '', email: '', phone: '', password: '', confirm: '' });
  const [busy, setBusy] = useState(false);

  function update(event) {
    setValues((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  async function submit(event) {
    event.preventDefault();
    if (busy) return;
    if (values.password !== values.confirm) {
      toast.error('Пароли не совпадают');
      return;
    }
    setBusy(true);
    const payload = {
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      email: values.email.trim().toLowerCase(),
      phone: values.phone.trim(),
      password: values.password,
    };
    try {
      await api.post('/auth/register', payload);
    } catch (error) {
      toast.error(apiError(error, 'Не удалось создать аккаунт'));
      setBusy(false);
      return;
    }
    try {
      await login(payload.email, payload.password);
      toast.success('Аккаунт создан. Добро пожаловать!');
      navigate('/profile', { replace: true });
    } catch {
      toast.info('Аккаунт создан. Войдите с вашим email и паролем.');
      navigate('/login', { replace: true });
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="auth-form">
      <div className="field-row">
        <Field label="Имя *" id="firstName" value={values.firstName} onChange={update} placeholder="Ваше имя" autoComplete="given-name" required />
        <Field label="Фамилия" id="lastName" value={values.lastName} onChange={update} placeholder="Фамилия" autoComplete="family-name" />
      </div>
      <Field label="Электронная почта *" id="email" type="email" value={values.email} onChange={update} placeholder="name@example.com" autoComplete="email" required />
      <Field label="Телефон" id="phone" type="tel" value={values.phone} onChange={update} placeholder="+996 555 000 000" autoComplete="tel" />
      <div className="field-row">
        <Field label="Пароль *" id="password" type="password" value={values.password} onChange={update} placeholder="От 6 символов" autoComplete="new-password" minLength={6} required />
        <Field label="Повторите пароль *" id="confirm" type="password" value={values.confirm} onChange={update} placeholder="Ещё раз" autoComplete="new-password" minLength={6} required />
      </div>
      <p className="form-hint">Пароль должен содержать не менее 6 символов.</p>
      <button className="button button-primary form-submit" disabled={busy} type="submit">
        {busy ? 'Создаём аккаунт…' : 'Зарегистрироваться'} <span aria-hidden="true">→</span>
      </button>
    </form>
  );
}
