import { defineCollection, z } from "astro:content";

const papers = defineCollection({
  schema: z.object({
    title: z.string(),
    topic: z.string(),
    year: z.number().int(),
    authors: z.string(),
    venue: z.string(),
    sourceUrl: z.string().url(),
    status: z.enum(["pendiente", "en progreso", "listo"]),
    keywords: z.array(z.string()).default([])
  })
});

export const collections = { papers };
