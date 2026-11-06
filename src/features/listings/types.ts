import type { IconName } from "@/components/ui/Icon";
import type { Photo } from "@/lib/photos";

export type PlaceCategory = "temple" | "heritage" | "museum" | "nature" | "sports";
export type FoodCategory = "restaurant" | "cafe" | "street-food";
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
};

export type Place = BaseListing & { kind: "place"; category: PlaceCategory };

export type FoodPlace = BaseListing & {
  kind: "food";
  category: FoodCategory;
  cuisines: string[];
  priceBand?: PriceBand;
  priceNote?: string;
  phone?: string;
};

export type Listing = Place | FoodPlace;

export const PLACE_CATEGORIES: Record<PlaceCategory, { label: string; icon: IconName }> = {
  temple: { label: "Temples", icon: "compass" },
  heritage: { label: "Heritage", icon: "shield" },
  museum: { label: "Museums", icon: "newspaper" },
  nature: { label: "Nature", icon: "mapPin" },
  sports: { label: "Sports", icon: "calendar" },
};

export const FOOD_CATEGORIES: Record<FoodCategory, { label: string; icon: IconName }> = {
  restaurant: { label: "Restaurants", icon: "utensils" },
  cafe: { label: "Cafes", icon: "utensils" },
  "street-food": { label: "Street food", icon: "utensils" },
};

export const PRICE_BANDS: Record<PriceBand, string> = {
  budget: "Under ₹500",
  mid: "₹500 to ₹1,500",
  premium: "Over ₹1,500",
};
