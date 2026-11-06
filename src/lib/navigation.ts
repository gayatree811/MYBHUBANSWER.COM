import type { IconName } from "@/components/ui/Icon";
import { PHOTOS, type Photo } from "@/lib/photos";

export type NavItem = {
  href: string;
  label: string;
  description: string;
  icon: IconName;
  photo: Photo;
  ready?: boolean;
};

/** The V1 sections of the site. `ready` marks the sections that are live. */
export const NAV_ITEMS: NavItem[] = [
  {
    href: "/explore",
    label: "Explore",
    description: "Temples, heritage sites and places worth discovering.",
    icon: "compass",
    photo: PHOTOS.lingaraj,
    ready: true,
  },
  {
    href: "/food",
    label: "Food",
    description: "Odia food, restaurants and cafes across the city.",
    icon: "utensils",
    photo: PHOTOS.odiaLunch,
    ready: true,
  },
  {
    href: "/events",
    label: "Events",
    description: "Cultural programs, festivals and things to do.",
    icon: "calendar",
    photo: PHOTOS.odissi,
    ready: true,
  },
  {
    href: "/news",
    label: "News",
    description: "Dated, sourced stories from around the city.",
    icon: "newspaper",
    photo: PHOTOS.skyline,
    ready: true,
  },
  {
    href: "/transport",
    label: "Transport",
    description: "Ama Bus routes, railway and airport information.",
    icon: "bus",
    photo: PHOTOS.moBus,
    ready: true,
  },
  {
    href: "/map",
    label: "Map",
    description: "See verified places around the city.",
    icon: "map",
    photo: PHOTOS.udayagiri,
    ready: true,
  },
];

export const FOOTER_LINKS = [{ href: "/photo-credits", label: "Photo credits" }];

/** A nav link stays active on its nested pages, such as /explore/temples. */
export function isActivePath(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}
