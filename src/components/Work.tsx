import { Visual } from './figures/Visual';

export function Work({ profile, projects }: any) {
  return (
    <section id="work" className="band">
      <div className="section">
        <div className="sec-head" data-reveal>
          <div className="eyebrow">Selected work — {profile.location}</div>
          <h2 className="h2">
            Case notes from internal platforms.
          </h2>
          <p className="standfirst">
            Internal tooling under NDA, so no screenshots and no employer names — each note
            is the same shape: what the system does, what I changed, and what changed because
            of it. The diagrams are abstracted for the same reason. Full names and references
            available on request and in interviews.
          </p>
        </div>
        <ol className="cases">
          {projects.map((p: any, i: number) => (
            <li className="case" key={p.id} data-reveal>
              <span className="num">{String(i + 1).padStart(2, '0')}</span>
              <div className="case-body">
                <h3>{p.title}</h3>
                <Visual kind={p.visual} />
                <p>{p.body}</p>
                <p className="result">
                  <span>Outcome</span>
                  {p.result}
                </p>
              </div>
              <aside className="case-rail">
                <div className="rail-block">
                  <h4>Context</h4>
                  <p>{p.context}</p>
                </div>
                {p.scope ? (
                  <div className="rail-block">
                    <h4>Scope</h4>
                    <span className="scope">{p.scope}</span>
                  </div>
                ) : null}
                <div className="rail-block">
                  <h4>Stack</h4>
                  <p className="rail-tags">{p.tags.join(' · ')}</p>
                </div>
              </aside>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
