import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return <section className="not-found container"><p className="eyebrow">404</p><h1>Такой страницы нет.</h1><Link className="button button-primary" to="/">На главную <span aria-hidden="true">→</span></Link></section>;
}
