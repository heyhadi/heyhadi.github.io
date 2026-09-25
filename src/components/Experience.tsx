export function Experience({ experience, skillGroups, education }: any) {
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
              {j.bullets.map((b: any, i: number) => (
                <li key={i}>
                  <strong>{b.lead}</strong> {b.text}
                </li>
              ))}
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
          <p>What I reach for without thinking — grouped by where it runs.</p>
          {skillGroups.map((g: any) => (
            <div className="toolrow" key={g.title}>
              <h4>{g.title}</h4>
              <p>{g.skills.join(', ')}</p>
            </div>
          ))}
        </div>
        <div className="toolbox">
          <h3>Education</h3>
          <p>Degree first, then a bootcamp into engineering.</p>
          {education.map((e: any) => (
            <div className="toolrow" key={e.school}>
              <h4>{e.school}</h4>
              <p>{e.detail}</p>
            </div>
          ))}
          <h3>Elsewhere</h3>
          <p>Release notes, post-mortems, and specs — ask me in an interview and I will walk you through one. This site itself is public: <a href="https://github.com/heyhadi/heyhadi.github.io" target="_blank" rel="noreferrer">source on GitHub</a>.</p>
        </div>
      </div>
    </section>
  );
}
