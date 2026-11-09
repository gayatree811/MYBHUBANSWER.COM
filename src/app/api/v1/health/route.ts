import { ok, handle } from "@/server/api";
import { getDb } from "@/server/db";

export const GET = handle(async () => {
  const db = await getDb();
  await db.command({ ping: 1 });
  return ok({ database: "connected" });
});
