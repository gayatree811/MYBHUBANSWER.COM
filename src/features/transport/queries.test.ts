import { describe, expect, it } from "vitest";
import { BUS_ROUTES } from "@/features/transport/busRoutes";
import { findBusRoutes, getBusRoute } from "@/features/transport/queries";

describe("bus routes", () => {
  it("has unique slugs", () => {
    expect(new Set(BUS_ROUTES.map((route) => route.slug)).size).toBe(BUS_ROUTES.length);
  });

  it("finds routes by number and by a known stop", () => {
    expect(findBusRoutes("13E").map((route) => route.number)).toContain("13E");
    expect(findBusRoutes("Ram Mandir").map((route) => route.number)).toContain("32");
  });

  it("filters by hub", () => {
    expect(
      findBusRoutes("", "airport").every((route) => JSON.stringify(route).includes("Airport")),
    ).toBe(true);
  });

  it("leaves stops empty when none are confirmed", () => {
    expect(getBusRoute("9")?.details).toBeUndefined();
  });
});
