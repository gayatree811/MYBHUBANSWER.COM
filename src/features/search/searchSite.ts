import { getUpcomingEvents, type CityEvent } from "@/features/events/events";
import {
  getCategoryLabel,
  getListingHref,
  getSearchWords,
  scoreMatch,
  searchListings,
} from "@/features/listings/queries";
import type { Listing } from "@/features/listings/types";
import type { NewsArticle } from "@/features/news/articles";
import type { BusRoute } from "@/features/transport/busRoutes";
import { formatDateRange, formatShortDate } from "@/lib/dates";
import type { Photo } from "@/lib/photos";
import { findBusRoutes } from "@/features/transport/queries";

export type SearchResult = {
  href: string;
  title: string;
  description: string;
  badge: string;
  photo?: Photo;
};

export type SearchContent = {
  listings: Listing[];
  events: CityEvent[];
  articles: NewsArticle[];
  busRoutes: BusRoute[];
};

/** Searches every public section. Listings come first, then dated content. */
export function searchSite(query: string, now: Date, content: SearchContent): SearchResult[] {
  const words = getSearchWords(query);
  if (words.length === 0) return [];

  const listings = searchListings(content.listings, query).map((listing) => ({
    href: getListingHref(listing),
    title: listing.name,
    description: listing.summary,
    badge: getCategoryLabel(listing),
    photo: listing.photo,
  }));

  const events = getUpcomingEvents(content.events, now)
    .filter(
      (event) =>
        scoreMatch(
          words,
          event.name,
          `${event.summary} ${event.venue} ${event.organizer ?? ""} ${event.categoryLabel ?? ""} event`,
        ) !== null,
    )
    .map((event) => ({
      href: `/events/${event.slug}`,
      title: event.name,
      description: `${formatDateRange(event.startsAt, event.endsAt)} · ${event.venue}`,
      badge: "Event",
      photo: event.photo,
    }));

  const news = content.articles
    .filter(
      (article) =>
        scoreMatch(words, article.title, `${article.summary} ${article.topicLabel ?? ""} news`) !==
        null,
    )
    .map((article) => ({
      href: `/news/${article.slug}`,
      title: article.title,
      description: `${formatShortDate(article.publishedAt)} · ${article.source.name}`,
      badge: "News",
      photo: article.photo,
    }));

  const busWords = words.filter((word) => word !== "bus" && word !== "route");
  const routes = findBusRoutes(content.busRoutes, busWords.join(" "));

  return [
    ...listings,
    ...events,
    ...news,
    ...routes.slice(0, 6).map((route) => ({
      href: `/transport/bus/${route.slug}`,
      title: `Ama Bus route ${route.number}`,
      description: `${route.from} to ${route.to}`,
      badge: "Bus route",
    })),
  ];
}
