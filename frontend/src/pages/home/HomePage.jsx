import { Link } from 'react-router-dom';
import { useAuth } from '@/entities/session';

export function HomePage() {
  const { user } = useAuth();
  return (
    <>
      <section className="hero container">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-line" /> Приятно познакомиться</p>
          <h1>Хороший вкус <em>начинается</em> здесь.</h1>
          <p className="hero-text">Присоединяйтесь к Eatasty — вашему месту для приятных открытий. Создайте аккаунт и начните знакомство.</p>
          <div className="hero-actions">
            <Link className="button button-primary" to={user ? '/profile' : '/register'}>
              {user ? 'Мой профиль' : 'Создать аккаунт'} <span aria-hidden="true">→</span>
            </Link>
            {!user && <Link className="text-link" to="/login">Уже с нами? Войти <span aria-hidden="true">→</span></Link>}
          </div>
          <div className="hero-note"><span className="note-star">✳</span><span>Просто. Удобно. По вкусу.</span></div>
        </div>
        <div className="hero-art" aria-label="Иллюстрация свежего блюда" role="img">
          <div className="art-orbit art-orbit-one" />
          <div className="art-orbit art-orbit-two" />
          <div className="art-spark art-spark-one">✦</div>
          <div className="art-spark art-spark-two">✳</div>
          <div className="plate-shadow" />
          <div className="plate">
            <div className="plate-inner">
              <div className="leaf leaf-one" /><div className="leaf leaf-two" />
              <div className="leaf leaf-three" /><div className="leaf leaf-four" />
              <div className="tomato tomato-one" /><div className="tomato tomato-two" />
              <div className="tomato tomato-three" /><div className="egg"><div /></div>
              <div className="herb herb-one">✳</div><div className="herb herb-two">✳</div>
            </div>
          </div>
          <div className="art-label"><span>✦</span> С любовью к деталям</div>
        </div>
      </section>
      <section className="feature-band">
        <div className="container feature-inner">
          <p>Ваш вкус —<br /><strong>ваши правила.</strong></p>
          <span className="feature-divider" />
          <p>Один шаг до<br /><strong>новых открытий.</strong></p>
          <span className="feature-flower" aria-hidden="true">✳</span>
        </div>
      </section>
    </>
  );
}
