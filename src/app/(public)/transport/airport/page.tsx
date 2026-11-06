import type { Metadata } from "next";
import { PHOTOS } from "@/lib/photos";
import { Button } from "@/components/ui/Button";
import { Notice } from "@/components/ui/Notice";
import { Container, Section } from "@/components/layout/Container";
import { PageHero } from "@/components/layout/PageHero";
import { AIRPORT } from "@/features/transport/hubs";
import { StationSection } from "@/features/transport/StationSection";

export const metadata: Metadata = {
  title: "Airport information",
  description: "Biju Patnaik International Airport in Bhubaneswar, and how to reach it.",
};

export default function AirportPage() {
  return (
    <>
      <PageHero
        eyebrow="Airport"
        title="Biju Patnaik International Airport"
        description="The international airport serving Bhubaneswar."
        photo={PHOTOS.airport}
      />
      <Section className="py-10 md:py-14">
        <Container className="space-y-8">
          <Notice title="This page doesn't show live flight status">
            Flight times, gates and terminals can change. Check with your airline before you travel.
          </Notice>
          <StationSection
            title="Airport details"
            hub={AIRPORT}
            facts={[
              { icon: "tag", label: "Airport codes", value: "IATA: BBI, ICAO: VEBS" },
              {
                icon: "mapPin",
                label: "Location",
                value: "About 4 km south-west of Bhubaneswar railway station",
              },
              {
                icon: "bus",
                label: "Ama Bus",
                value: "Airport Shuttle runs between the railway station and the airport",
              },
            ]}
          />
          <div className="flex flex-wrap items-center gap-4">
            <Button href="/transport/bus?hub=airport" icon="arrowRight">
              Bus routes to the airport
            </Button>
            <p className="text-sm text-muted">
              Details from Wikipedia, last checked 6 November 2026.
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
