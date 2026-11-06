import type { Photo } from "@/lib/photos";

export type PriceBand = "budget" | "mid" | "premium";

export type Source = { name: string; url: string };

export type VerifiedHours = { text: string; source: Source };

type BaseListing = {
  slug: string;
  name: string;
  summary: string;
  description: string;
  area: string;
  /** Leave out when no reliable location exists. Never estimate coordinates. */
  coordinates?: { lat: number; lng: number };
  photo?: Photo;
  /** True when the photo shows a dish, not this business. */
  photoIsIllustrative?: boolean;
  /** Leave out when unverified. The page then shows timings as unavailable. */
  hours?: VerifiedHours;
  source: Source;
  lastChecked: string;
  /** Added when loaded, from the Category collection. */
  categoryLabel?: string;
};

export type Place = BaseListing & { kind: "place"; category: string };

export type FoodPlace = BaseListing & {
  kind: "food";
  category: string;
  cuisines: string[];
  priceBand?: PriceBand;
  priceNote?: string;
  phone?: string;
};

export type Listing = Place | FoodPlace;

export const PRICE_BANDS: Record<PriceBand, string> = {
  budget: "Under ₹500",
  mid: "₹500 to ₹1,500",
  premium: "Over ₹1,500",
};
