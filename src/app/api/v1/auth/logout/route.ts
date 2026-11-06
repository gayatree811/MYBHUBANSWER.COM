import { endSession } from "@/server/auth";
import { assertSameOrigin, handle, ok } from "@/server/api";

export const POST = handle(async (request) => {
  assertSameOrigin(request);
  await endSession();
  return ok({ signedOut: true });
});
