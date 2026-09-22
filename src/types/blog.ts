/**
 * Modelo de datos del Blog.
 * Los campos replican la futura tabla `blog_posts` de la base de datos,
 * de forma que la migración sea un mapeo directo.
 */

export type BlogStatus = "draft" | "published" | "archived";

export interface BlogAuthor {
  name: string;
  role: string;
}

export interface BlogSeo {
  title: string;
  description: string;
  canonical: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  /** Contenido en Markdown (futuro `content_md`). */
  content: string;
  coverImage: string;
  coverImageAlt: string;
  author: BlogAuthor;
  category: string;
  tags: string[];
  status: BlogStatus;
  featured: boolean;
  publishedAt: string;
  updatedAt: string;
  readingTime: number;
  seo: BlogSeo;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
}

/** Datos que entrega el formulario del panel interno. */
export type BlogPostInput = Omit<BlogPost, "readingTime" | "updatedAt" | "id"> &
  Partial<Pick<BlogPost, "readingTime" | "updatedAt" | "id">>;

/**
 * Contrato de datos del Blog. Hoy lo implementa `JsonBlogRepository`
 * (JSON + almacenamiento local del navegador); mañana lo puede implementar
 * `SupabaseBlogRepository` sin tocar la interfaz de usuario.
 */
export interface BlogRepository {
  getAllPosts(): Promise<BlogPost[]>;
  getPublishedPosts(): Promise<BlogPost[]>;
  getPostBySlug(slug: string): Promise<BlogPost | null>;
  getPostsByCategory(category: string): Promise<BlogPost[]>;
  searchPosts(query: string, category?: string): Promise<BlogPost[]>;
  getRelatedPosts(post: BlogPost, limit?: number): Promise<BlogPost[]>;
  getCategories(): Promise<BlogCategory[]>;
  savePost(input: BlogPostInput): Promise<BlogPost>;
  deletePost(id: string): Promise<void>;
  exportPosts(): Promise<BlogPost[]>;
  resetToSeed(): Promise<void>;
}
