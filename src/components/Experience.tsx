/** Link to a case note in the Work section, labelled by its position there. */
function caseRef(projects: any[], id: string) {
  const i = projects.findIndex((p: any) => p.id === id);
  return { href: `/#case-${id}`, label: `Case ${String(i + 1).padStart(2, '0')}` };
}

export function Experience({ experience, projects, skillGroups, education }: any) {
  return (
    <section id="experience" className="section">
      <div className="sec-head" data-reveal>
        <div className="eyebrow">Experience</div>
        <h2 className="h2">
          5+ years across car-sharing ops and national licensing.
        </h2>
      </div>
      <div className="jobs">
        {experience.map((j: any) => (
          <article className="job" key={j.company} data-reveal>
            <div className="job-head">
              <h3>{j.title} — {j.company}</h3>
              <p className="job-tagline">{j.tagline}</p>
            </div>
            <ul className="job-points">
              {j.bullets.map((b: any, i: number) => {
                const ref = b.ref ? caseRef(projects, b.ref) : null;
                return (
                  <li key={i}>
                    <strong>{b.lead}</strong> {b.text}
                    {ref && (
                      <>
                        {' '}
                        <a className="job-ref" href={ref.href}>{ref.label}</a>
                      </>
                    )}
                  </li>
                );
              })}
            </ul>
            <aside className="job-rail">
              <div className="rail-block">
                <h4>Dates</h4>
                <p>{j.dates}</p>
              </div>
              <div className="rail-block">
                <h4>Where</h4>
                <p>{j.where}</p>
              </div>
              <div className="rail-block">
                <h4>Focus</h4>
                <p>{j.focus.join(' · ')}</p>
              </div>
            </aside>
          </article>
        ))}
      </div>
      <div className="two-col" data-reveal>
        <div className="toolbox">
          <h3>Toolbox</h3>
          {skillGroups.map((g: any) => (
            <div className="toolrow" key={g.title}>
              <h4>{g.title}</h4>
              <p>{g.skills.join(', ')}</p>
            </div>
          ))}
        </div>
        <div className="toolbox">
          <h3>Education</h3>
          {education.map((e: any) => (
            <div className="toolrow" key={e.school}>
              <h4>{e.school}</h4>
              <p>{e.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
