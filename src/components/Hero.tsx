export function Hero({ profile }: any) {
  return (
    <header className="hero">
      <div className="hero-grid">
        <div>
          <div className="eyebrow">Fullstack engineer (frontend focus) — Bandung, Indonesia</div>
          <h1>
            I build interfaces that <em>survive production</em>.
          </h1>
          <p className="lede">{profile.summary}</p>
          <ul className="facts">
            {profile.facts.map((f: any) => (
              <li key={f.k}>
                <b>{f.k}</b>
                <span>{f.v}</span>
              </li>
            ))}
          </ul>
          <div className="cta-row">
            <a href="#work">Read the case notes</a>
            <a href={`mailto:${profile.email}`}>Email me</a>
            <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
        </div>
        <aside className="aside-current" aria-label="Currently">
          <div className="aside-top">
            <span className="avail-dot" aria-hidden="true" />
            <span>Open to roles — frontend / fullstack</span>
          </div>
          <h2>Currently</h2>
          <p>
            Frontend engineer building admin interfaces in React, Svelte, and TypeScript —
            booking and billing flows plus fleet tooling, with the odd Go or C# service
            when a feature needs one.
          </p>
          <p>
            Why teams trust my UI: I also run the release train — three-week cuts across
            three brands and three markets, behind checklists and sign-off gates.
          </p>
          <dl className="aside-facts">
            <div><dt>Timezone</dt><dd>WIB (UTC+7) · overlaps SGT / MYT / AEST</dd></div>
            <div><dt>Reply</dt><dd>Email first, same-day most days</dd></div>
            <div><dt>Elsewhere</dt><dd>GitHub · LinkedIn</dd></div>
          </dl>
          <a className="aside-cta" href="#contact">Skip to contact ↓</a>
        </aside>
      </div>
    </header>
  );
}
