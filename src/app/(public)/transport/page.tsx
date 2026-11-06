import type { Metadata } from "next";
import { PHOTOS } from "@/lib/photos";
import { PhotoCard } from "@/components/ui/Card";
import { Notice } from "@/components/ui/Notice";
import { Container, Section } from "@/components/layout/Container";
import { PageHero } from "@/components/layout/PageHero";

export const metadata: Metadata = {
  title: "Transport",
  description: "Ama Bus routes, railway stations and airport information for Bhubaneswar.",
};

const SECTIONS = [
  {
    href: "/transport/bus",
    title: "Ama Bus",
    description: "Find city bus routes by number, place or stop.",
    photo: PHOTOS.moBus,
  },
  {
    href: "/transport/railway",
    title: "Railway",
    description: "Bhubaneswar's two main stations and live train status links.",
    photo: PHOTOS.bhubaneswarStation,
  },
  {
    href: "/transport/airport",
    title: "Airport",
    description: "Biju Patnaik International Airport and how to reach it.",
    photo: PHOTOS.airport,
  },
];

export default function TransportPage() {
  return (
    <>
      <PageHero
        eyebrow="Transport"
        title="Getting around Bhubaneswar"
        description="Reference information for buses, trains and flights, with links to the official live services."
        photo={PHOTOS.moBus}
      />
      <Section className="py-10 md:py-14">
        <Container>
          <div className="grid gap-5 md:grid-cols-3">
            {SECTIONS.map((section) => (
              <PhotoCard
                key={section.href}
                {...section}
                sizes="(min-width: 768px) 33vw, 100vw"
                className="reveal"
              />
            ))}
          </div>
          <div className="mt-8">
            <Notice title="Scheduled information, not live status">
              This site doesn&apos;t track buses, trains or flights. Check the official service
              before you travel.
            </Notice>
          </div>
        </Container>
      </Section>
    </>
  );
}
