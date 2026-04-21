import { defineCollection, z } from "astro:content";

const papers = defineCollection({
  schema: z.object({
    title: z.string(),
    topic: z.string(),
    year: z.number().int(),
    authors: z.string(),
    venue: z.string(),
    sourceUrl: z.string().url(),
    status: z.enum(["no leido", "en progreso", "leido", "listo"]),
    memoryCue: z.string(),
    core: z.boolean().default(false),
    writtenBy: z.enum(["humano", "codex", "mixto"]).optional(),
    sectionAuthors: z.record(z.enum(["humano", "codex", "mixto"])).default({}),
    keywords: z.array(z.string()).default([])
  })
});

export const collections = { papers };
