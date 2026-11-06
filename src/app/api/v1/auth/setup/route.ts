import { countUsers, startSession } from "@/server/auth";
import { ApiError, assertSameOrigin, handle, ok, readJson } from "@/server/api";
import { getDb } from "@/server/db";
import { hashPassword } from "@/server/password";
import { setupSchema } from "@/server/schemas";

/** Creates the first admin. It closes permanently once any user exists. */
export const POST = handle(async (request) => {
  assertSameOrigin(request);

  if ((await countUsers()) > 0) {
    throw new ApiError(403, "FORBIDDEN", "Setup has already been completed.");
  }
  if (process.env.NODE_ENV === "production" && process.env.ADMIN_SETUP_ENABLED !== "true") {
    throw new ApiError(403, "FORBIDDEN", "Setup is turned off.");
  }

  const { email, name, password } = setupSchema.parse(await readJson(request));
  const now = new Date();
  const db = await getDb();
  const { insertedId } = await db.collection("users").insertOne({
    email,
    name,
    role: "admin",
    active: true,
    passwordHash: await hashPassword(password),
    createdAt: now,
    updatedAt: now,
  });

  await startSession(insertedId);
  return ok({ created: true }, undefined, 201);
});
