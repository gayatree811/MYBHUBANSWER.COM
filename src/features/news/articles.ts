import { PHOTOS } from "@/lib/photos";
import type { Photo } from "@/lib/photos";

export type NewsTopic = "civic" | "transport" | "environment";

export type NewsArticle = {
  slug: string;
  title: string;
  topic: NewsTopic;
  /** Our own short summary. The full report stays with its publisher. */
  summary: string;
  publishedAt: string;
  source: { name: string; url: string };
  photo?: Photo;
};

export const NEWS_TOPICS: Record<NewsTopic, string> = {
  civic: "Civic",
  transport: "Transport",
  environment: "Environment",
};

const OMMCOM = "Ommcom News";
const URBAN_ACRES = "Urban Acres";

export const ARTICLES: NewsArticle[] = [
  {
    slug: "bmc-pre-diwali-food-safety-drive",
    title: "BMC destroys 103 kg of stale sweets in pre-Diwali food safety drive",
    topic: "civic",
    summary:
      "Bhubaneswar Municipal Corporation disposed of 103 kg of spoiled sweets, imposed ₹15,000 in fines and collected nine samples for testing. Inspections covered Sailashree Vihar, Damana Square and Infocity, and officials warned that repeat offenders could face sealing or licence cancellation.",
    publishedAt: "2026-11-05",
    source: {
      name: OMMCOM,
      url: "https://ommcomnews.com/odisha-news/bmc-destroys-103-kg-stale-sweets-in-pre-diwali-food-safety-drive/",
    },
    photo: PHOTOS.skyline,
  },
  {
    slug: "bmc-plans-60-electric-vehicles",
    title: "BMC plans 60 electric vehicles for its operations",
    topic: "environment",
    summary:
      "The corporation plans to add 60 electric vehicles for official and field work, alongside EV charging stations and solar-powered benches. The report says the announcement does not specify a timeline or how many diesel vehicles will be replaced.",
    publishedAt: "2026-10-24",
    source: {
      name: URBAN_ACRES,
      url: "https://urbanacres.in/bhubaneswar-plans-60-electric-vehicles-as-bmc-expands-green-mobility/",
    },
    photo: PHOTOS.skyline,
  },
  {
    slug: "ama-bus-employees-protest-pending-salaries",
    title: "117 Ama Buses went off the road during employee protest",
    topic: "transport",
    summary:
      "Ama Bus employees staged a sit-in at the Bhagabanpur Depot over pending salaries and other demands, which halted 117 buses on 45 routes. This May 2026 report describes that day's disruption, not current service.",
    publishedAt: "2026-05-18",
    source: {
      name: OMMCOM,
      url: "https://ommcomnews.com/odisha-news/117-ama-buses-off-roads-in-bhubaneswar-as-employees-launch-protest-over-pending-salaries/",
    },
    photo: PHOTOS.moBus,
  },
  {
    slug: "bmc-budget-2026-27",
    title: "BMC presents ₹1,050 crore budget for 2026-27",
    topic: "civic",
    summary:
      "The budget includes ₹300 crore from the corporation's own revenue and ₹750 crore from central and state grants. Its largest allocations include ₹182 crore for sanitation and cleaning, ₹90 crore for new roads and ₹75 crore for drains and drainage.",
    publishedAt: "2026-02-25",
    source: {
      name: "Pragativadi",
      url: "https://pragativadi.com/bmc-unveils-2026-27-budget-allocates-rs-1050-crore-for-sustainable-makeover-of-bhubaneswar/",
    },
    photo: PHOTOS.skyline,
  },
  {
    slug: "bhubaneswar-airport-terminal-3-announced",
    title: "New Terminal 3 announced for Bhubaneswar airport",
    topic: "transport",
    summary:
      "Union Civil Aviation Minister K. Rammohan Naidu announced that a new Terminal 3 will be built beside the existing terminal. This report dates from October 2025, so check the project's current status.",
    publishedAt: "2025-10-08",
    source: {
      name: "Prameya News",
      url: "https://www.prameyanews.com/bhubaneswar-airport-to-expand-with-new-terminal3",
    },
    photo: PHOTOS.airport,
  },
  {
    slug: "bhubaneswar-new-station-express-trains",
    title: "Bhubaneswar New station becomes terminal for three express trains",
    topic: "transport",
    summary:
      "East Coast Railway made Bhubaneswar New the starting and ending station for the Konark Express, Visakha Express and Visakhapatnam Intercity Express. The move aimed to ease crowding at the main station, according to this May 2025 report.",
    publishedAt: "2025-05-13",
    source: {
      name: URBAN_ACRES,
      url: "https://urbanacres.in/bhubaneswar-expands-with-new-train-terminal/",
    },
    photo: PHOTOS.bhubaneswarStation,
  },
];

export function getArticle(slug: string): NewsArticle | undefined {
  return ARTICLES.find((article) => article.slug === slug);
}

/** Newest first, so editors can add articles in any order. */
export function getArticles(topic?: string): NewsArticle[] {
  return ARTICLES.filter((article) => !topic || article.topic === topic).sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt),
  );
}
