import { describe, expect, it } from "vitest";
import { getUpcomingEvents, hasEnded, hasStarted, type CityEvent } from "@/features/events/events";
import { EVENTS as SEEDED } from "@/server/seed/events";

const EVENTS: CityEvent[] = SEEDED.map((event) => ({ ...event, status: "published" }));

const NOW = new Date("2026-11-06T12:00:00+05:30");

describe("events", () => {
  it("has unique slugs and valid date ranges", () => {
    expect(new Set(EVENTS.map((event) => event.slug)).size).toBe(EVENTS.length);
    for (const event of EVENTS) {
      expect(new Date(event.startsAt) < new Date(event.endsAt)).toBe(true);
    }
  });

  it("lists events soonest first and removes past events", () => {
    const events = getUpcomingEvents(EVENTS, new Date("2026-11-20T00:00:00+05:30"));
    const starts = events.map((event) => event.startsAt);

    expect(starts).toEqual([...starts].sort());
    expect(events.some((event) => event.slug === "yi-run-for-mental-health-2026")).toBe(false);
  });

  it("filters by category", () => {
    const events = getUpcomingEvents(EVENTS, NOW, "sports");
    expect(events.length).toBeGreaterThan(0);
    expect(events.every((event) => event.category === "sports")).toBe(true);
  });

  it("knows whether an event is under way", () => {
    const event = EVENTS.find(({ slug }) => slug.startsWith("osba"))!;
    expect(hasStarted(event, NOW)).toBe(true);
    expect(hasEnded(event, NOW)).toBe(false);
  });
});
