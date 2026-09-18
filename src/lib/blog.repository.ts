import categoriesSeed from "@/data/blog/categories.json";
import postsSeed from "@/data/blog/posts.json";
import type { BlogCategory, BlogPost, BlogPostInput, BlogRepository } from "@/types/blog";
import { estimateReadingTime, normalizeQuery, postSearchText } from "@/lib/blog.utils";

/**
 * Implementación temporal del repositorio del Blog.
 *
 *   posts.json  ->  cambios locales (localStorage)  ->  UI
 *
 * La interfaz de usuario nunca importa el JSON ni toca localStorage: todo pasa
 * por aquí, de modo que sustituir esta clase por `SupabaseBlogRepository`
 * no requiere cambios en los componentes.
 */

const STORAGE_KEY = "rckt.blog.posts.v1";

const seedPosts = postsSeed as BlogPost[];
const seedCategories = categoriesSeed as BlogCategory[];

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function sortByDate(posts: BlogPost[]): BlogPost[] {
  return [...posts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

function readOverrides(): BlogPost[] | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as BlogPost[]) : null;
  } catch {
    return null;
  }
}

function writeOverrides(posts: BlogPost[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  } catch (error) {
    console.error("No se pudieron guardar los cambios locales del blog", error);
  }
}

class JsonBlogRepository implements BlogRepository {
  private load(): BlogPost[] {
    return readOverrides() ?? clone(seedPosts);
  }

  async getAllPosts(): Promise<BlogPost[]> {
    return sortByDate(this.load());
  }

  async getPublishedPosts(): Promise<BlogPost[]> {
    return sortByDate(this.load().filter((post) => post.status === "published"));
  }

  async getPostBySlug(slug: string): Promise<BlogPost | null> {
    return this.load().find((post) => post.slug === slug) ?? null;
  }

  async getPostsByCategory(category: string): Promise<BlogPost[]> {
    const posts = await this.getPublishedPosts();
    if (!category || category === "todas") return posts;
    return posts.filter((post) => post.category === category);
  }

  async searchPosts(query: string, category?: string): Promise<BlogPost[]> {
    const posts = await this.getPostsByCategory(category ?? "todas");
    const q = normalizeQuery(query);
    if (!q) return posts;
    const terms = q.split(/\s+/);
    return posts.filter((post) => {
      const haystack = postSearchText(post);
      return terms.every((term) => haystack.includes(term));
    });
  }

  async getRelatedPosts(post: BlogPost, limit = 3): Promise<BlogPost[]> {
    const posts = (await this.getPublishedPosts()).filter((p) => p.id !== post.id);
    const scored = posts.map((candidate) => {
      const sharedTags = candidate.tags.filter((tag) => post.tags.includes(tag)).length;
      const sameCategory = candidate.category === post.category ? 3 : 0;
      return { candidate, score: sameCategory + sharedTags };
    });
    return scored
      .sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        return new Date(b.candidate.publishedAt).getTime() - new Date(a.candidate.publishedAt).getTime();
      })
      .slice(0, limit)
      .map((item) => item.candidate);
  }

  async getCategories(): Promise<BlogCategory[]> {
    return clone(seedCategories);
  }

  async savePost(input: BlogPostInput): Promise<BlogPost> {
    const posts = this.load();
    const now = new Date().toISOString();
    const post: BlogPost = {
      ...input,
      readingTime: input.readingTime ?? estimateReadingTime(input.content),
      updatedAt: now,
    };
    const index = posts.findIndex((p) => p.id === post.id);
    if (index >= 0) posts[index] = post;
    else posts.unshift(post);
    writeOverrides(posts);
    return post;
  }

  async deletePost(id: string): Promise<void> {
    writeOverrides(this.load().filter((post) => post.id !== id));
  }

  async exportPosts(): Promise<BlogPost[]> {
    return sortByDate(this.load());
  }

  async resetToSeed(): Promise<void> {
    if (typeof window === "undefined") return;
    window.localStorage.removeItem(STORAGE_KEY);
  }
}

export const blogRepository: BlogRepository = new JsonBlogRepository();

/** Indica si hay cambios guardados localmente (solo informativo para el panel). */
export function hasLocalBlogChanges(): boolean {
  return readOverrides() !== null;
}
