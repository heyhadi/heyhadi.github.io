import { renderToString } from 'react-dom/server';
import App from './App';
import { profile } from './data/resume';
import { skillGroups, education } from './data/resume3';

const SITE = 'https://heyhadi.github.io/';

/**
 * Markup for #root, prerendered at build time by scripts/prerender.mjs so
 * crawlers that never run JavaScript still read the whole page. The client
 * entry hydrates this exact tree, so both entries must render the same <App />.
 */
export function render(): string {
  return renderToString(<App />);
}

/**
 * schema.org JSON-LD restating the facts the page already publishes. Nothing is
 * invented here: every value is pulled from src/data/resume*.ts.
 */
export function renderJsonLd(): string {
  const knowsAbout = [...new Set(skillGroups.flatMap((g) => g.skills))];

  const graph = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    url: SITE,
    mainEntity: {
      '@type': 'Person',
      name: profile.name,
      jobTitle: `${profile.altRole} (frontend focus)`,
      description: profile.summary,
      url: SITE,
      email: `mailto:${profile.email}`,
      telephone: profile.phone,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Bandung',
        addressCountry: 'ID',
      },
      sameAs: [profile.github, profile.linkedin],
      knowsAbout,
      worksFor: {
        '@type': 'Organization',
        name: 'Singapore-based car-sharing platform',
        description:
          'Ops admin console and fleet tooling for three brands across three markets; remote from Bandung.',
      },
      alumniOf: education.map((e) => ({
        '@type': 'EducationalOrganization',
        name: e.school,
        description: e.detail,
      })),
    },
  };

  // Escaping < keeps the payload from ever closing the script tag early.
  const json = JSON.stringify(graph, null, 2).replace(/</g, '\\u003c');
  return `<script type="application/ld+json">\n${json}\n    </script>`;
}
