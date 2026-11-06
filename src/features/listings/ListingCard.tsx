import { Badge } from "@/components/ui/Badge";
import { PhotoCard } from "@/components/ui/Card";
import { getCategoryLabel, getListingHref } from "@/features/listings/queries";
import type { Listing } from "@/features/listings/types";

export function ListingCard({ listing, className }: { listing: Listing; className?: string }) {
  const foodDetails =
    listing.kind === "food" ? [listing.area, listing.priceNote].filter(Boolean).join(" · ") : null;

  return (
    <PhotoCard
      href={getListingHref(listing)}
      photo={listing.photo}
      title={listing.name}
      description={foodDetails ?? listing.summary}
      badge={<Badge tone="glass">{getCategoryLabel(listing)}</Badge>}
      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
      className={className}
    />
  );
}

export function ListingGrid({ listings }: { listings: Listing[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {listings.map((listing) => (
        <ListingCard key={listing.slug} listing={listing} className="reveal" />
      ))}
    </div>
  );
}
