import type { Metadata } from "next";
import { PHOTOS } from "@/lib/photos";
import { Button } from "@/components/ui/Button";
import { Notice } from "@/components/ui/Notice";
import { Container, Section } from "@/components/layout/Container";
import { PageHero } from "@/components/layout/PageHero";
import { BHUBANESWAR_STATION, NEW_STATION } from "@/features/transport/hubs";
import { StationSection } from "@/features/transport/StationSection";

export const metadata: Metadata = {
  title: "Railway information",
  description: "Bhubaneswar and Bhubaneswar New railway stations, with live train status links.",
};

const NTES_URL = "https://enquiry.indianrail.gov.in/mntes/";

export default function RailwayPage() {
  return (
    <>
      <PageHero
        eyebrow="Railway"
        title="Trains and stations"
        description="Bhubaneswar has two main passenger stations, both in the East Coast Railway zone."
        photo={PHOTOS.bhubaneswarStation}
      />
      <Section className="py-10 md:py-14">
        <Container className="space-y-8">
          <Notice title="This page doesn't show live train status">
            Train running status and platforms change. Check the official National Train Enquiry
            System before you travel.
            <div className="mt-4">
              <Button href={NTES_URL} target="_blank" rel="noreferrer" icon="external">
                Open NTES
              </Button>
            </div>
          </Notice>
          <StationSection
            title="Bhubaneswar (BBS)"
            hub={BHUBANESWAR_STATION}
            facts={[
              { icon: "tag", label: "Station code", value: "BBS" },
              { icon: "mapPin", label: "Location", value: "Master Canteen, Bhubaneswar" },
              { icon: "bus", label: "Platforms", value: "6 platforms, 8 tracks" },
            ]}
          />
          <StationSection
            title="Bhubaneswar New (BBSN)"
            hub={NEW_STATION}
            facts={[
              { icon: "tag", label: "Station code", value: "BBSN" },
              { icon: "mapPin", label: "Location", value: "Northern Bhubaneswar" },
              { icon: "bus", label: "Platforms", value: "7 platforms, 9 tracks" },
              { icon: "shield", label: "Division", value: "Khurda Road" },
            ]}
          />
          <p className="text-sm text-muted">
            Station details from Wikipedia, last checked 6 November 2026.
          </p>
        </Container>
      </Section>
    </>
  );
}
