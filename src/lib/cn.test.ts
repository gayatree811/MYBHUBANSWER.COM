import { describe, expect, it } from "vitest";
import { cn } from "@/lib/cn";

describe("cn", () => {
  it("joins class names and skips empty values", () => {
    expect(cn("a", false, null, undefined, "", "b")).toBe("a b");
  });
});
