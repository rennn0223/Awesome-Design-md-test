import PROJECTS_DATA from "@/data/projects.json";

export type Project = (typeof PROJECTS_DATA)[0];

export const PROJECTS: Project[] = PROJECTS_DATA;

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getAllProjectTags(): string[] {
  const set = new Set<string>();
  PROJECTS.forEach((p) => p.tags.forEach((t) => set.add(t)));
  return Array.from(set).sort();
}

export function getAllProjectCategories(): string[] {
  const cats: string[] = [];
  PROJECTS.forEach((p) => { if (!cats.includes(p.category)) cats.push(p.category); });
  return cats.sort();
}
