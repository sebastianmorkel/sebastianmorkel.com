import { getCollection } from "astro:content";

export type Discipline = "ai" | "softwaredev" | "webdev" | "quant";

// Minimal shape both real entries and fixtures satisfy.
export interface SkillLike {
  data: { name: string; disciplines: Discipline[] };
}

// Pure filter (testable, no Astro runtime)
export function filterSkillsByDiscipline<T extends SkillLike>(skills: T[], d: Discipline): T[] {
  return skills.filter((s) => s.data.disciplines.includes(d));
}

// getCollection-backed wrapper
export async function getSkillsByDiscipline(d: Discipline) {
  return filterSkillsByDiscipline(await getCollection("skills"), d);
}