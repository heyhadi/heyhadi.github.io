import { renderToString } from 'react-dom/server';
import { Site } from './App';
import { profile } from './data/resume';
import { posts } from './data/resume2';
import { skillGroups, education } from './data/resume3';
import { canonicalPath, findPost, type Route } from './lib/route';

const SITE = 'https://heyhadi.github.io/';

const urlFor = (route: Route) => SITE + canonicalPath(route).slice(1);

export { posts };

/**
 * Markup for #root, prerendered per route by scripts/prerender.mjs so crawlers
 * that never run JavaScript still read every page. The client hydrates this
 * exact tree, so server and client must render the same <Site />.
 */
export function render(route: Route = { kind: 'home' }): string {
  return renderToString(<Site route={route} />);
}

export interface HeadData {
  title: string;
  description: string;
  /** Empty for the 404 page: it has no canonical URL of its own. */
  canonical: string;
  jsonld: string;
  robots: '' | 'noindex';
}

function jsonldScript(graph: unknown): string {
  const json = JSON.stringify(graph, null, 2).replace(/</g, '\\u003c');
  return `<script type="application/ld+json">\n${json}\n    </script>`;
}

function homeJsonLd(): string {
  const knowsAbout = [...new Set(skillGroups.flatMap((g) => g.skills))];

  return jsonldScript({
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    url: SITE,
    mainEntity: {
      '@type': 'Person',
      name: profile.name,
      jobTitle: profile.role,
      description: profile.summary,
      url: SITE,
      email: `mailto:${profile.email}`,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Bandung',
        addressCountry: 'ID',
      },
      sameAs: [profile.github, profile.linkedin],
      knowsAbout,
      worksFor: {
        '@type': 'Organization',
        name: profile.company,
        description:
          'Singapore car-sharing platform: customer web app, ops admin console, and fleet tooling for three brands across three markets; remote from Bandung.',
      },
      alumniOf: education.map((e) => ({
        '@type': 'EducationalOrganization',
        name: e.school,
        description: e.detail,
      })),
    },
  });
}

const BLOG_DESCRIPTION =
  'Short posts drawn from production work. No internal details — just the patterns that survived contact with production.';

/** Per-route <head>: title, description, canonical, and structured data. */
export function renderHead(route: Route = { kind: 'home' }): HeadData {
  if (route.kind === 'post') {
    const post = findPost(route.slug)!;
    const canonical = urlFor(route);
    return {
      title: `${post.title} — Blog · Munawirul Hadi`,
      description: post.summary,
      canonical,
      robots: '',
      jsonld: jsonldScript({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.summary,
        author: { '@type': 'Person', name: profile.name, url: SITE },
        mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
        keywords: post.tags.join(', '),
      }),
    };
  }

  if (route.kind === 'blog') {
    return {
      title: 'Blog — Munawirul Hadi',
      description: BLOG_DESCRIPTION,
      canonical: urlFor(route),
      robots: '',
      jsonld: jsonldScript({
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: 'Blog — Munawirul Hadi',
        url: `${SITE}blog/`,
        description: BLOG_DESCRIPTION,
        blogPost: posts.map((p) => ({
          '@type': 'BlogPosting',
          headline: p.title,
          url: `${SITE}blog/${p.slug}/`,
          description: p.summary,
        })),
      }),
    };
  }

  if (route.kind === 'notfound') {
    return {
      title: 'Page not found — Munawirul Hadi',
      description: 'This page does not exist. Start from the blog or the homepage.',
      canonical: '',
      robots: 'noindex',
      jsonld: jsonldScript({
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Page not found',
      }),
    };
  }

  return {
    title: 'Munawirul Hadi — Senior Frontend Engineer (React, TypeScript)',
    description:
      "Munawirul Hadi — Senior Frontend Engineer, open to remote or relocation. 5+ years at GetGo (Singapore car-sharing) and on Indonesia's national licensing platform, OSS-RBA at BKPM: React, TypeScript, Svelte, release management, migrations, CI/CD.",
    canonical: urlFor(route),
    robots: '',
    jsonld: homeJsonLd(),
  };
}
