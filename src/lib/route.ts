import { posts } from '../data/resume2';

export type Route =
  | { kind: 'home' }
  | { kind: 'blog' }
  | { kind: 'post'; slug: string }
  | { kind: 'notfound' };

/** Canonical client-side path: strip query/hash, drop a trailing slash. */
export function normalizePath(raw: string): string {
  const bare = raw.split('#')[0].split('?')[0];
  if (!bare || bare === '/') return '/';
  return bare.length > 1 && bare.endsWith('/') ? bare.slice(0, -1) : bare;
}

export function findPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}

export function matchRoute(raw: string): Route {
  const path = normalizePath(raw);
  if (path === '/') return { kind: 'home' };
  if (path === '/blog') return { kind: 'blog' };
  const m = /^\/blog\/([\w-]+)$/.exec(path);
  if (m) return findPost(m[1]) ? { kind: 'post', slug: m[1] } : { kind: 'notfound' };
  return { kind: 'notfound' };
}

/** Trailing-slash canonical path for links, sitemap, and JSON-LD. */
export function canonicalPath(route: Route): string {
  if (route.kind === 'post') return `/blog/${route.slug}/`;
  if (route.kind === 'blog') return '/blog/';
  return '/';
}

/** Every piece of text in a post: paragraphs, list items, and code. */
function postWords(post: { summary: string; blocks: any[] }): number {
  const parts: string[] = [post.summary];
  for (const b of post.blocks) {
    parts.push(b.h);
    for (const item of b.p) {
      if (typeof item === 'string') parts.push(item);
      else if (item.list) parts.push(...item.list);
      else if (item.code) parts.push(item.code);
    }
  }
  return parts.join(' ').split(/\s+/).filter(Boolean).length;
}

/** Read time from the actual word count (~220 wpm), so the label can't drift. */
export function readTime(post: { summary: string; blocks: any[] }): string {
  return `${Math.max(1, Math.round(postWords(post) / 220))} min read`;
}
