export function Work({ profile, projects }: any) {
  return (
    <section id="work" className="section">
      <div className="eyebrow">Selected work — {profile.location}</div>
      <h2 className="h2">
        Six case notes from <em>internal platforms</em>.
      </h2>
      <p className="standfirst">
        My platform work is internal tooling under NDA, so there are no screenshots and no
        invented metrics — and no employer names. Each note follows the same shape: what the
        system does, what I changed, and what changed because of it. Full names and references
        available on request and in interviews.
      </p>
      <ol className="cases">
        {projects.map((p: any, i: number) => (
          <li className="case" key={p.id}>
            <span className="num">{String(i + 1).padStart(2, '0')}</span>
            <div>
              <h3>{p.title}</h3>
              <div className="ctx">{p.context}</div>
              {p.scope ? <div className="scope">{p.scope}</div> : null}
              <p>{p.body}</p>
              <p className="result">
                <span>Outcome</span>
                {p.result}
              </p>
              <div className="plain-tags">{p.tags.join(' · ')}</div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
