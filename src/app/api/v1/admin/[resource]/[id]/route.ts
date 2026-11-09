import { requireUser } from "@/server/auth";
import { ApiError, assertSameOrigin, handle, ok, readJson } from "@/server/api";
import { deleteRecord, getRecord, getResource, updateRecord } from "@/server/repository";

type Context = { params: Promise<{ resource: string; id: string }> };

export const GET = handle<Context>(async (_request, { params }) => {
  const { resource: name, id } = await params;
  const resource = getResource(name);
  await requireUser(resource.adminOnly ? "admin" : undefined);

  return ok(await getRecord(resource, id));
});

export const PUT = handle<Context>(async (request, { params }) => {
  assertSameOrigin(request);
  const { resource: name, id } = await params;
  const resource = getResource(name);
  const user = await requireUser(resource.adminOnly ? "admin" : undefined);
  const body = await readJson(request);

  if (name === "users" && id === user.id) {
    const { role, active } = body as { role?: string; active?: boolean };
    if (role !== "admin" || active !== true) {
      throw new ApiError(409, "CONFLICT", "You can't remove your own admin access.");
    }
  }

  return ok(await updateRecord(resource, id, body));
});

/** Only admins can delete, and they can't remove their own account. */
export const DELETE = handle<Context>(async (request, { params }) => {
  assertSameOrigin(request);
  const { resource: name, id } = await params;
  const user = await requireUser("admin");

  if (name === "users" && id === user.id) {
    throw new ApiError(409, "CONFLICT", "You can't delete your own account.");
  }

  await deleteRecord(getResource(name), id);
  return ok({ deleted: true });
});
