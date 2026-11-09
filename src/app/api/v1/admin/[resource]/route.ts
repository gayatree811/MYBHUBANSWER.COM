import { requireUser } from "@/server/auth";
import { assertSameOrigin, handle, ok, readJson } from "@/server/api";
import { createRecord, getResource, listRecords } from "@/server/repository";
import { paginationSchema } from "@/server/schemas";

type Context = { params: Promise<{ resource: string }> };

export const GET = handle<Context>(async (request, { params }) => {
  const resource = getResource((await params).resource);
  await requireUser(resource.adminOnly ? "admin" : undefined);

  const query = request.nextUrl.searchParams;
  const page = paginationSchema.parse({
    page: query.get("page") ?? undefined,
    limit: query.get("limit") ?? undefined,
  });
  const { records, meta } = await listRecords(resource, {}, page);
  return ok(records, meta);
});

export const POST = handle<Context>(async (request, { params }) => {
  assertSameOrigin(request);
  const resource = getResource((await params).resource);
  await requireUser(resource.adminOnly ? "admin" : undefined);

  return ok(await createRecord(resource, await readJson(request)), undefined, 201);
});
