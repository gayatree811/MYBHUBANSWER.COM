import { describe, expect, it } from "vitest";
import { isActivePath, NAV_ITEMS } from "@/lib/navigation";

describe("navigation", () => {
  it("has unique links", () => {
    const hrefs = NAV_ITEMS.map((item) => item.href);
    expect(new Set(hrefs).size).toBe(hrefs.length);
  });

  it("marks exact and nested paths as active", () => {
    expect(isActivePath("/explore", "/explore")).toBe(true);
    expect(isActivePath("/explore/temples", "/explore")).toBe(true);
  });

  it("does not match a path that only shares a prefix", () => {
    expect(isActivePath("/explorers", "/explore")).toBe(false);
  });
});
