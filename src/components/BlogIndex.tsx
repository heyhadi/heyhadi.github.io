import { readTime } from '../lib/route';

/**
 * Blog post list for the /blog/ route (standalone adds a breadcrumb).
 */
export function BlogIndex({ posts, standalone = false }: any) {
  return (
    <section id="blog" className="section">
      {standalone && (
        <p className="crumbs">
          <a href="/">Home</a> / Blog
        </p>
      )}
      <div className="sec-head" data-reveal>
        <div className="eyebrow">Blog</div>
        <h2 className="h2">What the case notes taught.</h2>
        <p className="standfirst">
          Short posts drawn from production work. No internal details — just the
          patterns that survived contact with production.
        </p>
      </div>
      <div className="post-grid">
        {posts.map((p: any) => (
          <article className="post-card" key={p.slug} data-reveal>
            <p className="post-meta">
              {readTime(p)} · {p.tags.join(' · ')}
            </p>
            <h3>
              <a href={`/blog/${p.slug}/`}>{p.title}</a>
            </h3>
            <p>{p.summary}</p>
            <a className="post-more" href={`/blog/${p.slug}/`}>
              Read the post →
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
