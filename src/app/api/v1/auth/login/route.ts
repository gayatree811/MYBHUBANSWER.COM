import { signIn } from "@/server/auth";
import { assertSameOrigin, handle, ok, readJson } from "@/server/api";
import { loginSchema } from "@/server/schemas";

export const POST = handle(async (request) => {
  assertSameOrigin(request);
  const { email, password } = loginSchema.parse(await readJson(request));

  await signIn(email, password);
  return ok({ signedIn: true });
});
