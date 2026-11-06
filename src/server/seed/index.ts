import "server-only";
import type { AnyBulkWriteOperation, Document } from "mongodb";
import { getDb } from "@/server/db";
import { BUS_ROUTES, ROUTE_DIRECTORY_SOURCE } from "@/server/seed/busRoutes";
import { EVENTS } from "@/server/seed/events";
import { FOOD_PLACES } from "@/server/seed/food";
import { ARTICLES } from "@/server/seed/news";
import { PLACES } from "@/server/seed/places";
import { categorySchema } from "@/server/schemas";

const CATEGORIES = [
  ["temple", "Temples", "place"],
  ["heritage", "Heritage", "place"],
  ["museum", "Museums", "place"],
  ["nature", "Nature", "place"],
  ["sports", "Sports", "place"],
  ["restaurant", "Restaurants", "food"],
  ["cafe", "Cafes", "food"],
  ["street-food", "Street food", "food"],
  ["sports", "Sports", "event"],
  ["culture", "Arts and culture", "event"],
  ["business", "Business", "event"],
  ["learning", "Learning", "event"],
  ["civic", "Civic", "news"],
  ["transport", "Transport", "news"],
  ["environment", "Environment", "news"],
].map(([slug, label, group]) => categorySchema.parse({ slug, label, group }));

const slugify = (name: string) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

function getBusStops() {
  const stops = new Map<string, { slug: string; name: string; routes: string[] }>();

  for (const route of BUS_ROUTES) {
    for (const name of route.details?.stops ?? []) {
      const slug = slugify(name);
      const stop = stops.get(slug) ?? { slug, name, routes: [] };
      if (!stop.routes.includes(route.number)) stop.routes.push(route.number);
      stops.set(slug, stop);
    }
  }

  return [...stops.values()];
}

/** Adds only records that are missing, so editors' changes are never overwritten. */
function insertMissing(records: Document[], key: (record: Document) => Document) {
  const now = new Date();
  return records.map((record): AnyBulkWriteOperation<Document> => ({
    updateOne: {
      filter: key(record),
      update: { $setOnInsert: { ...record, createdAt: now, updatedAt: now } },
      upsert: true,
    },
  }));
}

const bySlug = ({ slug }: Document) => ({ slug });
const publish = (records: object[]) =>
  records.map((record) => ({ ...record, status: "published" }));

export async function seedDatabase() {
  const db = await getDb();

  const places = await db
    .collection("places")
    .bulkWrite(insertMissing(publish([...PLACES, ...FOOD_PLACES]), bySlug));
  const categories = await db
    .collection("categories")
    .bulkWrite(insertMissing(CATEGORIES, ({ slug, group }) => ({ slug, group })));
  const events = await db.collection("events").bulkWrite(insertMissing(publish(EVENTS), bySlug));
  const news = await db
    .collection("newsArticles")
    .bulkWrite(insertMissing(publish(ARTICLES), bySlug));
  const busRoutes = await db
    .collection("busRoutes")
    .bulkWrite(
      insertMissing(
        publish(BUS_ROUTES.map((route) => ({ ...route, directorySource: ROUTE_DIRECTORY_SOURCE }))),
        bySlug,
      ),
    );
  const busStops = await db
    .collection("busStops")
    .bulkWrite(insertMissing(publish(getBusStops()), bySlug));

  return {
    places: places.upsertedCount,
    categories: categories.upsertedCount,
    events: events.upsertedCount,
    news: news.upsertedCount,
    busRoutes: busRoutes.upsertedCount,
    busStops: busStops.upsertedCount,
  };
}
