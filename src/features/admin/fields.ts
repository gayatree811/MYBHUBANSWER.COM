export type FieldType =
  "text" | "textarea" | "number" | "date" | "select" | "list" | "checkbox" | "password" | "image";

export type Option = { value: string; label: string };

export type Field = {
  name: string;
  label: string;
  type?: FieldType;
  required?: boolean;
  hint?: string;
  options?: Option[];
  /** Fills the options from these Category groups when the form loads. */
  categoryGroups?: string[];
};

export type AdminResource = {
  label: string;
  singular: string;
  titleField: string;
  subtitleField: string;
  adminOnly?: boolean;
  fields: Field[];
};

const STATUS: Field = {
  name: "status",
  label: "Status",
  type: "select",
  required: true,
  hint: "Only published records appear on the public site.",
  options: [
    { value: "draft", label: "Draft" },
    { value: "published", label: "Published" },
  ],
};

const slug: Field = {
  name: "slug",
  label: "URL name",
  required: true,
  hint: "Lowercase words joined by hyphens, such as lingaraja-temple.",
};

const SOURCE: Field[] = [
  { name: "source.name", label: "Source name", required: true },
  { name: "source.url", label: "Source URL", required: true },
];

const LAST_CHECKED: Field = {
  name: "lastChecked",
  label: "Last checked",
  type: "date",
  required: true,
};

const PHOTO: Field[] = [
  { name: "photo.src", label: "Photo", type: "image", hint: "Upload an image or paste its URL." },
  { name: "photo.width", label: "Photo width", type: "number" },
  { name: "photo.height", label: "Photo height", type: "number" },
  { name: "photo.alt", label: "Photo description" },
  { name: "photo.title", label: "Photo title" },
  { name: "photo.author", label: "Photographer" },
  { name: "photo.license", label: "License" },
  { name: "photo.licenseUrl", label: "License URL" },
  { name: "photo.sourceUrl", label: "Photo source URL" },
];

export const ADMIN_RESOURCES: Record<string, AdminResource> = {
  places: {
    label: "Places and food",
    singular: "listing",
    titleField: "name",
    subtitleField: "area",
    fields: [
      { name: "name", label: "Name", required: true },
      slug,
      STATUS,
      {
        name: "kind",
        label: "Type",
        type: "select",
        required: true,
        options: [
          { value: "place", label: "Place" },
          { value: "food", label: "Food" },
        ],
      },
      {
        name: "category",
        label: "Category",
        type: "select",
        required: true,
        categoryGroups: ["place", "food"],
      },
      { name: "summary", label: "Summary", type: "textarea", required: true },
      { name: "description", label: "Description", type: "textarea", required: true },
      { name: "area", label: "Area", required: true },
      { name: "coordinates.lat", label: "Latitude", type: "number" },
      { name: "coordinates.lng", label: "Longitude", type: "number" },
      { name: "hours.text", label: "Verified hours", hint: "Leave empty if unverified." },
      { name: "hours.source.name", label: "Hours source name" },
      { name: "hours.source.url", label: "Hours source URL" },
      { name: "cuisines", label: "Cuisines", type: "list", hint: "One per line. Food only." },
      {
        name: "priceBand",
        label: "Price range",
        type: "select",
        options: [
          { value: "budget", label: "Under ₹500" },
          { value: "mid", label: "₹500 to ₹1,500" },
          { value: "premium", label: "Over ₹1,500" },
        ],
      },
      { name: "priceNote", label: "Price note" },
      { name: "phone", label: "Phone" },
      ...SOURCE,
      LAST_CHECKED,
      ...PHOTO,
      { name: "photoIsIllustrative", label: "Photo is illustrative", type: "checkbox" },
    ],
  },
  events: {
    label: "Events",
    singular: "event",
    titleField: "name",
    subtitleField: "venue",
    fields: [
      { name: "name", label: "Name", required: true },
      slug,
      STATUS,
      {
        name: "category",
        label: "Category",
        type: "select",
        required: true,
        categoryGroups: ["event"],
      },
      { name: "summary", label: "Summary", type: "textarea", required: true },
      {
        name: "startsAt",
        label: "Starts",
        required: true,
        hint: "For example, 2026-11-14T06:00:00+05:30.",
      },
      { name: "endsAt", label: "Ends", required: true },
      { name: "venue", label: "Venue", required: true },
      { name: "organizer", label: "Organizer", hint: "Leave empty if unknown." },
      ...SOURCE,
      LAST_CHECKED,
      ...PHOTO,
    ],
  },
  news: {
    label: "News",
    singular: "article",
    titleField: "title",
    subtitleField: "publishedAt",
    fields: [
      { name: "title", label: "Title", required: true },
      slug,
      STATUS,
      {
        name: "topic",
        label: "Topic",
        type: "select",
        required: true,
        categoryGroups: ["news"],
      },
      {
        name: "summary",
        label: "Summary",
        type: "textarea",
        required: true,
        hint: "Write your own summary. Don't copy the article.",
      },
      { name: "publishedAt", label: "Published", type: "date", required: true },
      ...SOURCE,
      ...PHOTO,
    ],
  },
  "bus-routes": {
    label: "Bus routes",
    singular: "route",
    titleField: "number",
    subtitleField: "to",
    fields: [
      { name: "number", label: "Route number", required: true },
      slug,
      STATUS,
      { name: "from", label: "From", required: true },
      { name: "to", label: "To", required: true },
      { name: "directorySource.name", label: "Directory source name", required: true },
      { name: "directorySource.url", label: "Directory source URL", required: true },
      { name: "details.stops", label: "Stops", type: "list", hint: "One per line, in order." },
      { name: "details.timetableNote", label: "Timetable note" },
      { name: "details.sourceDate", label: "Timetable source date" },
      { name: "details.sourceUrl", label: "Timetable source URL" },
    ],
  },
  "bus-stops": {
    label: "Bus stops",
    singular: "stop",
    titleField: "name",
    subtitleField: "slug",
    fields: [
      { name: "name", label: "Name", required: true },
      slug,
      STATUS,
      { name: "routes", label: "Routes", type: "list", hint: "One route number per line." },
    ],
  },
  categories: {
    label: "Categories",
    singular: "category",
    titleField: "label",
    subtitleField: "group",
    fields: [
      { name: "label", label: "Label", required: true },
      slug,
      {
        name: "group",
        label: "Used for",
        type: "select",
        required: true,
        options: [
          { value: "place", label: "Places" },
          { value: "food", label: "Food" },
          { value: "event", label: "Events" },
          { value: "news", label: "News" },
        ],
      },
    ],
  },
  people: {
    label: "People",
    singular: "person",
    titleField: "name",
    subtitleField: "role",
    fields: [
      { name: "name", label: "Name", required: true },
      slug,
      STATUS,
      { name: "role", label: "Known for" },
      { name: "biography", label: "Biography", type: "textarea", required: true },
      ...SOURCE,
      LAST_CHECKED,
      ...PHOTO,
    ],
  },
  businesses: {
    label: "Businesses",
    singular: "business",
    titleField: "name",
    subtitleField: "area",
    fields: [
      { name: "name", label: "Name", required: true },
      slug,
      STATUS,
      { name: "category", label: "Category", required: true },
      { name: "description", label: "Description", type: "textarea", required: true },
      { name: "area", label: "Area", required: true },
      { name: "phone", label: "Phone" },
      { name: "website", label: "Website" },
      ...SOURCE,
      LAST_CHECKED,
    ],
  },
  users: {
    label: "Users",
    singular: "user",
    titleField: "email",
    subtitleField: "role",
    adminOnly: true,
    fields: [
      { name: "name", label: "Name", required: true },
      { name: "email", label: "Email", required: true },
      {
        name: "role",
        label: "Role",
        type: "select",
        required: true,
        options: [
          { value: "editor", label: "Editor" },
          { value: "admin", label: "Admin" },
        ],
      },
      { name: "active", label: "Account is active", type: "checkbox" },
      {
        name: "password",
        label: "Password",
        type: "password",
        hint: "At least 12 characters. Leave empty to keep the current password.",
      },
    ],
  },
};
