import type { Metadata } from "next";
import { PHOTOS } from "@/lib/photos";
import { Container, Section } from "@/components/layout/Container";
import { PageHero } from "@/components/layout/PageHero";
import { MapExplorer } from "@/features/map/MapExplorer";
import { toMapListing } from "@/features/map/mapListing";
import { TRANSPORT_HUBS } from "@/features/transport/hubs";
import { getCategoryOptions, getContent } from "@/server/content";

export const metadata: Metadata = {
  title: "City map",
  description: "See verified places, temples and food around Bhubaneswar on a map.",
};

export default async function MapPage() {
  const [{ listings: published }, placeGroups] = await Promise.all([
    getContent(),
    getCategoryOptions("place"),
  ]);
  const groups = [
    ...placeGroups,
    { value: "food", label: "Food" },
    { value: "transport", label: "Transport" },
  ];
  const listings = [
    ...published.filter((listing) => listing.coordinates).map(toMapListing),
    ...TRANSPORT_HUBS,
  ];

  return (
    <>
      <PageHero
        eyebrow="City map"
        title="See the city at a glance"
        description="Only listings with a confirmed location appear here. Select a pin for a preview."
        photo={PHOTOS.udayagiri}
      />
      <Section className="py-10 md:py-14">
        <Container>
          <MapExplorer listings={listings} groups={groups} />
        </Container>
      </Section>
    </>
  );
}
