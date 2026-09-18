import type { BlogCategory } from "@/types/blog";

export function BlogSearch({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="blog-search">
      <label className="sr-only" htmlFor="blogSearch">
        Buscar artículos
      </label>
      <input
        id="blogSearch"
        type="search"
        placeholder="Buscar artículos"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export function BlogCategories({
  categories,
  active,
  onSelect,
}: {
  categories: BlogCategory[];
  active: string;
  onSelect: (category: string) => void;
}) {
  return (
    <div className="blog-chips" role="group" aria-label="Filtrar por categoría">
      <button
        type="button"
        className={active === "todas" ? "blog-chip-btn is-active" : "blog-chip-btn"}
        onClick={() => onSelect("todas")}
      >
        Todas
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          type="button"
          className={active === category.name ? "blog-chip-btn is-active" : "blog-chip-btn"}
          onClick={() => onSelect(category.name)}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}
