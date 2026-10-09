import { readTime } from '../lib/route';

/**
 * A single static blog post: breadcrumb, article, CTA, back link.
 * Anchor CTAs are absolute — a post page has no #work or #contact.
 */
export function BlogPostPage({ post, posts, profile }: any) {
  const others = posts.filter((p: any) => p.slug !== post.slug);
  return (
    <main className="note">
      <p className="crumbs">
        <a href="/">Home</a> / <a href="/blog/">Blog</a> / {post.title}
      </p>
      <div className="eyebrow">Blog</div>
      <h1>{post.title}</h1>
      <p className="note-meta">
        {readTime(post)} · {post.tags.join(' · ')}
      </p>
      <p className="lede">{post.summary}</p>
      <div className="note-body">
        {post.blocks.map((b: any) => (
          <section key={b.h}>
            <h2>{b.h}</h2>
            {b.p.map((item: any, i: number) => {
              if (typeof item === 'string') return <p key={i}>{item}</p>;
              if (item.list) {
                return (
                  <ul key={i}>
                    {item.list.map((li: string) => <li key={li}>{li}</li>)}
                  </ul>
                );
              }
              return (
                <pre key={i}>
                  <code>{item.code}</code>
                </pre>
              );
            })}
          </section>
        ))}
      </div>
      <div className="note-related">
        <h2>More posts</h2>
        {others.length > 0 ? (
          <ul>
            {others.map((p: any) => (
              <li key={p.slug}>
                <a href={`/blog/${p.slug}/`}>{p.title}</a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="note-related-empty">More posts land here as they are written.</p>
        )}
      </div>
      <div className="note-cta" data-reveal>
        <h2>Hiring a senior frontend engineer?</h2>
        <p>{profile.availability}. Email gets the fastest reply.</p>
        <div className="cta-row">
          <a href={`mailto:${profile.email}`}>Email me</a>
          <a href="/#work">Read the case notes →</a>
        </div>
      </div>
      <a className="back" href="/blog/">
        ← All posts
      </a>
    </main>
  );
}
