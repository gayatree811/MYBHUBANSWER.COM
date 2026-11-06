import { EVENT_CATEGORIES, getUpcomingEvents } from "@/features/events/events";
import {
  getCategoryLabel,
  getListingHref,
  getSearchWords,
  scoreMatch,
  searchListings,
} from "@/features/listings/queries";
import { ARTICLES, NEWS_TOPICS } from "@/features/news/articles";
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

/** Searches every public section. Listings come first, then dated content. */
export function searchSite(query: string, now: Date): SearchResult[] {
  const words = getSearchWords(query);
  if (words.length === 0) return [];

  const listings = searchListings(query).map((listing) => ({
    href: getListingHref(listing),
    title: listing.name,
    description: listing.summary,
    badge: getCategoryLabel(listing),
    photo: listing.photo,
  }));

  const events = getUpcomingEvents(now)
    .filter(
      (event) =>
        scoreMatch(
          words,
          event.name,
          `${event.summary} ${event.venue} ${event.organizer ?? ""} ${EVENT_CATEGORIES[event.category]} event`,
        ) !== null,
    )
    .map((event) => ({
      href: `/events/${event.slug}`,
      title: event.name,
      description: `${formatDateRange(event.startsAt, event.endsAt)} · ${event.venue}`,
      badge: "Event",
      photo: event.photo,
    }));

  const news = ARTICLES.filter(
    (article) =>
      scoreMatch(words, article.title, `${article.summary} ${NEWS_TOPICS[article.topic]} news`) !==
      null,
  ).map((article) => ({
    href: `/news/${article.slug}`,
    title: article.title,
    description: `${formatShortDate(article.publishedAt)} · ${article.source.name}`,
    badge: "News",
    photo: article.photo,
  }));

  const busWords = words.filter((word) => word !== "bus" && word !== "route");
  const routes = findBusRoutes(busWords.join(" "));

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
