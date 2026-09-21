import type { BlogRepository } from "@/types/blog";
import { supablogRepository } from "@/lib/supabase-blog-repository";

/**
 * Blog Repository - Supabase implementation
 *
 * Source of truth: blog_posts and blog_categories in Supabase
 * Previous localStorage implementation removed (see git history if needed)
 *
 * UI consumes this interface without knowing the backend changed.
 */
export const blogRepository: BlogRepository = supablogRepository;

/** Indica si hay cambios guardados localmente (compatibilidad legacy). */
export function hasLocalBlogChanges(): boolean {
  return false;
}
