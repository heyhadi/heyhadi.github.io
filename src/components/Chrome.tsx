/**
 * Site chrome. Anchor links point at homepage sections, so from a subpage
 * they become absolute (/#work); /blog/ is a real route and stays absolute.
 */
export function Nav({ home }: { home: boolean }) {
  const h = (hash: string) => (home ? hash : `/${hash}`);
  return (
    <nav className="nav">
      <div className="nav-inner">
        <a className="brand" href={home ? '#top' : '/'}>
          Munawirul Hadi
        </a>
        <div className="links">
          <a href={h('#work')}>Work</a>
          <a href={h('#experience')}>Experience</a>
          <a href="/blog/">Blog</a>
          <a href={h('#contact')}>Contact</a>
        </div>
        <a className="hire" href={h('#contact')}>
          <span className="hire-dot" aria-hidden="true" />
          Open to roles
        </a>
      </div>
    </nav>
  );
}

export function Footer() {
  return (
    <footer>
      <div className="foot">
        <span>Munawirul Hadi — Bandung (WIB, UTC+7)</span>
        <span>
          Remote since 2022 · email beats LinkedIn · <a href="/blog.xml">RSS</a>
        </span>
      </div>
    </footer>
  );
}
