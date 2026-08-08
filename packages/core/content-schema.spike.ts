/**
 * packages/core/content-schema.spike.ts
 *
 * The CONTENT CONTRACT, executable: the canonical shape of a business
 * website's information, in business vocabulary. One definition, shared by
 * every site. This is a spike artifact — it becomes versioned history only
 * after three real clients (Rule of Three), never before.
 *
 * Two deliberate constraints (verified against Astro 6.4.8 types):
 *
 * 1. Zod comes from "astro/zod" (a re-export of zod/v4). "astro:content"
 *    does not resolve outside an Astro build, so the shared file cannot
 *    import it.
 *
 * 2. Astro's image() helper is INJECTED into the schema function
 *    (SchemaContext.image) — it does not exist on the z namespace
 *    (z.image is undefined in zod/v4). A plain exported Zod object can
 *    therefore never contain an image field. So this file exports a
 *    FACTORY; each site calls it inside its own schema function with the
 *    image helper Astro hands it:
 *
 *      schema: ({ image }) => makeSchemas({ image }).services
 *
 * Only the Zod shapes travel between sites; each site keeps its own
 * glob() loader and base path.
 */
import { z } from 'astro/zod';
import type { ImageFunction } from 'astro/content/config';

/** Accepts a missing, empty, or valid URL — an editor leaving a field
 *  blank writes "", which a plain z.string().url() would reject. */
const urlOrEmpty = () => z.string().url().or(z.literal('')).optional();

export const makeSchemas = ({ image }: { image: ImageFunction }) => ({
  /** Global business facts. Feeds SiteHead (SEO/JSON-LD) and the chrome. */
  site: z.object({
    name: z.string(),
    tagline: z.string(),
    logo: image(),
    address: z.object({
      street: z.string(),
      city: z.string(),
      province: z.string(),
      postal_code: z.string(),
    }),
    geo: z.object({
      lat: z.number(),
      lng: z.number(),
    }),
    hours: z.string(),
    phone: z.string(),
    socials: z.object({
      instagram: urlOrEmpty(),
      facebook: urlOrEmpty(),
      tiktok: urlOrEmpty(),
      linkedin: urlOrEmpty(),
    }),
    contact: z.object({
      whatsapp_number: z.string(),
      whatsapp_default_message: z.string(),
    }),
    seo: z.object({
      title_template: z.string(),
      description: z.string(),
      og_image: image(),
    }),
  }),

  /** Home page: hero copy + per-section intro copy. Section ORDER lives
   *  in src/pages/index.astro, in code — never here. */
  home: z.object({
    hero: z.object({
      headline: z.string(),
      subheadline: z.string(),
      cta_label: z.string(),
    }),
    services_intro: z.object({
      title: z.string(),
      description: z.string(),
    }),
    testimonials_intro: z.object({
      title: z.string(),
      description: z.string(),
    }),
    faq_intro: z.object({
      title: z.string(),
      description: z.string(),
    }),
  }),

  about: z.object({
    title: z.string(),
    body: z.string(),
    image: image(),
  }),

  services: z.object({
    title: z.string(),
    summary: z.string(),
    body: z.string(),
    image: image(),
    order: z.number().int().positive(),
    durasi_estimasi: z.string(),
  }),

  testimonials: z.object({
    quote: z.string(),
    name: z.string(),
    role: z.string(),
    company: z.string(),
    photo: image(),
  }),

  faq: z.object({
    question: z.string(),
    answer: z.string(),
  }),
});
