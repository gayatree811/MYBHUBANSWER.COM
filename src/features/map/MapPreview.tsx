"use client";

import { useMemo } from "react";
import { CityMap } from "@/features/map/CityMap";
import type { MapListing } from "@/features/map/mapListing";

export function MapPreview({ listing }: { listing: MapListing }) {
  const listings = useMemo(() => [listing], [listing]);

  return (
    <div className="isolate overflow-hidden rounded-card border border-line shadow-soft">
      <CityMap listings={listings} className="h-80 w-full bg-sand-100" />
    </div>
  );
}
