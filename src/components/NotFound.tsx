/**
 * Catch-all for unknown paths, also emitted as dist/404.html so GitHub Pages
 * serves it with a 404 status. Points at the indexes, adds no new claims.
 */
export function NotFoundPage() {
  return (
    <main className="notfound">
      <div className="eyebrow">404</div>
      <h1>This page does not exist.</h1>
      <p>
        The post moved, or the address was never right. Start from the blog
        index or the homepage — everything here is static, so there is nothing
        else to break.
      </p>
      <div className="cta-row">
        <a href="/blog/">Blog</a>
        <a href="/">Homepage</a>
      </div>
    </main>
  );
}
