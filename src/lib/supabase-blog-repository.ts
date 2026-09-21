import { supabase } from "@/integrations/supabase/client";
import type {
  BlogRepository,
  BlogPost,
  BlogCategory,
  BlogPostInput,
  BlogStatus,
} from "@/types/blog";
import { estimateReadingTime, normalizeQuery, postSearchText } from "@/lib/blog.utils";

/**
 * Supabase-backed Blog Repository
 *
 * Implements BlogRepository using Supabase tables:
 * - blog_posts (status = 'published' AND published_at <= now() for public)
 * - blog_categories (active = true for public)
 *
 * Admin operations (savePost, deletePost) are prepared for server-side implementation.
 * Currently throws NotImplementedError for writes until /ops/blog is complete.
 */
export class SupabaseBlogRepository implements BlogRepository {
  /**
   * Map Supabase blog_posts row to BlogPost type
   */
  private mapRowToPost(row: any): BlogPost {
    return {
      id: row.id,
      slug: row.slug,
      title: row.title,
      excerpt: row.excerpt || "",
      content: row.content,
      coverImage: row.cover_image_path || "",
      coverImageAlt: "",
      author: {
        name: row.author_name || "RCKT",
        role: "Team",
      },
      category: row.category_id || "", // Store category_id for filtering
      tags: Array.isArray(row.tags) ? row.tags : [],
      status: row.status as BlogStatus,
      featured: row.featured || false,
      publishedAt: row.published_at || new Date().toISOString(),
      updatedAt: row.updated_at || new Date().toISOString(),
      readingTime: Math.ceil(row.content.split(/\s+/).length / 200),
      seo: {
        title: row.seo_title || row.title,
        description: row.seo_description || row.excerpt || "",
        canonical: "",
      },
    };
  }

  /**
   * Get all posts (published only for public)
   */
  async getAllPosts(): Promise<BlogPost[]> {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("status", "published")
      .lte("published_at", new Date().toISOString())
      .order("published_at", { ascending: false });

    if (error) {
      console.error("[Blog] getAllPosts error:", error);
      return [];
    }

    return (data || []).map((row) => this.mapRowToPost(row));
  }

  /**
   * Get published posts only
   */
  async getPublishedPosts(): Promise<BlogPost[]> {
    return this.getAllPosts();
  }

  /**
   * Get post by slug
   */
  async getPostBySlug(slug: string): Promise<BlogPost | null> {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", slug)
      .eq("status", "published")
      .lte("published_at", new Date().toISOString())
      .maybeSingle();

    if (error || !data) {
      return null;
    }

    return this.mapRowToPost(data);
  }

  /**
   * Get posts by category
   */
  async getPostsByCategory(categorySlug: string): Promise<BlogPost[]> {
    if (!categorySlug || categorySlug === "todas") {
      return this.getPublishedPosts();
    }

    // First, get the category to find its ID
    const { data: categoryData, error: catError } = await supabase
      .from("blog_categories")
      .select("id")
      .eq("slug", categorySlug)
      .eq("active", true)
      .maybeSingle();

    if (catError || !categoryData) {
      return [];
    }

    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("category_id", categoryData.id)
      .eq("status", "published")
      .lte("published_at", new Date().toISOString())
      .order("published_at", { ascending: false });

    if (error) {
      return [];
    }

    return (data || []).map((row) => this.mapRowToPost(row));
  }

  /**
   * Search posts by query and optional category
   */
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

  /**
   * Get related posts by category and tags
   */
  async getRelatedPosts(post: BlogPost, limit = 3): Promise<BlogPost[]> {
    const posts = await this.getPublishedPosts();
    const otherPosts = posts.filter((p) => p.id !== post.id);

    const scored = otherPosts.map((candidate) => {
      const sharedTags = candidate.tags.filter((tag) =>
        post.tags.includes(tag)
      ).length;
      const sameCategory = candidate.category === post.category ? 3 : 0;
      return { candidate, score: sameCategory + sharedTags };
    });

    return scored
      .sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        return (
          new Date(b.candidate.publishedAt).getTime() -
          new Date(a.candidate.publishedAt).getTime()
        );
      })
      .slice(0, limit)
      .map((item) => item.candidate);
  }

  /**
   * Get all active categories
   */
  async getCategories(): Promise<BlogCategory[]> {
    const { data, error } = await supabase
      .from("blog_categories")
      .select("id, name, slug")
      .eq("active", true)
      .order("orden", { ascending: true });

    if (error) {
      console.error("[Blog] getCategories error:", error);
      return [];
    }

    return (data || []).map((row) => ({
      id: row.id,
      name: row.name,
      slug: row.slug,
    }));
  }

  /**
   * Save post (admin operation - server-side)
   */
  async savePost(input: BlogPostInput): Promise<BlogPost> {
    try {
      const method = input.id ? "PUT" : "POST";
      const response = await fetch("/api/admin/people/blog", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      if (response.status === 401) {
        window.location.href = "/ops/login?next=/rckt-equipo";
        throw new Error("Session expired");
      }

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to save post");
      }

      const saved = await response.json();
      return this.mapRowToPost(saved[0] || saved);
    } catch (e) {
      console.error("Error saving blog post:", e);
      throw e;
    }
  }

  /**
   * Delete post (admin operation - server-side)
   */
  async deletePost(id: string): Promise<void> {
    try {
      const response = await fetch("/api/admin/people/blog", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (response.status === 401) {
        window.location.href = "/ops/login?next=/rckt-equipo";
        throw new Error("Session expired");
      }

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to delete post");
      }
    } catch (e) {
      console.error("Error deleting blog post:", e);
      throw e;
    }
  }

  /**
   * Export posts (admin operation)
   */
  async exportPosts(): Promise<BlogPost[]> {
    return this.getAllPosts();
  }

  /**
   * Reset to seed (no-op with Supabase)
   */
  async resetToSeed(): Promise<void> {
    // No-op: Supabase is source of truth
    console.log("[Blog] Reset requested but Supabase is source of truth");
  }
}

// Export singleton instance
export const supablogRepository = new SupabaseBlogRepository();
