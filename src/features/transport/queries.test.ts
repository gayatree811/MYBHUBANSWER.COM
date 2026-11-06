import { describe, expect, it } from "vitest";
import type { BusRoute } from "@/features/transport/busRoutes";
import { findBusRoutes } from "@/features/transport/queries";
import { BUS_ROUTES as SEEDED, ROUTE_DIRECTORY_SOURCE } from "@/server/seed/busRoutes";

const BUS_ROUTES: BusRoute[] = SEEDED.map((route) => ({
  ...route,
  directorySource: ROUTE_DIRECTORY_SOURCE,
}));

describe("bus routes", () => {
  it("has unique slugs", () => {
    expect(new Set(BUS_ROUTES.map((route) => route.slug)).size).toBe(BUS_ROUTES.length);
  });

  it("finds routes by number and by a known stop", () => {
    expect(findBusRoutes(BUS_ROUTES, "13E").map((route) => route.number)).toContain("13E");
    expect(findBusRoutes(BUS_ROUTES, "Ram Mandir").map((route) => route.number)).toContain("32");
  });

  it("filters by hub", () => {
    expect(
      findBusRoutes(BUS_ROUTES, "", "airport").every((route) =>
        JSON.stringify(route).includes("Airport"),
      ),
    ).toBe(true);
  });

  it("leaves stops empty when none are confirmed", () => {
    expect(BUS_ROUTES.find((route) => route.slug === "9")?.details).toBeUndefined();
  });
});
