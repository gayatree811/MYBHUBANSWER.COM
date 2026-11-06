import { describe, expect, it } from "vitest";
import { PHOTOS } from "@/lib/photos";

describe("photos", () => {
  it.each(Object.entries(PHOTOS))("%s has complete credit details", (_, photo) => {
    expect(photo.alt).not.toBe("");
    expect(photo.author).not.toBe("");
    expect(photo.license).not.toBe("");
    expect(photo.licenseUrl).toMatch(/^https:\/\//);
    expect(photo.sourceUrl).toMatch(/^https:\/\/commons\.wikimedia\.org\//);
  });
});
