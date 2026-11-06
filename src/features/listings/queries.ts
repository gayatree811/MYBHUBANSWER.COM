import { FOOD_PLACES } from "@/features/listings/food";
import { PLACES } from "@/features/listings/places";
import {
  FOOD_CATEGORIES,
  PLACE_CATEGORIES,
  type FoodPlace,
  type Listing,
} from "@/features/listings/types";

export const LISTINGS: Listing[] = [...PLACES, ...FOOD_PLACES];

export type SearchParams = Record<string, string | string[] | undefined>;

export function getParam(params: SearchParams, key: string): string | undefined {
  const value = params[key];
  return Array.isArray(value) ? value[0] : value;
}

export function getListing(slug: string): Listing | undefined {
  return LISTINGS.find((listing) => listing.slug === slug);
}

export function getCategoryLabel(listing: Listing): string {
  return listing.kind === "place"
    ? PLACE_CATEGORIES[listing.category].label
    : FOOD_CATEGORIES[listing.category].label;
}

export function getListingHref(listing: Listing): string {
  return `/${listing.kind === "place" ? "explore" : "food"}/${listing.slug}`;
}

export function getCuisines(): string[] {
  return [...new Set(FOOD_PLACES.flatMap((place) => place.cuisines))].sort();
}

type FoodFilters = { category?: string; cuisine?: string; price?: string };

export function filterFood(places: FoodPlace[], { category, cuisine, price }: FoodFilters) {
  return places.filter(
    (place) =>
      (!category || place.category === category) &&
      (!cuisine || place.cuisines.includes(cuisine)) &&
      (!price || place.priceBand === price),
  );
}

/** Same category first, then the same kind of listing. */
export function getRelated(listing: Listing, count = 3): Listing[] {
  const others = LISTINGS.filter(
    (other) => other.kind === listing.kind && other.slug !== listing.slug,
  );
  const sameCategory = others.filter((other) => other.category === listing.category);
  const rest = others.filter((other) => other.category !== listing.category);

  return [...sameCategory, ...rest].slice(0, count);
}

/** Toggles one filter while keeping the others. Choosing it again clears it. */
export function buildFilterHref(path: string, active: SearchParams, key: string, value?: string) {
  const params = new URLSearchParams();

  for (const name of Object.keys(active)) {
    const current = getParam(active, name);
    if (current && name !== key) params.set(name, current);
  }
  if (value && getParam(active, key) !== value) params.set(key, value);

  const query = params.toString();
  return query ? `${path}?${query}` : path;
}

function getSearchText(listing: Listing): string {
  const cuisines = listing.kind === "food" ? listing.cuisines : [];
  return [
    listing.summary,
    listing.description,
    listing.area,
    ...cuisines,
    getCategoryLabel(listing),
  ].join(" ");
}

export function getSearchWords(query: string): string[] {
  return query.toLowerCase().split(/\s+/).filter(Boolean);
}

/** Returns null unless every word matches. Title matches score highest. */
export function scoreMatch(words: string[], title: string, text: string): number | null {
  const lowerTitle = title.toLowerCase();
  const lowerText = text.toLowerCase();

  if (!words.every((word) => lowerTitle.includes(word) || lowerText.includes(word))) return null;
  return words.filter((word) => lowerTitle.includes(word)).length;
}

export function searchListings(query: string): Listing[] {
  const words = getSearchWords(query);
  if (words.length === 0) return [];

  return LISTINGS.map((listing) => ({
    listing,
    score: scoreMatch(words, listing.name, getSearchText(listing)),
  }))
    .filter((result) => result.score !== null)
    .sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
    .map((result) => result.listing);
}

/** Uses coordinates when known, otherwise searches by name and area. */
export function getDirectionsUrl(listing: Listing): string {
  const destination = listing.coordinates
    ? `${listing.coordinates.lat},${listing.coordinates.lng}`
    : `${listing.name}, ${listing.area}, Bhubaneswar`;
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`;
}
