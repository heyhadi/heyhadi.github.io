export function Hero({ profile }: any) {
  return (
    <header className="hero">
      <div className="hero-grid">
        <div>
          <div className="eyebrow">{profile.role} — React · TypeScript — Bandung, Indonesia</div>
          <h1>
            I build interfaces that <em>survive production</em>.
          </h1>
          <p className="lede">{profile.summary}</p>
          <div className="cta-row">
            <a href="/#work">Read the case notes</a>
            <a href={`mailto:${profile.email}`}>Email me</a>
            <a href={profile.cv} download>Download CV (PDF)</a>
            <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
        </div>
        <aside className="aside-current" aria-label="Currently">
          <div className="aside-top">
            <span className="avail-dot" aria-hidden="true" />
            <span>{profile.availability}</span>
          </div>
          <h2>Currently</h2>
          <p>
            Building {profile.company}'s web apps — from the customer-facing app to
            the ops console behind it — and running the console's three-week release
            train.
          </p>
          <dl className="aside-facts">
            <div><dt>Looking for</dt><dd>Senior frontend / frontend-leaning fullstack, full-time</dd></div>
            <div><dt>Work setup</dt><dd>Remote, or relocate: {profile.relocation}</dd></div>
            <div><dt>Notice</dt><dd>{profile.notice}</dd></div>
            <div><dt>Timezone</dt><dd>WIB (UTC+7) · overlaps SGT / MYT / AEST</dd></div>
          </dl>
          <a className="aside-cta" href="/#contact">Skip to contact ↓</a>
        </aside>
      </div>
    </header>
  );
}
