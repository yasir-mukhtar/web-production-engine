import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { makeSchemas } from '@wps/core/content-schema.spike';

// The schema shapes travel from packages/core; only the loader and base
// path are per-site. image() is injected by Astro's schema context.
const site = defineCollection({
  loader: glob({ pattern: 'content/site.yml', base: './' }),
  schema: ({ image }) => makeSchemas({ image }).site,
});

const home = defineCollection({
  loader: glob({ pattern: 'content/home.md', base: './' }),
  schema: ({ image }) => makeSchemas({ image }).home,
});

const about = defineCollection({
  loader: glob({ pattern: 'content/about.md', base: './' }),
  schema: ({ image }) => makeSchemas({ image }).about,
});

const services = defineCollection({
  loader: glob({ pattern: 'content/services/*.md', base: './' }),
  schema: ({ image }) => makeSchemas({ image }).services,
});

const testimonials = defineCollection({
  loader: glob({ pattern: 'content/testimonials/*.md', base: './' }),
  schema: ({ image }) => makeSchemas({ image }).testimonials,
});

const faq = defineCollection({
  loader: glob({ pattern: 'content/faq/*.md', base: './' }),
  schema: ({ image }) => makeSchemas({ image }).faq,
});

export const collections = { site, home, about, services, testimonials, faq };
