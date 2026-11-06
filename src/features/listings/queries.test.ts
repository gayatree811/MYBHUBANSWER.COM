import { describe, expect, it } from "vitest";
import { FOOD_PLACES } from "@/features/listings/food";
import {
  buildFilterHref,
  filterFood,
  getDirectionsUrl,
  getListing,
  getRelated,
  LISTINGS,
  searchListings,
} from "@/features/listings/queries";

describe("listings data", () => {
  it("has unique slugs", () => {
    const slugs = LISTINGS.map((listing) => listing.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it.each(LISTINGS.map((listing) => [listing.slug, listing] as const))(
    "%s has a source and sensible coordinates",
    (_, listing) => {
      expect(listing.source.url).toMatch(/^https:\/\//);
      if (listing.coordinates) {
        expect(listing.coordinates.lat).toBeGreaterThan(20);
        expect(listing.coordinates.lat).toBeLessThan(20.5);
        expect(listing.coordinates.lng).toBeGreaterThan(85.7);
        expect(listing.coordinates.lng).toBeLessThan(85.95);
      }
    },
  );
});

describe("filterFood", () => {
  it("combines filters", () => {
    const results = filterFood(FOOD_PLACES, { category: "cafe", price: "mid" });
    expect(results.length).toBeGreaterThan(0);
    expect(results.every((place) => place.category === "cafe")).toBe(true);
  });

  it("filters by cuisine", () => {
    const results = filterFood(FOOD_PLACES, { cuisine: "Korean" });
    expect(results.map((place) => place.slug)).toEqual(["arinova-cafe"]);
  });
});

describe("searchListings", () => {
  it("finds places by name, regardless of case", () => {
    expect(searchListings("LINGARAJA")[0].slug).toBe("lingaraja-temple");
  });

  it("finds food by cuisine", () => {
    expect(searchListings("korean").map((listing) => listing.slug)).toContain("arinova-cafe");
  });

  it("requires every word to match", () => {
    expect(searchListings("temple zzzz")).toEqual([]);
  });

  it("returns nothing for an empty search", () => {
    expect(searchListings("   ")).toEqual([]);
  });
});

describe("buildFilterHref", () => {
  it("keeps other filters and adds the new one", () => {
    expect(buildFilterHref("/food", { price: "mid" }, "category", "cafe")).toBe(
      "/food?price=mid&category=cafe",
    );
  });

  it("clears a filter that is chosen again", () => {
    expect(buildFilterHref("/food", { category: "cafe" }, "category", "cafe")).toBe("/food");
  });
});

describe("listing helpers", () => {
  it("does not relate a listing to itself", () => {
    const listing = getListing("dalma")!;
    expect(getRelated(listing).map((item) => item.slug)).not.toContain("dalma");
  });

  it("builds directions without coordinates", () => {
    expect(getDirectionsUrl(getListing("dalma")!)).toContain("Madhusudan");
  });
});
