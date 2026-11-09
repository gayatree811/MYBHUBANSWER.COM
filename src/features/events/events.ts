import type { Photo } from "@/lib/photos";

export type CityEvent = {
  slug: string;
  status: "draft" | "published";
  name: string;
  category: string;
  summary: string;
  startsAt: string;
  endsAt: string;
  venue: string;
  /** Leave out when unstated. The page then shows it as unavailable. */
  organizer?: string;
  source: { name: string; url: string };
  lastChecked: string;
  photo?: Photo;
  /** Added when loaded, from the Category collection. */
  categoryLabel?: string;
};

export function hasEnded(event: CityEvent, now: Date): boolean {
  return new Date(event.endsAt) < now;
}

export function hasStarted(event: CityEvent, now: Date): boolean {
  return new Date(event.startsAt) <= now;
}

/** Past events drop out automatically, soonest first. */
export function getUpcomingEvents(events: CityEvent[], now: Date, category?: string): CityEvent[] {
  return events
    .filter((event) => !hasEnded(event, now) && (!category || event.category === category))
    .sort((a, b) => a.startsAt.localeCompare(b.startsAt));
}
