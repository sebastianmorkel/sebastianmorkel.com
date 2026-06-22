import { defineCollection, z } from "astro:content";
import { glob, file } from "astro/loaders";

// One shared vocabulary for disciplines
const DISCIPLINES = ["ai", "softwaredev", "webdev", "quant"] as const;
// Make sure at least one
const disciplines = z.array(z.enum(DISCIPLINES)).min(1);

// Projects: Markdown files in src/content/projects/*.md

export const projectSchema = z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    disciplines,
    status: z.enum(["live", "in-development", "planned"]).default("live"),
    links: z.record(z.string(), z.string().url()).optional(),   // e.g. { github: "...", site: "..." }

    media: z.array(z.string()).optional(),           // image/asset paths
    demo: z
        .object({
        mode: z.enum(["embed", "link", "recorded", "none"]),
        url: z.string().url().optional(),
        })
        .default({ mode: "none" }),
    featured: z.boolean().default(false),
});

const projects = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
    schema: projectSchema,
});

// Skills: one data file, array of entries each with an `id`
export const skillSchema = z.object({
    name: z.string(),
    category: z.string(),                            // Languages | Frameworks | Tools | Concepts
    disciplines,
    level: z.enum(["familiar", "proficient", "advanced"]).optional(),
});

const skills = defineCollection({
    loader: file("src/data/skills.yaml"),
    schema: skillSchema,
});

export const collections = { projects, skills };