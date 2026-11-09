import { handle, notFoundError, ok } from "@/server/api";
import { getDb } from "@/server/db";
import { getResource, toPlain } from "@/server/repository";
import { slugSchema } from "@/server/schemas";

type Context = { params: Promise<{ resource: string; slug: string }> };

export const GET = handle<Context>(async (_request, { params }) => {
  const { resource: name, slug } = await params;
  const resource = getResource(name);
  if (!resource.publicFilters || resource.collection === "categories") throw notFoundError();

  const db = await getDb();
  const record = await db
    .collection(resource.collection)
    .findOne({ slug: slugSchema.parse(slug), status: "published" });
  if (!record) throw notFoundError();

  return ok(toPlain(record));
});
