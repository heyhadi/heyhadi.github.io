/**
 * Build-time prerender: emits one static HTML file per route so crawlers that
 * never execute JavaScript read every page from markup.
 *
 * Run after both builds:
 *   vite build                                  -> dist/
 *   vite build --ssr src/entry-server.tsx       -> dist-ssr/
 *   node scripts/prerender.mjs                  -> inlines the markup
 *
 * Routes come from src/lib/route via the SSR bundle; the loop below is what
 * guarantees /blog/, every /blog/:slug/, and the 404 page stay published.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const shellPath = path.join(dist, 'index.html');
const serverEntry = path.join(root, 'dist-ssr', 'entry-server.js');

const HTML_SLOT = '<!--app-html-->';
const JSONLD_SLOT = '<!--app-jsonld-->';
const TITLE_SLOT = '<!--app-title-->';
const DESC_SLOT = '<!--app-description-->';
const CANONICAL_SLOT = '<!--app-canonical-->';
const ROBOTS_SLOT = '<!--app-robots-->';

const SITE = 'https://heyhadi.github.io/';

// index.html carries a `data-shell` <title> for the raw shell and the dev server,
// which never run this script. Drop it before injecting, or every page ends up
// with two <title> tags — the injected one plus the homepage one.
const SHELL_TITLE = /[ \t]*<title data-shell>[\s\S]*?<\/title>\n?/;

const { render, renderHead, posts } = await import(pathToFileURL(serverEntry).href);

const shell = await readFile(shellPath, 'utf8');

// Fail loudly rather than silently shipping a client-only page again.
for (const slot of [HTML_SLOT, JSONLD_SLOT, TITLE_SLOT, DESC_SLOT, CANONICAL_SLOT, ROBOTS_SLOT]) {
  if (!shell.includes(slot)) {
    throw new Error(`prerender: ${slot} missing from dist/index.html — check the build order.`);
  }
}
if (!SHELL_TITLE.test(shell)) {
  throw new Error('prerender: the data-shell <title> is missing from dist/index.html.');
}

/** index.html → the fully-tagged static page for one route. */
function pageFor(route, title, description, canonical, robots, jsonld, markup) {
  const html = shell
    .replace(SHELL_TITLE, '')
    .replace(JSONLD_SLOT, jsonld)
    .replace(TITLE_SLOT, `<title>${title}</title>`)
    .replace(
      DESC_SLOT,
      `<meta name="description" content="${description.replace(/"/g, '&quot;')}" />`,
    )
    .replace(CANONICAL_SLOT, canonical ? `<link rel="canonical" href="${canonical}" />` : '')
    .replace(ROBOTS_SLOT, robots ? `<meta name="robots" content="${robots}" />` : '')
    .replace(HTML_SLOT, markup);

  // Each slot appears exactly once, so anything left over means the substitution missed.
  for (const slot of [HTML_SLOT, JSONLD_SLOT, TITLE_SLOT, DESC_SLOT, CANONICAL_SLOT, ROBOTS_SLOT]) {
    if (html.includes(slot)) {
      throw new Error(`prerender: ${slot} survived substitution on ${route.kind}.`);
    }
  }
  if (html.includes('data-shell')) {
    throw new Error(`prerender: the shell <title> survived substitution on ${route.kind}.`);
  }
  return html;
}

function escXml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

const routes = [
  { route: { kind: 'home' }, out: ['index.html'] },
  { route: { kind: 'blog' }, out: ['blog', 'index.html'] },
  ...posts.map((p) => ({ route: { kind: 'post', slug: p.slug }, out: ['blog', p.slug, 'index.html'] })),
  { route: { kind: 'notfound' }, out: ['404.html'] },
];

const sitemapUrls = [];

for (const { route, out } of routes) {
  const markup = render(route);
  const head = renderHead(route);

  if (markup.length < 500) {
    throw new Error(`prerender: markup for ${out.join('/')} looks empty (${markup.length} bytes).`);
  }
  const bodyOk = out[0] === '404.html' ? markup.includes('This page does not exist') : markup.length >= 1000;
  if (!bodyOk) {
    throw new Error(`prerender: markup for ${out.join('/')} failed a sanity check.`);
  }

  const html = pageFor(
    route,
    head.title,
    head.description,
    head.canonical,
    head.robots,
    head.jsonld,
    markup,
  );

  const dest = path.join(dist, ...out);
  await mkdir(path.dirname(dest), { recursive: true });
  await writeFile(dest, html);

  console.log(`prerender: ${out.join('/')} (${html.length} bytes)`);

  if (route.kind !== 'notfound') {
    sitemapUrls.push(head.canonical);
  }
}

// Sitemap mirrors exactly the routes above — no manual URL list to drift.
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapUrls
  .map((u) => `  <url>\n    <loc>${u}</loc>\n    <changefreq>monthly</changefreq>\n  </url>`)
  .join('\n')}\n</urlset>\n`;
await writeFile(path.join(dist, 'sitemap.xml'), sitemap);
console.log(`prerender: sitemap.xml (${sitemapUrls.length} urls)`);

// RSS from the same post data the blog index renders — new posts appear here.
const rss = `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0">\n<channel>\n  <title>Blog — Munawirul Hadi</title>\n  <link>${SITE}blog/</link>\n  <description>Short posts drawn from production work.</description>\n${posts
  .map(
    (p) =>
      `  <item>\n    <title>${escXml(p.title)}</title>\n    <link>${SITE}blog/${p.slug}/</link>\n    <guid isPermaLink="true">${SITE}blog/${p.slug}/</guid>\n    <description>${escXml(p.summary)}</description>\n  </item>`,
  )
  .join('\n')}\n</channel>\n</rss>\n`;
await writeFile(path.join(dist, 'blog.xml'), rss);
console.log(`prerender: blog.xml (${posts.length} items)`);

