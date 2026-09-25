import { profile } from './data/resume';
import { experience, projects } from './data/resume2';
import { skillGroups, education } from './data/resume3';
import { Hero } from './components/Hero';
import { Work } from './components/Work';
import { Experience } from './components/Experience';
import { Contact } from './components/Contact';

export default function App() {
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
          <a className="hire" href="#contact">Open to roles</a>
        </div>
      </nav>
      <div id="top">
        <Hero profile={profile} />
      </div>
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
