import { NextRequest } from "next/server";
import { describe, expect, it } from "vitest";
import { z } from "zod";
import { ApiError, assertSameOrigin, handle } from "@/server/api";

const request = (origin?: string) =>
  new NextRequest("http://site.test/api", {
    method: "POST",
    headers: { host: "site.test", ...(origin && { origin }) },
  });

describe("API helpers", () => {
  it("allows same-site writes and rejects others", () => {
    expect(() => assertSameOrigin(request("http://site.test"))).not.toThrow();
    expect(() => assertSameOrigin(request("http://evil.test"))).toThrow(ApiError);
    expect(() => assertSameOrigin(request())).toThrow(ApiError);
  });

  it("returns validation errors in the agreed format", async () => {
    const route = handle(async () => {
      z.object({ name: z.string() }).parse({});
      return new Response();
    });
    const response = await route(request(), undefined);
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.success).toBe(false);
    expect(body.error.code).toBe("VALIDATION_ERROR");
    expect(body.error.details[0].field).toBe("name");
  });
});
