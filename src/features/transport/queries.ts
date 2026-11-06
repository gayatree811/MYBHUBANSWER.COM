import { getSearchWords, scoreMatch } from "@/features/listings/queries";
import type { BusRoute } from "@/features/transport/busRoutes";

export const BUS_HUBS = [
  { value: "railway", label: "Railway station", match: "Bhubaneswar Railway Station" },
  { value: "bsabt", label: "BSABT, Baramunda", match: "BSABT" },
  { value: "airport", label: "Airport", match: "Biju Patnaik International Airport" },
];

function getRouteText(route: BusRoute): string {
  return [route.from, route.to, ...(route.details?.stops ?? [])].join(" ");
}

/** Finds routes by number, terminus or known stop, within an optional hub. */
export function findBusRoutes(routes: BusRoute[], query = "", hub?: string): BusRoute[] {
  const match = BUS_HUBS.find((option) => option.value === hub)?.match;
  const words = getSearchWords(query);

  return routes.filter(
    (route) =>
      (!match || route.from === match || route.to === match) &&
      scoreMatch(words, route.number, getRouteText(route)) !== null,
  );
}
