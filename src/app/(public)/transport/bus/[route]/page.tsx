import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PHOTOS } from "@/lib/photos";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Notice } from "@/components/ui/Notice";
import { EmptyState } from "@/components/ui/States";
import { Container, Section } from "@/components/layout/Container";
import { PageHero } from "@/components/layout/PageHero";
import { getContent } from "@/server/content";

type PageProps = { params: Promise<{ route: string }> };

async function find(slug: string) {
  const { busRoutes } = await getContent();
  return busRoutes.find((route) => route.slug === slug);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const route = await find((await params).route);
  return route ? { title: `Ama Bus route ${route.number}` } : {};
}

export default async function BusRoutePage({ params }: PageProps) {
  const route = await find((await params).route);
  if (!route) notFound();

  const { details } = route;

  return (
    <>
      <PageHero
        eyebrow="Ama Bus route"
        title={route.number}
        description={`${route.from} to ${route.to}`}
        photo={PHOTOS.moBus}
      />
      <Section className="py-10 md:py-14">
        <Container narrow>
          <Notice title="Scheduled information, not live status">
            {details ? (
              <>
                {details.timetableNote}. This is an estimate from an unofficial timetable site (
                {details.sourceDate}). Buses can run differently, so check the Ama app.
              </>
            ) : (
              "Timetable unavailable. Check the Ama app for current service."
            )}
          </Notice>

          {details ? (
            <Card className="mt-6">
              <h2 className="font-display text-title">Stops</h2>
              <p className="mt-1 text-sm text-muted">
                {details.stops.length} stops in one direction, from{" "}
                <a
                  href={details.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="underline underline-offset-4"
                >
                  an unofficial timetable site
                </a>
                .
              </p>
              <ol className="mt-6 border-l-2 border-sand-200">
                {details.stops.map((stop, index) => (
                  <li key={`${stop}-${index}`} className="relative pb-3 pl-6 last:pb-0">
                    <span className="absolute top-1.5 -left-[7px] size-3 rounded-full border-2 border-white bg-saffron-600" />
                    {stop}
                  </li>
                ))}
              </ol>
            </Card>
          ) : (
            <EmptyState
              icon="bus"
              title="Stop list unavailable"
              description="We haven't verified the stops for this route yet."
            />
          )}

          <Button href="/transport/bus" variant="secondary" className="mt-6">
            All routes
          </Button>
        </Container>
      </Section>
    </>
  );
}
