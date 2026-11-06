import { z } from "zod";

const text = (max: number) => z.string().trim().min(1).max(max);
const webUrl = z.url({ protocol: /^https?$/ }).max(600);
const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}/, "Enter a valid date.");

export const slugSchema = z
  .string()
  .trim()
  .max(80)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers and hyphens.");

export const statusSchema = z.enum(["draft", "published"]);

const sourceSchema = z.object({ name: text(120), url: webUrl });

/** A photo can't be published without its credit. */
const photoSchema = z.object({
  src: webUrl,
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  alt: text(200),
  title: text(160),
  author: text(120),
  license: text(60),
  licenseUrl: webUrl,
  sourceUrl: webUrl,
});

const published = {
  slug: slugSchema,
  status: statusSchema,
  source: sourceSchema,
  lastChecked: isoDate,
};

export const placeSchema = z.object({
  ...published,
  kind: z.enum(["place", "food"]),
  name: text(120),
  category: slugSchema,
  summary: text(200),
  description: text(2000),
  area: text(120),
  coordinates: z
    .object({ lat: z.number().min(19.8).max(20.8), lng: z.number().min(85.4).max(86.3) })
    .optional(),
  photo: photoSchema.optional(),
  photoIsIllustrative: z.boolean().optional(),
  hours: z.object({ text: text(200), source: sourceSchema }).optional(),
  cuisines: z.array(text(60)).max(20).optional(),
  priceBand: z.enum(["budget", "mid", "premium"]).optional(),
  priceNote: text(120).optional(),
  phone: text(30).optional(),
});

export const categorySchema = z.object({
  slug: slugSchema,
  label: text(60),
  group: z.enum(["place", "food", "event", "news"]),
});

export const eventSchema = z
  .object({
    ...published,
    name: text(160),
    category: slugSchema,
    summary: text(300),
    startsAt: isoDate,
    endsAt: isoDate,
    venue: text(200),
    organizer: text(160).optional(),
    photo: photoSchema.optional(),
  })
  .refine((event) => new Date(event.startsAt) <= new Date(event.endsAt), {
    message: "The end must be after the start.",
    path: ["endsAt"],
  });

export const newsArticleSchema = z.object({
  slug: slugSchema,
  status: statusSchema,
  title: text(200),
  topic: slugSchema,
  summary: text(1200),
  publishedAt: isoDate,
  source: sourceSchema,
  photo: photoSchema.optional(),
});

export const busRouteSchema = z.object({
  slug: slugSchema,
  status: statusSchema,
  number: text(30),
  from: text(120),
  to: text(120),
  directorySource: sourceSchema,
  details: z
    .object({
      timetableNote: text(200),
      sourceDate: text(40),
      sourceUrl: webUrl,
      stops: z.array(text(120)).min(1).max(150),
    })
    .optional(),
});

export const busStopSchema = z.object({
  slug: slugSchema,
  status: statusSchema,
  name: text(120),
  routes: z.array(text(30)).max(100).optional(),
});

export const personSchema = z.object({
  ...published,
  name: text(120),
  role: text(120).optional(),
  biography: text(2000),
  photo: photoSchema.optional(),
});

export const businessSchema = z.object({
  ...published,
  name: text(120),
  category: text(80),
  description: text(1000),
  area: text(120),
  phone: text(30).optional(),
  website: webUrl.optional(),
});

export const roleSchema = z.enum(["admin", "editor"]);

const email = z.email().max(200).toLowerCase();
const password = z.string().min(12, "Use at least 12 characters.").max(200);

export const userSchema = z.object({
  email,
  name: text(120),
  role: roleSchema,
  active: z.boolean(),
  password: password.optional(),
});

export const loginSchema = z.object({ email, password: z.string().min(1).max(200) });

export const setupSchema = z.object({ email, name: text(120), password });

export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).max(10000).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});
