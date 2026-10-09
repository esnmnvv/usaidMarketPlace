export function AuthShell({ eyebrow, title, description, children, alternate }) {
  return (
    <div className="auth-wrap container">
      <div className="auth-aside">
        <div className="aside-decoration" aria-hidden="true">✳</div>
        <p className="eyebrow eyebrow-light">Место, где вкусно</p>
        <h2>Ваше место<br />за нашим <em>столом.</em></h2>
        <p>Тёплый приём начинается с простого знакомства.</p>
        <div className="aside-bottom">eatasty <span>✦</span> made for good moments</div>
      </div>
      <section className="auth-card">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="auth-description">{description}</p>
        {children}
        <p className="auth-alternate">{alternate}</p>
      </section>
    </div>
  );
}
