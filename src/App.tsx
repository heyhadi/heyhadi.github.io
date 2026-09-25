import { useEffect } from 'react';
import { profile, stats } from './data/resume';
import { experience, projects } from './data/resume2';
import { skillGroups, education } from './data/resume3';
import { Hero } from './components/Hero';
import { StatStrip } from './components/StatStrip';
import { Work } from './components/Work';
import { Experience } from './components/Experience';
import { Contact } from './components/Contact';

export default function App() {
  // Progressive-enhancement scroll reveals: CSS only hides [data-reveal] once
  // main.tsx has put .js on <html>, so the page is fully readable without this.
  useEffect(() => {
    const targets = Array.from(document.querySelectorAll('[data-reveal]'));
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced || !('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('is-in'));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.08 }
    );

    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <nav className="nav">
        <div className="nav-inner">
          <a className="brand" href="#top">Munawirul Hadi</a>
          <div className="links">
            <a href="#work">Work</a>
            <a href="#experience">Experience</a>
            <a href="#contact">Contact</a>
          </div>
          <a className="hire" href="#contact">
            <span className="hire-dot" aria-hidden="true" />
            Open to roles
          </a>
        </div>
      </nav>
      <div id="top">
        <Hero profile={profile} />
      </div>
      <StatStrip stats={stats} />
      <Work profile={profile} projects={projects} />
      <Experience
        experience={experience}
        skillGroups={skillGroups}
        education={education}
      />
      <Contact profile={profile} />
      <footer>
        <div className="foot">
          <span>Munawirul Hadi — Bandung (WIB, UTC+7)</span>
          <span>Remote since 2022 · email beats LinkedIn</span>
        </div>
      </footer>
    </>
  );
}
