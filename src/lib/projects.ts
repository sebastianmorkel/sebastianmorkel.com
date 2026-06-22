import { getCollection } from "astro:content";

export type Discipline = "ai" | "softwaredev" | "webdev" | "quant";
export type Status = "live" | "in-development" | "planned";

// Minimal shape that both real collection entries and test fixtures satisfy.
export interface ProjectLike {
  data: { disciplines: Discipline[]; status: Status };
}

// Pure filters (testable, no Astro runtime)
export function filterByDiscipline<T extends ProjectLike>(projects: T[], d: Discipline): T[] {
  return projects.filter((p) => p.data.disciplines.includes(d));
}
export function filterByStatus<T extends ProjectLike>(projects: T[], s: Status): T[] {
  return projects.filter((p) => p.data.status === s);
}

// getCollection-backed wrappers
export async function getProjectsByDiscipline(d: Discipline) {
  return filterByDiscipline(await getCollection("projects"), d);
}
export async function getProjectsByStatus(s: Status) {
  return filterByStatus(await getCollection("projects"), s);
}