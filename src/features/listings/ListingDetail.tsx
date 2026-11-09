import { formatDate } from "@/lib/dates";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Fact, factLinkClass as linkClass } from "@/components/ui/Fact";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Container, Section } from "@/components/layout/Container";
import { PageHero } from "@/components/layout/PageHero";
import { ListingGrid } from "@/features/listings/ListingCard";
import { getCategoryLabel, getDirectionsUrl } from "@/features/listings/queries";
import { PRICE_BANDS, type Listing } from "@/features/listings/types";
import { MapPreview } from "@/features/map/MapPreview";
import { toMapListing } from "@/features/map/mapListing";

export function ListingDetail({ listing, related }: { listing: Listing; related: Listing[] }) {
  const food = listing.kind === "food" ? listing : null;

  return (
    <>
      <PageHero
        eyebrow={getCategoryLabel(listing)}
        title={listing.name}
        description={listing.summary}
        photo={listing.photo}
      />

      <Section className="py-12 md:py-16">
        <Container className="grid gap-10 lg:grid-cols-[1fr_24rem]">
          <div className="min-w-0">
            <p className="text-xl leading-relaxed text-ink-700">{listing.description}</p>

            {listing.photo && (
              <p className="mt-6 text-sm text-muted">
                {listing.photoIsIllustrative && "Illustrative dish photo, not from this business. "}
                Photo: {listing.photo.author}, {listing.photo.license}.
              </p>
            )}

            <div className="mt-10">
              {listing.coordinates ? (
                <MapPreview listing={toMapListing(listing)} />
              ) : (
                <Card className="bg-sand-100 text-muted shadow-none">
                  An exact map location isn&apos;t verified yet. Directions search by name and area.
                </Card>
              )}
            </div>
          </div>

          <aside>
            <Card className="lg:sticky lg:top-24">
              <dl>
                <Fact icon="mapPin" label="Location">
                  {listing.area}, Bhubaneswar
                </Fact>
                <Fact icon="clock" label={food ? "Opening hours" : "Timings"}>
                  {listing.hours ? (
                    <>
                      {listing.hours.text}
                      <a
                        href={listing.hours.source.url}
                        target="_blank"
                        rel="noreferrer"
                        className={`mt-1 block text-sm ${linkClass}`}
                      >
                        Source: {listing.hours.source.name}
                      </a>
                    </>
                  ) : (
                    "Unavailable. Not verified yet."
                  )}
                </Fact>
                {food && (
                  <Fact icon="utensils" label="Cuisine">
                    {food.cuisines.join(", ") || "Unavailable"}
                  </Fact>
                )}
                {food && (
                  <Fact icon="tag" label="Price">
                    {food.priceBand ? PRICE_BANDS[food.priceBand] : "Unavailable"}
                    {food.priceNote && (
                      <span className="block text-sm font-normal text-muted">{food.priceNote}</span>
                    )}
                  </Fact>
                )}
                {food?.phone && (
                  <Fact icon="phone" label="Phone">
                    <a href={`tel:${food.phone.replaceAll(" ", "")}`} className={linkClass}>
                      {food.phone}
                    </a>
                  </Fact>
                )}
                <Fact icon="shield" label="Source">
                  <a
                    href={listing.source.url}
                    target="_blank"
                    rel="noreferrer"
                    className={linkClass}
                  >
                    {listing.source.name}
                  </a>
                  <span className="block text-sm font-normal text-muted">
                    Last checked {formatDate(listing.lastChecked)}
                  </span>
                </Fact>
              </dl>
              <Button
                href={getDirectionsUrl(listing)}
                target="_blank"
                rel="noreferrer"
                icon="external"
                className="mt-4 w-full"
              >
                Get directions
              </Button>
            </Card>
          </aside>
        </Container>
      </Section>

      <Section className="bg-sand-100">
        <Container>
          <SectionHeader eyebrow="Keep going" title="You may also like" />
          <ListingGrid listings={related} />
        </Container>
      </Section>
    </>
  );
}
