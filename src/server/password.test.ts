import { describe, expect, it } from "vitest";
import { hashPassword, verifyPassword } from "@/server/password";

describe("passwords", () => {
  it("verifies the right password and rejects others", async () => {
    const stored = await hashPassword("a-long-test-value");

    expect(stored).not.toContain("a-long-test-value");
    expect(await verifyPassword("a-long-test-value", stored)).toBe(true);
    expect(await verifyPassword("another-value", stored)).toBe(false);
  });

  it("rejects a malformed stored value", async () => {
    expect(await verifyPassword("anything", "bad")).toBe(false);
  });
});
