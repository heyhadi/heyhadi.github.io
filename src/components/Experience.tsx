export function Experience({ experience, skillGroups, education }: any) {
  return (
    <section id="experience" className="section">
      <div className="eyebrow">Experience</div>
      <h2 className="h2">
        Five years, <em>two platforms</em>.
      </h2>
      <div className="jobs">
        {experience.map((j: any) => (
          <div className="job" key={j.company}>
            <h3>{j.title} — {j.company}</h3>
            <div className="meta">{j.meta}</div>
            <p>{j.tagline}</p>
            <ul>{j.bullets.map((b: string, i: number) => (<li key={i}>{b}</li>))}</ul>
          </div>
        ))}
      </div>
      <div className="two-col">
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
          <p>How I got here — bootcamp first, degree earlier.</p>
          {education.map((e: any) => (
            <div className="toolrow" key={e.school}>
              <h4>{e.school}</h4>
              <p>{e.detail}</p>
            </div>
          ))}
          <h3>Elsewhere</h3>
          <p>Release notes, post-mortems, specs, and Confluence plans — ask me in an interview and I will walk you through one.</p>
        </div>
      </div>
    </section>
  );
}
