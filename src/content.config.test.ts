import { describe, it, expect } from "vitest";
import { projectSchema, skillSchema } from "./content.config";

describe("projectSchema", () => {
  it("accepts a valid project", () => {
    const r = projectSchema.safeParse({
      title: "X", summary: "y", date: "2026-01-01", disciplines: ["ai"],
    });
    expect(r.success).toBe(true);
  });

  it("rejects an unknown discipline", () => {
    const r = projectSchema.safeParse({
      title: "X", summary: "y", date: "2026-01-01", disciplines: ["nope"],
    });
    expect(r.success).toBe(false);
  });

  it("rejects an empty disciplines array", () => {
    const r = projectSchema.safeParse({
      title: "X", summary: "y", date: "2026-01-01", disciplines: [],
    });
    expect(r.success).toBe(false);
  });
});

describe("skillSchema", () => {
  it("accepts a valid skill", () => {
    const r = skillSchema.safeParse({
      name: "TypeScript", category: "Languages", disciplines: ["webdev"],
    });
    expect(r.success).toBe(true);
  });

  it("rejects an unknown discipline", () => {
    const r = skillSchema.safeParse({
      name: "TypeScript", category: "Languages", disciplines: ["frontend"],
    });
    expect(r.success).toBe(false);
  });
});