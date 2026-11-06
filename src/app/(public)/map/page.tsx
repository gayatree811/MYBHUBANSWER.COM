import type { Metadata } from "next";
import { PHOTOS } from "@/lib/photos";
import { Container, Section } from "@/components/layout/Container";
import { PageHero } from "@/components/layout/PageHero";
import { LISTINGS } from "@/features/listings/queries";
import { PLACE_CATEGORIES } from "@/features/listings/types";
import { MapExplorer } from "@/features/map/MapExplorer";
import { toMapListing } from "@/features/map/mapListing";
import { TRANSPORT_HUBS } from "@/features/transport/hubs";

export const metadata: Metadata = {
  title: "City map",
  description: "See verified places, temples and food around Bhubaneswar on a map.",
};

const GROUPS = [
  ...Object.entries(PLACE_CATEGORIES).map(([value, { label }]) => ({ value, label })),
  { value: "food", label: "Food" },
  { value: "transport", label: "Transport" },
];

export default function MapPage() {
  const listings = [
    ...LISTINGS.filter((listing) => listing.coordinates).map(toMapListing),
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
          <MapExplorer listings={listings} groups={GROUPS} />
        </Container>
      </Section>
    </>
  );
}
