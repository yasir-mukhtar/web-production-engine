import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

// Phase 1: schema-less collections; the shared Zod factory arrives in Phase 2.
const site = defineCollection({
  loader: glob({ pattern: 'content/site.yml', base: './' }),
});

const home = defineCollection({
  loader: glob({ pattern: 'content/home.md', base: './' }),
});

export const collections = { site, home };
