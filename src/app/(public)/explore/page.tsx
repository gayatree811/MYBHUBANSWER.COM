import type { Metadata } from "next";
import { PHOTOS } from "@/lib/photos";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/States";
import { Container, Section } from "@/components/layout/Container";
import { PageHero } from "@/components/layout/PageHero";
import { FilterGroup } from "@/features/listings/FilterGroup";
import { ListingGrid } from "@/features/listings/ListingCard";
import { getParam, type SearchParams } from "@/features/listings/queries";
import { getCategoryOptions, getContent } from "@/server/content";

export const metadata: Metadata = {
  title: "Explore places and heritage",
  description: "Discover temples, heritage sites, museums and more in Bhubaneswar.",
};

export default async function ExplorePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const category = getParam(params, "category");
  const [{ listings }, options] = await Promise.all([getContent(), getCategoryOptions("place")]);
  const places = listings.filter(
    (listing) => listing.kind === "place" && (!category || listing.category === category),
  );

  return (
    <>
      <PageHero
        eyebrow="Places and heritage"
        title="Explore Bhubaneswar"
        description="Ancient temples, rock-cut caves, museums and open spaces, with sources for what we publish."
        photo={PHOTOS.lingaraj}
      />
      <Section className="py-10 md:py-14">
        <Container>
          <FilterGroup
            label="Category"
            name="category"
            path="/explore"
            params={params}
            options={options}
          />
          <p aria-live="polite" className="mt-6 mb-5 text-sm text-muted">
            {places.length} {places.length === 1 ? "place" : "places"}
          </p>
          {places.length > 0 ? (
            <ListingGrid listings={places} />
          ) : (
            <EmptyState
              title="No places found"
              description="Try another category."
              action={
                <Button href="/explore" variant="secondary">
                  Clear filter
                </Button>
              }
            />
          )}
        </Container>
      </Section>
    </>
  );
}
