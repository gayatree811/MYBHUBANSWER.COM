import "server-only";
import { MongoClient, type Db } from "mongodb";
import { requireEnv } from "@/server/env";

const cache = globalThis as unknown as {
  mongoClient?: Promise<MongoClient>;
  mongoIndexes?: Promise<void>;
};

async function ensureIndexes(db: Db): Promise<void> {
  const unique = { unique: true };
  await Promise.all([
    db
      .collection("places")
      .createIndexes([
        { key: { slug: 1 }, ...unique },
        { key: { status: 1, kind: 1, category: 1 } },
      ]),
    db.collection("categories").createIndex({ group: 1, slug: 1 }, unique),
    db
      .collection("events")
      .createIndexes([{ key: { slug: 1 }, ...unique }, { key: { status: 1, endsAt: 1 } }]),
    db
      .collection("newsArticles")
      .createIndexes([{ key: { slug: 1 }, ...unique }, { key: { status: 1, publishedAt: -1 } }]),
    db.collection("busRoutes").createIndex({ slug: 1 }, unique),
    db.collection("busStops").createIndex({ slug: 1 }, unique),
    db.collection("people").createIndex({ slug: 1 }, unique),
    db.collection("businesses").createIndex({ slug: 1 }, unique),
    db.collection("users").createIndex({ email: 1 }, unique),
    db.collection("sessions").createIndexes([
      { key: { tokenHash: 1 }, ...unique },
      { key: { expiresAt: 1 }, expireAfterSeconds: 0 },
    ]),
    db.collection("loginAttempts").createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 }),
  ]);
}

/** Shares one connection across requests and hot reloads. */
export async function getDb(): Promise<Db> {
  cache.mongoClient ??= new MongoClient(requireEnv("MONGODB_URI"), {
    serverSelectionTimeoutMS: 8000,
  })
    .connect()
    .catch((error) => {
      cache.mongoClient = undefined;
      throw error;
    });

  const client = await cache.mongoClient;
  const db = client.db(process.env.MONGODB_DB_NAME || "mybhubaneswar_dev");

  cache.mongoIndexes ??= ensureIndexes(db).catch((error) => {
    cache.mongoIndexes = undefined;
    throw error;
  });
  await cache.mongoIndexes;

  return db;
}
