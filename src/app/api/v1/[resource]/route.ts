import { handle, notFoundError, ok } from "@/server/api";
import { getResource, listRecords } from "@/server/repository";
import { paginationSchema } from "@/server/schemas";

type Context = { params: Promise<{ resource: string }> };

export const GET = handle<Context>(async (request, { params }) => {
  const resource = getResource((await params).resource);
  if (!resource.publicFilters) throw notFoundError();

  const query = request.nextUrl.searchParams;
  const page = paginationSchema.parse({
    page: query.get("page") ?? undefined,
    limit: query.get("limit") ?? undefined,
  });

  // Values stay plain strings, so a query can't inject a database operator.
  const filter: Record<string, string> =
    resource.collection === "categories" ? {} : { status: "published" };
  for (const name of resource.publicFilters) {
    const value = query.get(name);
    if (value) filter[name] = value;
  }

  const { records, meta } = await listRecords(resource, filter, page);
  return ok(records, meta);
});
