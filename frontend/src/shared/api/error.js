export function apiError(error, fallback = 'Что-то пошло не так. Попробуйте ещё раз.') {
  const data = error.response?.data;
  if (typeof data?.error === 'string' && data.error.trim()) return data.error;
  if (typeof data?.message === 'string' && error.response?.status !== 500) return data.message;
  if (!error.response) return 'Нет связи с сервером. Проверьте, запущен ли Spring Boot.';
  return fallback;
}
