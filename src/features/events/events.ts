import { PHOTOS, type Photo } from "@/lib/photos";

export type EventCategory = "sports" | "culture" | "business" | "learning";

export type CityEvent = {
  slug: string;
  name: string;
  category: EventCategory;
  summary: string;
  startsAt: string;
  endsAt: string;
  venue: string;
  /** Leave out when unstated. The page then shows it as unavailable. */
  organizer?: string;
  source: { name: string; url: string };
  lastChecked: string;
  photo?: Photo;
};

export const EVENT_CATEGORIES: Record<EventCategory, string> = {
  sports: "Sports",
  culture: "Arts and culture",
  business: "Business",
  learning: "Learning",
};

const lastChecked = "2026-11-06";
const ODISHA360 = "Odisha360";
const ALLEVENTS = "AllEvents";

export const EVENTS: CityEvent[] = [
  {
    lastChecked,
    slug: "parichaya-national-tribal-carnival",
    name: "Parichaya: The National Tribal Carnival",
    category: "culture",
    summary: "A national tribal carnival at the IDCO Exhibition Ground.",
    startsAt: "2026-10-29T16:00:00+05:30",
    endsAt: "2026-11-07T22:00:00+05:30",
    venue: "IDCO Exhibition Ground, Bhubaneswar",
    source: { name: ODISHA360, url: "https://www.odisha360.com/events/town/bhubaneswar" },
    photo: PHOTOS.odissi,
  },
  {
    lastChecked,
    slug: "osba-sub-junior-state-championship-2026",
    name: "OSBA All Odisha 38th Sub Junior State Championship",
    category: "sports",
    summary: "A state-level badminton tournament for Under-15 and Under-17 players.",
    startsAt: "2026-11-06T08:30:00+05:30",
    endsAt: "2026-11-09T15:00:00+05:30",
    venue: "MPIS Pokhariput, Bhubaneswar",
    organizer: "Odisha State Badminton Association",
    source: {
      name: ODISHA360,
      url: "https://www.odisha360.com/events/event-details/osba-all-odisha-38th-sub-junior-state-championship-2026-2026-10-07",
    },
  },
  {
    lastChecked,
    slug: "international-conference-on-integrative-proteomics",
    name: "International Conference on Integrative Proteomics",
    category: "learning",
    summary: "The 18th Annual Meeting of the Proteomics Society, India.",
    startsAt: "2026-11-12T10:00:00+05:30",
    endsAt: "2026-11-14T17:00:00+05:30",
    venue: "BRIC-Institute of Life Sciences, Bhubaneswar",
    organizer: "Proteomics Society, India",
    source: {
      name: ODISHA360,
      url: "https://www.odisha360.com/events/event-details/international-conference-on-integrative-proteomics-2026-10-04",
    },
  },
  {
    lastChecked,
    slug: "yi-run-for-mental-health-2026",
    name: "Yi Run For Mental Health 2026",
    category: "sports",
    summary: "A community run promoting mental health awareness and well-being.",
    startsAt: "2026-11-14T06:00:00+05:30",
    endsAt: "2026-11-14T08:00:00+05:30",
    venue: "Hatiasuni Ground, Bhubaneswar",
    organizer: "Yi Bhubaneswar",
    source: {
      name: ODISHA360,
      url: "https://www.odisha360.com/events/event-details/yi-run-for-mental-health-2026-2026-10-20",
    },
  },
  {
    lastChecked,
    slug: "scaleup-india-summit-2026",
    name: "ScaleUp India Summit 2026",
    category: "business",
    summary: "Panels, keynotes and networking for startups.",
    startsAt: "2026-11-14T10:30:00+05:30",
    endsAt: "2026-11-15T17:30:00+05:30",
    venue: "Crystal Crown, Bhubaneswar",
    source: {
      name: ODISHA360,
      url: "https://www.odisha360.com/events/event-details/scaleup-india-summit-2026-2026-10-30",
    },
  },
  {
    lastChecked,
    slug: "global-solar-expo-odisha",
    name: "Global Solar Expo Odisha",
    category: "business",
    summary: "A solar expo, co-located with a trade fair on electric vehicles and batteries.",
    startsAt: "2026-11-27T09:30:00+05:30",
    endsAt: "2026-11-28T18:30:00+05:30",
    venue: "IDCO Exhibition Ground, Unit 3, Bhubaneswar",
    organizer: "EQMagPro",
    source: {
      name: ALLEVENTS,
      url: "https://allevents.in/bhubaneswar/bhubaneshwar-global-solar-expo-odisha/200030854901916",
    },
  },
  {
    lastChecked,
    slug: "punascha-abalokar",
    name: "Punascha Abalokar",
    category: "culture",
    summary: "A play about a once-thriving kingdom and the rulers who brought about its fall.",
    startsAt: "2026-11-29T19:05:00+05:30",
    endsAt: "2026-11-29T20:55:00+05:30",
    venue: "Rabindra Mandap, Unit 4, Bhubaneswar",
    source: {
      name: ALLEVENTS,
      url: "https://allevents.in/bhubaneswar/punascha-abalokar/3900030978766855",
    },
    photo: PHOTOS.odissi,
  },
  {
    lastChecked,
    slug: "sbi-green-marathon-s7-bhubaneswar",
    name: "SBI Green Marathon S7",
    category: "sports",
    summary: "A marathon built around environmental sustainability.",
    startsAt: "2026-12-06T05:00:00+05:30",
    endsAt: "2026-12-06T09:00:00+05:30",
    venue: "Siksha O Anusandhan University, Kalinganagar, Bhubaneswar",
    source: {
      name: ALLEVENTS,
      url: "https://allevents.in/bhubaneswar/sbi-green-marathon-s7-bhubaneswar/3900030978768717",
    },
  },
  {
    lastChecked,
    slug: "shreya-ghoshal-unstoppable-india-tour",
    name: "Shreya Ghoshal: The Unstoppable India Tour",
    category: "culture",
    summary: "A concert stop on Shreya Ghoshal's India tour.",
    startsAt: "2027-01-16T18:00:00+05:30",
    endsAt: "2027-01-16T22:00:00+05:30",
    venue: "Wonderla Amusement Park, Bhubaneswar",
    source: {
      name: ALLEVENTS,
      url: "https://allevents.in/bhubaneswar/shreya-ghoshal-the-unstoppable-india-tour/4100030762809728",
    },
    photo: PHOTOS.odissi,
  },
];

export function getEvent(slug: string): CityEvent | undefined {
  return EVENTS.find((event) => event.slug === slug);
}

export function hasEnded(event: CityEvent, now: Date): boolean {
  return new Date(event.endsAt) < now;
}

export function hasStarted(event: CityEvent, now: Date): boolean {
  return new Date(event.startsAt) <= now;
}

/** Past events drop out automatically, soonest first. */
export function getUpcomingEvents(now: Date, category?: string): CityEvent[] {
  return EVENTS.filter(
    (event) => !hasEnded(event, now) && (!category || event.category === category),
  ).sort((a, b) => a.startsAt.localeCompare(b.startsAt));
}
