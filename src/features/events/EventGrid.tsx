import { Badge } from "@/components/ui/Badge";
import { PhotoCard } from "@/components/ui/Card";
import { formatDateRange } from "@/lib/dates";
import { EVENT_CATEGORIES, hasStarted, type CityEvent } from "@/features/events/events";

export function EventGrid({ events, now }: { events: CityEvent[]; now: Date }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {events.map((event, index) => (
        <PhotoCard
          key={event.slug}
          href={`/events/${event.slug}`}
          priority={index === 0}
          photo={event.photo}
          title={event.name}
          titleSize="small"
          description={`${formatDateRange(event.startsAt, event.endsAt)} · ${event.venue}`}
          badge={
            <Badge tone="glass">
              {hasStarted(event, now) ? "Happening now" : EVENT_CATEGORIES[event.category]}
            </Badge>
          }
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="reveal"
        />
      ))}
    </div>
  );
}
