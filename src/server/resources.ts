import type { z } from "zod";
import {
  busRouteSchema,
  busStopSchema,
  businessSchema,
  categorySchema,
  eventSchema,
  newsArticleSchema,
  personSchema,
  placeSchema,
  userSchema,
} from "@/server/schemas";

export type Resource = {
  collection: string;
  schema: z.ZodType;
  /** Public API name. Leave out for records with no public endpoint. */
  publicFilters?: string[];
  adminOnly?: boolean;
  sort: Record<string, 1 | -1>;
};

export const RESOURCES: Record<string, Resource> = {
  places: {
    collection: "places",
    schema: placeSchema,
    publicFilters: ["kind", "category"],
    sort: { name: 1 },
  },
  categories: {
    collection: "categories",
    schema: categorySchema,
    publicFilters: ["group"],
    sort: { group: 1, label: 1 },
  },
  events: {
    collection: "events",
    schema: eventSchema,
    publicFilters: ["category"],
    sort: { startsAt: 1 },
  },
  news: {
    collection: "newsArticles",
    schema: newsArticleSchema,
    publicFilters: ["topic"],
    sort: { publishedAt: -1 },
  },
  "bus-routes": {
    collection: "busRoutes",
    schema: busRouteSchema,
    publicFilters: [],
    sort: { number: 1 },
  },
  "bus-stops": {
    collection: "busStops",
    schema: busStopSchema,
    publicFilters: [],
    sort: { name: 1 },
  },
  people: { collection: "people", schema: personSchema, publicFilters: [], sort: { name: 1 } },
  businesses: {
    collection: "businesses",
    schema: businessSchema,
    publicFilters: ["category"],
    sort: { name: 1 },
  },
  users: { collection: "users", schema: userSchema, adminOnly: true, sort: { email: 1 } },
};
