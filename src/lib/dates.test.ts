import { describe, expect, it } from "vitest";
import { formatDate, formatDateRange } from "@/lib/dates";

describe("dates", () => {
  it("uses India Standard Time", () => {
    expect(formatDate("2026-11-05T20:00:00Z")).toContain("6 November 2026");
  });

  it("shows one date for a same-day range", () => {
    expect(formatDateRange("2026-11-14T06:00:00+05:30", "2026-11-14T08:00:00+05:30")).toBe(
      "14 Nov 2026",
    );
  });

  it("shows both dates for a longer range", () => {
    expect(formatDateRange("2026-11-14T06:00:00+05:30", "2026-11-15T08:00:00+05:30")).toContain(
      " to ",
    );
  });
});
