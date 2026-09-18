import { Link } from "@tanstack/react-router";
import type { BlogPost } from "@/types/blog";
import { formatBlogDate } from "@/lib/blog.utils";

/** Portada del artículo: imagen si existe, portada editorial si no. */
export function BlogCover({ post, className = "" }: { post: BlogPost; className?: string }) {
  if (post.coverImage) {
    return (
      <div className={`blog-cover ${className}`.trim()}>
        <img src={post.coverImage} alt={post.coverImageAlt || post.title} loading="lazy" />
      </div>
    );
  }

  return (
    <div className={`blog-cover blog-cover-placeholder ${className}`.trim()} aria-hidden="true">
      <span className="blog-cover-mark">RCKT</span>
      <span className="blog-cover-cat">{post.category}</span>
    </div>
  );
}

export function BlogMeta({ post }: { post: BlogPost }) {
  return (
    <p className="blog-meta">
      <time dateTime={post.publishedAt}>{formatBlogDate(post.publishedAt)}</time>
      <span aria-hidden="true"> · </span>
      <span>{post.readingTime} min de lectura</span>
    </p>
  );
}

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="blog-card rv">
      <Link className="blog-card-link" to="/blog/$slug" params={{ slug: post.slug }}>
        <BlogCover post={post} />
        <span className="blog-chip">{post.category}</span>
        <h3>{post.title}</h3>
        <p className="blog-excerpt">{post.excerpt}</p>
        <BlogMeta post={post} />
        <span className="blog-readmore">Leer artículo →</span>
      </Link>
    </article>
  );
}

export function BlogFeatured({ post }: { post: BlogPost }) {
  return (
    <article className="blog-featured rv">
      <Link className="blog-featured-link" to="/blog/$slug" params={{ slug: post.slug }}>
        <BlogCover post={post} className="blog-cover-lg" />
        <div className="blog-featured-body">
          <span className="kicker ital-label">Destacado</span>
          <span className="blog-chip">{post.category}</span>
          <h2>{post.title}</h2>
          <p className="blog-excerpt">{post.excerpt}</p>
          <BlogMeta post={post} />
          <span className="blog-readmore">Leer artículo →</span>
        </div>
      </Link>
    </article>
  );
}
