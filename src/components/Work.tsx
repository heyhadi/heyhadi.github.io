import { Visual } from './figures/Visual';

export function Work({ projects }: any) {
  return (
    <section id="work" className="band">
      <div className="section">
        <div className="sec-head" data-reveal>
          <div className="eyebrow">Selected work</div>
          <h2 className="h2">
            Case notes from production.
          </h2>
          <p className="standfirst">
            Work at GetGo. Internal systems can't be shown, so the diagrams are abstracted
            and there are no screenshots — happy to walk through any of them in an interview.
          </p>
        </div>
        <ol className="cases">
          {projects.map((p: any, i: number) => (
            <li className="case" id={`case-${p.id}`} key={p.id} data-reveal>
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
