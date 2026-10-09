import { useEffect, useState } from 'react';
import { profile, stats } from './data/resume';
import { experience, projects, posts } from './data/resume2';
import { skillGroups, education } from './data/resume3';
import { matchRoute, normalizePath, type Route } from './lib/route';
import { Nav, Footer } from './components/Chrome';
import { Hero } from './components/Hero';
import { StatStrip } from './components/StatStrip';
import { Work } from './components/Work';
import { Experience } from './components/Experience';
import { BlogIndex } from './components/BlogIndex';
import { BlogPostPage } from './components/BlogPost';
import { NotFoundPage } from './components/NotFound';
import { Contact } from './components/Contact';

/** Re-arm [data-reveal] targets on each route; disconnect the previous observer. */
function useReveal(routeKey: string) {
  useEffect(() => armReveals(), [routeKey]);
}

export function armReveals(): (() => void) | undefined {
  const targets = Array.from(document.querySelectorAll('[data-reveal]:not(.is-in)'));
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduced || !('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('is-in'));
    return undefined;
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
    { rootMargin: '0px 0px -10% 0px', threshold: 0.08 },
  );

  targets.forEach((el) => io.observe(el));
  return () => io.disconnect();
}

/** Scroll to the URL's #anchor once the route has rendered, else to the top. */
function scrollForHash(hash: string) {
  if (!hash) {
    window.scrollTo({ top: 0 });
    return;
  }
  requestAnimationFrame(() =>
    requestAnimationFrame(() => {
      document.getElementById(hash)?.scrollIntoView();
    }),
  );
}

/** Internal links switch route via history; external, hash, and mail links pass through. */
export function interceptClicks(navigate: (to: string) => void) {
  const onClick = (e: MouseEvent) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
      return;
    }
    const a = (e.target as HTMLElement).closest?.('a');
    if (!a || a.target === '_blank' || a.hasAttribute('download')) return;
    const href = a.getAttribute('href') || '';
    // Same-document anchors and non-http schemes scroll/open natively.
    if (href.startsWith('#') || href === '' || /^[a-zA-Z][a-zA-Z\d+.-]*:/.test(href)) return;
    if (!href.startsWith('/')) return;
    // Files (/blog.xml) and unknown paths load natively so the server answers them.
    if (matchRoute(href).kind === 'notfound') return;
    const target = normalizePath(href);
    const current = normalizePath(window.location.pathname);
    if (target === current) return;
    e.preventDefault();
    navigate(href);
  };
  document.addEventListener('click', onClick);
  return () => document.removeEventListener('click', onClick);
}

export function HomePage() {
  return (
    <>
      <div id="top">
        <Hero profile={profile} />
      </div>
      <StatStrip stats={stats} />
      <Work projects={projects} />
      <Experience
        experience={experience}
        projects={projects}
        skillGroups={skillGroups}
        education={education}
      />
      <Contact profile={profile} />
    </>
  );
}

export function BlogStandalone() {
  return <BlogIndex posts={posts} standalone />;
}

export function currentRoute(): Route {
  return matchRoute(window.location.pathname + window.location.search + window.location.hash);
}

export function Site({ route }: { route: Route }) {
  return (
    <>
      <Nav home={route.kind === 'home'} />
      {route.kind === 'home' && <HomePage />}
      {route.kind === 'blog' && <BlogStandalone />}
      {route.kind === 'post' && (
        <BlogPostPage post={posts.find((p) => p.slug === route.slug)} posts={posts} profile={profile} />
      )}
      {route.kind === 'notfound' && <NotFoundPage />}
      <Footer />
    </>
  );
}

export default function App() {
  // The prerendered markup was rendered from the URL's route, so hydration must
  // start from that same route — starting at 'home' mismatches every subpage.
  const [route, setRoute] = useState<Route>(() => currentRoute());
  const key = route.kind === 'post' ? `post:${route.slug}` : route.kind;
  useReveal(key);

  useEffect(
    () =>
      interceptClicks((to) => {
        window.history.pushState({}, '', to);
        setRoute(matchRoute(to));
        scrollForHash(to.includes('#') ? to.split('#')[1] : '');
      }),
    [],
  );

  useEffect(() => {
    const onPop = () => {
      setRoute(currentRoute());
      scrollForHash(window.location.hash.slice(1));
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  return <Site route={route} />;
}

