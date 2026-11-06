import { describe, expect, it } from "vitest";
import { searchSite, type SearchContent } from "@/features/search/searchSite";
import { BUS_ROUTES, ROUTE_DIRECTORY_SOURCE } from "@/server/seed/busRoutes";
import { EVENTS } from "@/server/seed/events";
import { FOOD_PLACES } from "@/server/seed/food";
import { ARTICLES } from "@/server/seed/news";
import { PLACES } from "@/server/seed/places";

const CONTENT: SearchContent = {
  listings: [...PLACES, ...FOOD_PLACES],
  events: EVENTS.map((event) => ({ ...event, status: "published" })),
  articles: ARTICLES.map((article) => ({ ...article, status: "published" })),
  busRoutes: BUS_ROUTES.map((route) => ({ ...route, directorySource: ROUTE_DIRECTORY_SOURCE })),
};

const NOW = new Date("2026-11-06T12:00:00+05:30");

describe("searchSite", () => {
  it("finds places, events, news and bus routes", () => {
    expect(
      searchSite("lingaraj", NOW, CONTENT).some((result) => result.badge === "Bus route"),
    ).toBe(true);
    expect(searchSite("marathon", NOW, CONTENT).some((result) => result.badge === "Event")).toBe(
      true,
    );
    expect(searchSite("budget", NOW, CONTENT).some((result) => result.badge === "News")).toBe(true);
    expect(searchSite("rajarani", NOW, CONTENT)[0].title).toBe("Rajarani Temple");
  });

  it("leaves out events that have ended", () => {
    const later = new Date("2027-02-01T12:00:00+05:30");
    expect(searchSite("marathon", later, CONTENT).some((result) => result.badge === "Event")).toBe(
      false,
    );
  });

  it("returns nothing for an empty search", () => {
    expect(searchSite("  ", NOW, CONTENT)).toEqual([]);
  });
});
