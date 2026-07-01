import { describe, it, expect, beforeAll } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { parse } from "yaml";
import { filterSkillsByDiscipline, type SkillLike, type Discipline } from "./skills";

// filter logic over fixtures
const fixtures: SkillLike[] = [
  { data: { name: "Python", disciplines: ["ai", "softwaredev", "quant"] } },
  { data: { name: "Astro", disciplines: ["webdev"] } },
];

describe("skills filter logic (fixtures)", () => {
  it("returns a skill under each discipline it's tagged with", () => {
    expect(filterSkillsByDiscipline(fixtures, "ai").map((s) => s.data.name)).toEqual(["Python"]);
    expect(filterSkillsByDiscipline(fixtures, "webdev").map((s) => s.data.name)).toEqual(["Astro"]);
  });
  it("excludes skills not tagged with the discipline", () => {
    expect(filterSkillsByDiscipline(fixtures, "quant").map((s) => s.data.name)).toEqual(["Python"]);
    expect(filterSkillsByDiscipline(fixtures, "ai")).not.toContainEqual(
      expect.objectContaining({ data: expect.objectContaining({ name: "Astro" }) }),
    );
  });
});

// the real skills data (one file per skill)
describe("real skills data", () => {
  let realSkills: SkillLike[];

  beforeAll(() => {
    const dir = join(process.cwd(), "src/data/skills");
    realSkills = readdirSync(dir)
      .filter((f) => f.endsWith(".yml"))
      .map((f) => ({ data: parse(readFileSync(join(dir, f), "utf8")) as SkillLike["data"] }));
  });

  it("a multi-tagged skill (Python) appears under each of its disciplines and NOT others", () => {
    const names = (d: Discipline) => filterSkillsByDiscipline(realSkills, d).map((s) => s.data.name);
    expect(names("ai")).toContain("Python");
    expect(names("softwaredev")).toContain("Python");
    expect(names("quant")).toContain("Python");
    expect(names("webdev")).not.toContain("Python");
  });
});