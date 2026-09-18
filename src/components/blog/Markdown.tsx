import { Fragment, type ReactNode } from "react";
import { extractToc } from "@/lib/blog.utils";

/**
 * Intérprete de Markdown mínimo que produce elementos de React.
 * No usa dangerouslySetInnerHTML: el contenido nunca se inyecta como HTML.
 */

function safeUrl(url: string): string | null {
  const value = url.trim();
  if (/^(https?:\/\/|mailto:|\/|#)/i.test(value)) return value;
  return null;
}

function inline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const pattern = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)\s]+\))/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let i = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) nodes.push(text.slice(lastIndex, match.index));
    const token = match[0];
    const key = `${keyPrefix}-i${i++}`;

    if (token.startsWith("**")) {
      nodes.push(<strong key={key}>{token.slice(2, -2)}</strong>);
    } else if (token.startsWith("`")) {
      nodes.push(<code key={key}>{token.slice(1, -1)}</code>);
    } else if (token.startsWith("[")) {
      const linkMatch = /^\[([^\]]+)\]\(([^)\s]+)\)$/.exec(token);
      const href = linkMatch ? safeUrl(linkMatch[2]) : null;
      if (linkMatch && href) {
        const external = /^https?:\/\//i.test(href);
        nodes.push(
          <a
            key={key}
            href={href}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            {linkMatch[1]}
          </a>,
        );
      } else {
        nodes.push(token);
      }
    } else {
      nodes.push(<em key={key}>{token.slice(1, -1)}</em>);
    }

    lastIndex = match.index + token.length;
  }

  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
  return nodes;
}

export function Markdown({ content }: { content: string }) {
  const headingIds = extractToc(content).map((item) => item.id);
  let headingIndex = 0;

  const lines = content.split("\n");
  const blocks: ReactNode[] = [];
  let i = 0;
  let key = 0;

  const push = (node: ReactNode) => blocks.push(<Fragment key={`b${key++}`}>{node}</Fragment>);

  while (i < lines.length) {
    const raw = lines[i];
    const line = raw.trim();

    if (!line) {
      i += 1;
      continue;
    }

    const heading = /^(#{1,3})\s+(.*)$/.exec(line);
    if (heading) {
      const level = heading[1].length;
      const text = heading[2].trim();
      if (level === 1) {
        push(<h2 className="blog-h2">{inline(text, `h${key}`)}</h2>);
      } else {
        const id = headingIds[headingIndex++] ?? undefined;
        push(
          level === 2 ? (
            <h2 className="blog-h2" id={id}>
              {inline(text, `h${key}`)}
            </h2>
          ) : (
            <h3 className="blog-h3" id={id}>
              {inline(text, `h${key}`)}
            </h3>
          ),
        );
      }
      i += 1;
      continue;
    }

    const image = /^!\[([^\]]*)\]\(([^)\s]+)\)$/.exec(line);
    if (image) {
      const src = safeUrl(image[2]);
      if (src) push(<img className="blog-body-image" src={src} alt={image[1]} loading="lazy" />);
      i += 1;
      continue;
    }

    if (line.startsWith(">")) {
      const quote: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith(">")) {
        quote.push(lines[i].trim().replace(/^>\s?/, ""));
        i += 1;
      }
      push(<blockquote className="blog-quote">{inline(quote.join(" "), `q${key}`)}</blockquote>);
      continue;
    }

    if (/^[-*]\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^[-*]\s+/, ""));
        i += 1;
      }
      push(
        <ul className="blog-list">
          {items.map((item, n) => (
            <li key={n}>{inline(item, `ul${key}-${n}`)}</li>
          ))}
        </ul>,
      );
      continue;
    }

    if (/^\d+\.\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s+/, ""));
        i += 1;
      }
      push(
        <ol className="blog-list blog-list-ordered">
          {items.map((item, n) => (
            <li key={n}>{inline(item, `ol${key}-${n}`)}</li>
          ))}
        </ol>,
      );
      continue;
    }

    if (line.startsWith("|") && line.endsWith("|")) {
      const rows: string[][] = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        const cells = lines[i]
          .trim()
          .slice(1, -1)
          .split("|")
          .map((cell) => cell.trim());
        if (!cells.every((cell) => /^:?-{2,}:?$/.test(cell))) rows.push(cells);
        i += 1;
      }
      const [head, ...body] = rows;
      push(
        <div className="blog-table-wrap">
          <table className="blog-table">
            {head && (
              <thead>
                <tr>
                  {head.map((cell, n) => (
                    <th key={n}>{inline(cell, `th${key}-${n}`)}</th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody>
              {body.map((row, r) => (
                <tr key={r}>
                  {row.map((cell, c) => (
                    <td key={c}>{inline(cell, `td${key}-${r}-${c}`)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>,
      );
      continue;
    }

    const paragraph: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() &&
      !/^(#{1,3}\s|>|[-*]\s|\d+\.\s|\|)/.test(lines[i].trim())
    ) {
      paragraph.push(lines[i].trim());
      i += 1;
    }
    push(<p className="blog-paragraph">{inline(paragraph.join(" "), `p${key}`)}</p>);
  }

  return <div className="blog-body">{blocks}</div>;
}
