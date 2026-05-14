import BLOG_DATA from "@/data/blog.json";

export type BlogPost = (typeof BLOG_DATA)[0];

export const BLOG_POSTS: BlogPost[] = BLOG_DATA;

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getPostsSorted(): BlogPost[] {
  return [...BLOG_POSTS].sort((a, b) => b.date.localeCompare(a.date));
}

export function getAllTags(): string[] {
  const set = new Set<string>();
  BLOG_POSTS.forEach((p) => p.tags.forEach((t) => set.add(t)));
  return Array.from(set).sort();
}
