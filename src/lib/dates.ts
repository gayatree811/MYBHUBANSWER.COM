const TIME_ZONE = "Asia/Kolkata";

const DATE = new Intl.DateTimeFormat("en-IN", { dateStyle: "long", timeZone: TIME_ZONE });
const SHORT_DATE = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: TIME_ZONE,
});
const TIME = new Intl.DateTimeFormat("en-IN", {
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
  timeZone: TIME_ZONE,
});

/** All dates display in India Standard Time, wherever they are rendered. */
export function formatDate(iso: string): string {
  return DATE.format(new Date(iso));
}

export function formatShortDate(iso: string): string {
  return SHORT_DATE.format(new Date(iso));
}

export function formatDateRange(start: string, end: string): string {
  const [startDay, endDay] = [formatShortDate(start), formatShortDate(end)];
  return startDay === endDay ? startDay : `${startDay} to ${endDay}`;
}

export function formatTimeRange(start: string, end: string): string {
  return `${TIME.format(new Date(start))} to ${TIME.format(new Date(end))}`;
}
