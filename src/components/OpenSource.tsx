/**
 * Public projects, the only work here anyone can open and run. Card copy comes
 * from src/data/resume2.ts and restates each project's README.
 */
export function OpenSource({ items }: any) {
  return (
    <section id="projects" className="section">
      <div className="sec-head" data-reveal>
        <div className="eyebrow">Open source</div>
        <h2 className="h2">Built in the <em>open</em>.</h2>
        <p className="standfirst">
          Three developer tools and a mobile app. The case notes above are internal; these
          you can install, run, and read the source of.
        </p>
      </div>
      <div className="oss-grid">
        {items.map((p: any) => (
          <article className="oss" key={p.name} data-reveal>
            <div className="oss-top">
              <h3>{p.name}</h3>
              <span className="oss-kind">{p.kind}</span>
            </div>
            <p className="oss-pitch">{p.pitch}</p>
            <ul className="oss-points">
              {p.points.map((pt: string) => (
                <li key={pt}>{pt}</li>
              ))}
            </ul>
            <p className="oss-stack">{p.stack}</p>
            <div className="oss-links">
              {p.links.map((l: any) => (
                <a key={l.href} href={l.href} target="_blank" rel="noreferrer">
                  {l.label} ↗
                </a>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
