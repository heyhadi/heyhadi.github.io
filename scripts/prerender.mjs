/**
 * Build-time prerender: turns the CSR shell in dist/index.html into static HTML.
 *
 * Crawlers that never execute JavaScript (most AI/answer-engine fetchers) must be
 * able to read the resume straight from the markup, so the client bundle hydrates
 * markup that is already on the page instead of building it.
 *
 * Run after both builds:
 *   vite build                                  -> dist/
 *   vite build --ssr src/entry-server.tsx       -> dist-ssr/
 *   node scripts/prerender.mjs                  -> inlines the markup
 */
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const shellPath = path.join(root, 'dist', 'index.html');
const serverEntry = path.join(root, 'dist-ssr', 'entry-server.js');

const HTML_SLOT = '<!--app-html-->';
const JSONLD_SLOT = '<!--app-jsonld-->';

const { render, renderJsonLd } = await import(pathToFileURL(serverEntry).href);

const shell = await readFile(shellPath, 'utf8');

// Fail loudly rather than silently shipping a client-only page again.
for (const slot of [HTML_SLOT, JSONLD_SLOT]) {
  if (!shell.includes(slot)) {
    throw new Error(`prerender: ${slot} missing from dist/index.html — check the build order.`);
  }
}

const markup = render();
const jsonld = renderJsonLd();

if (markup.length < 5000) {
  throw new Error(`prerender: server markup looks empty (${markup.length} bytes).`);
}

const html = shell.replace(JSONLD_SLOT, jsonld).replace(HTML_SLOT, markup);

// Each slot appears exactly once, so anything left over means the substitution missed.
if (!html.includes(markup) || html.includes(HTML_SLOT) || html.includes(JSONLD_SLOT)) {
  throw new Error('prerender: server markup was not inlined — check the slot comments.');
}

await writeFile(shellPath, html);

console.log(`prerender: dist/index.html ${shell.length} -> ${html.length} bytes`);
console.log(`prerender: #root markup ${markup.length} bytes, json-ld ${jsonld.length} bytes`);
