import type { Metadata } from "next";
import { PHOTOS } from "@/lib/photos";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/States";
import { Container, Section } from "@/components/layout/Container";
import { PageHero } from "@/components/layout/PageHero";
import { EventGrid } from "@/features/events/EventGrid";
import { getUpcomingEvents } from "@/features/events/events";
import { FilterGroup } from "@/features/listings/FilterGroup";
import { getParam, type SearchParams } from "@/features/listings/queries";
import { getCategoryOptions, getContent } from "@/server/content";

export const metadata: Metadata = {
  title: "Events",
  description: "Upcoming events and activities in Bhubaneswar.",
};

export default async function EventsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const now = new Date();
  const [content, options] = await Promise.all([getContent(), getCategoryOptions("event")]);
  const events = getUpcomingEvents(content.events, now, getParam(params, "category"));

  return (
    <>
      <PageHero
        eyebrow="Events"
        title="What's on in Bhubaneswar"
        description="Upcoming events from public listings. Plans can change, so confirm with the organizer before you go."
        photo={PHOTOS.odissi}
      />
      <Section className="py-10 md:py-14">
        <Container>
          <FilterGroup
            label="Category"
            name="category"
            path="/events"
            params={params}
            options={options}
          />
          <p aria-live="polite" className="mt-6 mb-5 text-sm text-muted">
            {events.length} upcoming {events.length === 1 ? "event" : "events"}, soonest first.
            Photos are illustrative.
          </p>
          {events.length > 0 ? (
            <EventGrid events={events} now={now} />
          ) : (
            <EmptyState
              icon="calendar"
              title="No upcoming events found"
              description="Try another category."
              action={
                <Button href="/events" variant="secondary">
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
