import { describe, it, expect, beforeAll } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import matterImport from "gray-matter";
import {
  filterByDiscipline,
  filterByStatus,
  type ProjectLike,
  type Discipline,
} from "./projects";

// normalise the default export across interop shapes.
const matter = (matterImport as any).default ?? matterImport;

// filter logic over fixtures
const fixtures: ProjectLike[] = [
  { data: { disciplines: ["ai", "softwaredev", "webdev"], status: "live" } },
  { data: { disciplines: ["webdev"], status: "in-development" } },
];

describe("filter logic (fixtures)", () => {
  it("includes a project for each discipline it's tagged with", () => {
    expect(filterByDiscipline(fixtures, "ai")).toHaveLength(1);
    expect(filterByDiscipline(fixtures, "webdev")).toHaveLength(2);
  });
  it("excludes disciplines it isn't tagged with", () => {
    expect(filterByDiscipline(fixtures, "quant")).toHaveLength(0);
  });
  it("splits by status", () => {
    expect(filterByStatus(fixtures, "live")).toHaveLength(1);
    expect(filterByStatus(fixtures, "in-development")).toHaveLength(1);
  });
});

// the real seed frontmatter
describe("real seed content", () => {
  let realProjects: (ProjectLike & { data: { title: string } })[];

  beforeAll(() => {
    const dir = join(process.cwd(), "src/content/projects");
    realProjects = readdirSync(dir)
      .filter((f) => f.endsWith(".md"))
      .map((f) => ({
        data: matter(readFileSync(join(dir, f), "utf8")).data as ProjectLike["data"] & {
          title: string;
        },
      }));
  });

  it("Budget Coach resolves for ai, softwaredev, webdev — and NOT quant", () => {
    const titles = (d: Discipline) =>
      filterByDiscipline(realProjects, d).map((p) => p.data.title);
    expect(titles("ai")).toContain("AI Budget Coach");
    expect(titles("softwaredev")).toContain("AI Budget Coach");
    expect(titles("webdev")).toContain("AI Budget Coach");
    expect(titles("quant")).not.toContain("AI Budget Coach");
  });

  it("splits real projects by status without leaking in-dev into the live set", () => {
    const live = filterByStatus(realProjects, "live");
    const inDev = filterByStatus(realProjects, "in-development");
    expect(live.length).toBeGreaterThan(0); // CVs + discipline pages need shipped work
    const liveTitles = new Set(live.map((p) => p.data.title));
    for (const p of inDev) expect(liveTitles.has(p.data.title)).toBe(false);
  });
});