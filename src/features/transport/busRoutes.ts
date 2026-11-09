export type BusRouteDetails = {
  /** Estimated by an unofficial timetable site, so never shown as official. */
  timetableNote: string;
  sourceDate: string;
  sourceUrl: string;
  stops: string[];
};

export type BusRoute = {
  slug: string;
  number: string;
  from: string;
  to: string;
  directorySource: { name: string; url: string };
  details?: BusRouteDetails;
};
