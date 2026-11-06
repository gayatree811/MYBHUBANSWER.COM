import "server-only";
import { ObjectId, type Document, type Filter } from "mongodb";
import { ApiError, notFoundError } from "@/server/api";
import { getDb } from "@/server/db";
import { hashPassword } from "@/server/password";
import { RESOURCES, type Resource } from "@/server/resources";

export function getResource(name: string): Resource {
  const resource = Object.hasOwn(RESOURCES, name) ? RESOURCES[name] : undefined;
  if (!resource) throw notFoundError();
  return resource;
}

const parseId = (id: string) => {
  if (!ObjectId.isValid(id)) throw notFoundError();
  return new ObjectId(id);
};

/** Converts the database id to a string and drops fields that must stay private. */
export function toPlain<T = Document>({ _id, passwordHash, ...doc }: Document): T {
  void passwordHash;
  return { ...doc, id: _id.toString() } as T;
}

type Page = { page: number; limit: number };

export async function listRecords(resource: Resource, filter: Filter<Document>, page: Page) {
  const db = await getDb();
  const collection = db.collection(resource.collection);
  const [records, total] = await Promise.all([
    collection
      .find(filter)
      .sort(resource.sort)
      .skip((page.page - 1) * page.limit)
      .limit(page.limit)
      .toArray(),
    collection.countDocuments(filter),
  ]);

  return {
    records: records.map((record) => toPlain(record)),
    meta: { ...page, total, totalPages: Math.ceil(total / page.limit) },
  };
}

export async function getRecord(resource: Resource, id: string) {
  const db = await getDb();
  const record = await db.collection(resource.collection).findOne({ _id: parseId(id) });
  if (!record) throw notFoundError();
  return toPlain(record);
}

async function prepareUser(input: Record<string, unknown>, isNew: boolean) {
  const { password, ...user } = input;

  if (typeof password === "string") return { ...user, passwordHash: await hashPassword(password) };
  if (isNew) throw new ApiError(400, "VALIDATION_ERROR", "Set a password for this user.");
  return user;
}

async function validate(resource: Resource, input: unknown, isNew: boolean) {
  const data = resource.schema.parse(input) as Record<string, unknown>;
  return resource.collection === "users" ? prepareUser(data, isNew) : data;
}

export async function createRecord(resource: Resource, input: unknown) {
  const data = await validate(resource, input, true);
  const now = new Date();
  const db = await getDb();
  const { insertedId } = await db
    .collection(resource.collection)
    .insertOne({ ...data, createdAt: now, updatedAt: now });

  return getRecord(resource, insertedId.toString());
}

export async function updateRecord(resource: Resource, id: string, input: unknown) {
  const _id = parseId(id);
  const data = await validate(resource, input, false);
  const db = await getDb();
  const collection = db.collection(resource.collection);
  const existing = await collection.findOne({ _id });
  if (!existing) throw notFoundError();

  await collection.replaceOne(
    { _id },
    {
      ...data,
      ...(existing.passwordHash && !data.passwordHash && { passwordHash: existing.passwordHash }),
      createdAt: existing.createdAt,
      updatedAt: new Date(),
    },
  );

  // A new password signs the user out everywhere.
  if (data.passwordHash) await db.collection("sessions").deleteMany({ userId: _id });

  return getRecord(resource, id);
}

export async function deleteRecord(resource: Resource, id: string) {
  const db = await getDb();
  const { deletedCount } = await db.collection(resource.collection).deleteOne({ _id: parseId(id) });
  if (deletedCount === 0) throw notFoundError();
}
