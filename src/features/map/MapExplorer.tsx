"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/cn";
import { Chip } from "@/components/ui/Chip";
import { EmptyState } from "@/components/ui/States";
import { CityMap } from "@/features/map/CityMap";
import type { MapListing } from "@/features/map/mapListing";

type MapExplorerProps = {
  listings: MapListing[];
  groups: { value: string; label: string }[];
};

/** Filters the map and lets the list open a marker's preview. */
export function MapExplorer({ listings, groups }: MapExplorerProps) {
  const [group, setGroup] = useState<string>();
  const [selectedSlug, setSelectedSlug] = useState<string>();

  const visible = useMemo(
    () => (group ? listings.filter((listing) => listing.group === group) : listings),
    [group, listings],
  );

  const chooseGroup = (value?: string) => {
    setGroup(value);
    setSelectedSlug(undefined);
  };

  return (
    <>
      <div role="group" aria-label="Map categories" className="mb-6 flex flex-wrap gap-2">
        <Chip active={!group} onClick={() => chooseGroup()}>
          All
        </Chip>
        {groups.map(({ value, label }) => (
          <Chip key={value} active={group === value} onClick={() => chooseGroup(value)}>
            {label}
          </Chip>
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_22rem]">
        <div className="isolate overflow-hidden rounded-card border border-line shadow-soft">
          <CityMap
            listings={visible}
            selectedSlug={selectedSlug}
            className="h-[60svh] min-h-96 w-full bg-sand-100 lg:h-[70svh]"
          />
        </div>

        <div className="max-h-[70svh] overflow-y-auto rounded-card border border-line bg-surface p-2">
          {visible.length === 0 ? (
            <EmptyState title="No places" description="Try another category." />
          ) : (
            <ul>
              {visible.map((listing) => (
                <li key={listing.slug}>
                  <button
                    type="button"
                    onClick={() => setSelectedSlug(listing.slug)}
                    className={cn(
                      "w-full rounded-control p-3 text-left transition-colors hover:bg-sand-100",
                      selectedSlug === listing.slug && "bg-saffron-100",
                    )}
                  >
                    <span className="block font-semibold text-strong">{listing.name}</span>
                    <span className="block text-sm text-muted">{listing.categoryLabel}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
