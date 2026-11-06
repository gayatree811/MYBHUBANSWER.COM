import { describe, expect, it } from "vitest";
import { searchSite } from "@/features/search/searchSite";

const NOW = new Date("2026-11-06T12:00:00+05:30");

describe("searchSite", () => {
  it("finds places, events, news and bus routes", () => {
    expect(searchSite("lingaraj", NOW).some((result) => result.badge === "Bus route")).toBe(true);
    expect(searchSite("marathon", NOW).some((result) => result.badge === "Event")).toBe(true);
    expect(searchSite("budget", NOW).some((result) => result.badge === "News")).toBe(true);
    expect(searchSite("rajarani", NOW)[0].title).toBe("Rajarani Temple");
  });

  it("leaves out events that have ended", () => {
    const later = new Date("2027-02-01T12:00:00+05:30");
    expect(searchSite("marathon", later).some((result) => result.badge === "Event")).toBe(false);
  });

  it("returns nothing for an empty search", () => {
    expect(searchSite("  ", NOW)).toEqual([]);
  });
});
