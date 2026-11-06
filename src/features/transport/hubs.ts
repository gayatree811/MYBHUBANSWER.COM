import { PHOTOS } from "@/lib/photos";
import type { MapListing } from "@/features/map/mapListing";

const hub = (details: Omit<MapListing, "group" | "categoryLabel">): MapListing => ({
  ...details,
  group: "transport",
  categoryLabel: "Transport",
});

export const BHUBANESWAR_STATION = hub({
  slug: "bhubaneswar-railway-station",
  name: "Bhubaneswar railway station (BBS)",
  summary: "The city's main railway station, at Master Canteen.",
  href: "/transport/railway",
  lat: 20.2656,
  lng: 85.8431,
  photoSrc: PHOTOS.bhubaneswarStation.src,
});

export const NEW_STATION = hub({
  slug: "bhubaneswar-new-railway-station",
  name: "Bhubaneswar New railway station (BBSN)",
  summary: "A satellite passenger terminal in northern Bhubaneswar.",
  href: "/transport/railway",
  lat: 20.383,
  lng: 85.8356,
});

export const AIRPORT = hub({
  slug: "biju-patnaik-international-airport",
  name: "Biju Patnaik International Airport (BBI)",
  summary: "The international airport serving Bhubaneswar.",
  href: "/transport/airport",
  lat: 20.24444444,
  lng: 85.81777778,
  photoSrc: PHOTOS.airport.src,
});

export const TRANSPORT_HUBS = [BHUBANESWAR_STATION, NEW_STATION, AIRPORT];
