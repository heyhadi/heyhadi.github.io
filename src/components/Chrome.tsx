/**
 * Site chrome. Anchor links point at homepage sections, so from a subpage
 * they become absolute (/#work); /blog/ is a real route and stays absolute.
 *
 * On narrow viewports the section links collapse behind a Menu toggle so the
 * Blog route stays reachable without scrolling.
 */
import { useEffect, useState } from 'react';

export function Nav({ home }: { home: boolean }) {
  const [open, setOpen] = useState(false);
  const h = (hash: string) => (home ? hash : `/${hash}`);
  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open ]);

  return (
    <nav className="nav">
      <div className="nav-inner">
        <a className="brand" href={home ? '#top' : '/'} onClick={close}>
          Munawirul Hadi
        </a>
        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="nav-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? 'Close' : 'Menu'}
        </button>
        <div className={`links${open ? ' open' : ''}`} id="nav-menu">
          <a href={h('#work')} onClick={close}>Work</a>
          <a href={h('#projects')} onClick={close}>Projects</a>
          <a href={h('#experience')} onClick={close}>Experience</a>
          <a href="/blog/" onClick={close}>Blog</a>
          <a href={h('#contact')} onClick={close}>Contact</a>
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
