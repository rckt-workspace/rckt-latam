import type { TocItem } from "@/lib/blog.utils";

export function BlogToc({ items }: { items: TocItem[] }) {
  if (items.length < 2) return null;

  return (
    <nav className="blog-toc" aria-label="Índice del artículo">
      <h4>En este artículo</h4>
      <ul>
        {items.map((item) => (
          <li key={item.id} className={item.level === 3 ? "blog-toc-sub" : undefined}>
            <a href={`#${item.id}`}>{item.text}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
