import { describe, expect, it } from "vitest";
import {
  busRouteSchema,
  eventSchema,
  loginSchema,
  newsArticleSchema,
  placeSchema,
  slugSchema,
  userSchema,
} from "@/server/schemas";
import { BUS_ROUTES, ROUTE_DIRECTORY_SOURCE } from "@/server/seed/busRoutes";
import { EVENTS } from "@/server/seed/events";
import { FOOD_PLACES } from "@/server/seed/food";
import { ARTICLES } from "@/server/seed/news";
import { PLACES } from "@/server/seed/places";

describe("schemas", () => {
  it("accepts all seeded content", () => {
    const status = "published";

    for (const place of [...PLACES, ...FOOD_PLACES]) {
      placeSchema.parse({ ...place, status });
    }
    for (const event of EVENTS) eventSchema.parse({ ...event, status });
    for (const article of ARTICLES) newsArticleSchema.parse({ ...article, status });
    for (const route of BUS_ROUTES) {
      busRouteSchema.parse({ ...route, status, directorySource: ROUTE_DIRECTORY_SOURCE });
    }
  });

  it("rejects unsafe slugs and operator objects", () => {
    expect(slugSchema.safeParse("Bad Slug").success).toBe(false);
    expect(loginSchema.safeParse({ email: { $ne: "" }, password: "x" }).success).toBe(false);
  });

  it("rejects an event that ends before it starts", () => {
    const result = eventSchema.safeParse({
      slug: "a",
      status: "draft",
      name: "A",
      category: "sports",
      summary: "A",
      startsAt: "2026-11-02",
      endsAt: "2026-11-01",
      venue: "A",
      source: { name: "A", url: "https://a.test" },
      lastChecked: "2026-11-01",
    });
    expect(result.success).toBe(false);
  });

  it("requires a long password", () => {
    const user = { email: "a@b.test", name: "A", role: "editor", active: true };
    expect(userSchema.safeParse({ ...user, password: "short" }).success).toBe(false);
  });
});
