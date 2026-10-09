export function Contact({ profile }: any) {
  return (
    <section id="contact" className="section">
      <div className="contact-box">
        <div className="eyebrow">Contact</div>
        <h2 className="h2">
          Tell me about the <em>unglamorous</em> work.
        </h2>
        <p>
          {profile.availability}: {profile.relocation}. {profile.notice} notice.
          Based in {profile.location}, remote since 2022 — fastest reply by email.
        </p>
        <div className="cta-row">
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <a href={profile.cv} download>CV (PDF)</a>
          <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
      </div>
    </section>
  );
}
