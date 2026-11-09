import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { formatDate, formatDateRange, formatTimeRange } from "@/lib/dates";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Fact, factLinkClass } from "@/components/ui/Fact";
import { Container, Section } from "@/components/layout/Container";
import { PageHero } from "@/components/layout/PageHero";
import { hasEnded } from "@/features/events/events";
import { getContent } from "@/server/content";

type PageProps = { params: Promise<{ slug: string }> };

async function find(slug: string) {
  const { events } = await getContent();
  return events.find((event) => event.slug === slug);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const event = await find((await params).slug);
  return event ? { title: event.name, description: event.summary } : {};
}

export default async function EventPage({ params }: PageProps) {
  const event = await find((await params).slug);
  if (!event) notFound();

  const ended = hasEnded(event, new Date());

  return (
    <>
      <PageHero
        eyebrow={event.categoryLabel ?? event.category}
        title={event.name}
        description={event.summary}
        photo={event.photo}
      >
        {ended && (
          <div className="mt-5">
            <Badge tone="glass">This event has ended</Badge>
          </div>
        )}
      </PageHero>
      <Section className="py-12 md:py-16">
        <Container narrow>
          <Card>
            <dl>
              <Fact icon="calendar" label="Date">
                {formatDateRange(event.startsAt, event.endsAt)}
              </Fact>
              <Fact icon="clock" label="Time">
                {formatTimeRange(event.startsAt, event.endsAt)}
              </Fact>
              <Fact icon="mapPin" label="Venue">
                {event.venue}
              </Fact>
              <Fact icon="shield" label="Organizer">
                {event.organizer ?? "Unavailable. The listing doesn't name one."}
              </Fact>
              <Fact icon="link" label="Source">
                <a
                  href={event.source.url}
                  target="_blank"
                  rel="noreferrer"
                  className={factLinkClass}
                >
                  {event.source.name}
                </a>
                <span className="block text-sm font-normal text-muted">
                  Last checked {formatDate(event.lastChecked)}
                </span>
              </Fact>
            </dl>
          </Card>
          <p className="mt-6 text-sm text-muted">
            Details come from a public listing, not the organizer.
            {event.photo &&
              ` Illustrative photo by ${event.photo.author}, not taken at this event.`}
          </p>
          <Button href="/events" variant="secondary" className="mt-6">
            All events
          </Button>
        </Container>
      </Section>
    </>
  );
}
