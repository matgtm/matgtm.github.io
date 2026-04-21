import { defineCollection, z } from "astro:content";

const papers = defineCollection({
  schema: z.object({
    title: z.string(),
    topic: z.string(),
    year: z.number().int(),
    authors: z.string(),
    venue: z.string(),
    sourceUrl: z.string().url(),
    status: z.enum(["pendiente", "en progreso", "leido", "listo"]),
    memoryCue: z.string(),
    core: z.boolean().default(false),
    writtenBy: z.enum(["sin completar", "humano", "codex", "mixto"]).default("sin completar"),
    keywords: z.array(z.string()).default([])
  })
});

export const collections = { papers };
