import { getCategoryLabel, getListingHref } from "@/features/listings/queries";
import type { Listing } from "@/features/listings/types";

/** The small, serializable part of a listing that the browser map needs. */
export type MapListing = {
  slug: string;
  name: string;
  summary: string;
  group: string;
  categoryLabel: string;
  href: string;
  lat: number;
  lng: number;
  photoSrc?: string;
};

export function toMapListing(listing: Listing): MapListing {
  const { lat, lng } = listing.coordinates ?? { lat: 0, lng: 0 };

  return {
    slug: listing.slug,
    name: listing.name,
    summary: listing.summary,
    group: listing.kind === "food" ? "food" : listing.category,
    categoryLabel: getCategoryLabel(listing),
    href: getListingHref(listing),
    lat,
    lng,
    photoSrc: listing.photo?.src,
  };
}
