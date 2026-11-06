import "server-only";
import type { Document } from "mongodb";
import { cache } from "react";
import type { CityEvent } from "@/features/events/events";
import type { Listing } from "@/features/listings/types";
import type { NewsArticle } from "@/features/news/articles";
import type { BusRoute } from "@/features/transport/busRoutes";
import { PHOTOS, type Photo } from "@/lib/photos";
import { getDb } from "@/server/db";
import { toPlain } from "@/server/repository";

export type Category = { slug: string; label: string; group: string };

async function readPublished<T>(name: string, sort: Record<string, 1 | -1>): Promise<T[]> {
  const db = await getDb();
  const records = await db.collection(name).find({ status: "published" }).sort(sort).toArray();
  return records.map((record: Document) => toPlain<T>(record));
}

/** Loads published content once per request. Drafts never reach public pages. */
export const getContent = cache(async () => {
  const db = await getDb();
  const [categoryDocs, listings, events, articles, busRoutes] = await Promise.all([
    db.collection("categories").find().sort({ label: 1 }).toArray(),
    readPublished<Listing>("places", { name: 1 }),
    readPublished<CityEvent>("events", { startsAt: 1 }),
    readPublished<NewsArticle>("newsArticles", { publishedAt: -1 }),
    readPublished<BusRoute>("busRoutes", { number: 1 }),
  ]);

  const categories = categoryDocs.map((doc) => toPlain<Category>(doc));
  const label = (group: string, slug: string) =>
    categories.find((category) => category.group === group && category.slug === slug)?.label ??
    slug;

  return {
    categories,
    listings: listings.map((listing): Listing => ({
      ...listing,
      categoryLabel: label(listing.kind, listing.category),
    })),
    events: events.map((event) => ({ ...event, categoryLabel: label("event", event.category) })),
    articles: articles.map((article) => ({
      ...article,
      topicLabel: label("news", article.topic),
    })),
    busRoutes,
  };
});

export async function getCategoryOptions(group: string) {
  const { categories } = await getContent();
  return categories
    .filter((category) => category.group === group)
    .map(({ slug, label }) => ({ value: slug, label }));
}

/** Every photo in use, so the credits page stays complete as editors add more. */
export async function getCreditedPhotos(): Promise<Photo[]> {
  const { listings, events, articles } = await getContent();
  const used = [...listings, ...events, ...articles].flatMap(({ photo }) => photo ?? []);
  const unique = new Map(
    [...Object.values(PHOTOS), ...used].map((photo) => [photo.sourceUrl, photo]),
  );
  return [...unique.values()];
}
