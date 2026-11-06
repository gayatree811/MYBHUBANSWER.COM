import { requireUser } from "@/server/auth";
import { assertSameOrigin, handle, ok } from "@/server/api";
import { seedDatabase } from "@/server/seed";

/** Adds missing starter records. Existing records are left unchanged. */
export const POST = handle(async (request) => {
  assertSameOrigin(request);
  await requireUser("admin");
  return ok(await seedDatabase());
});
