"use client";

import type { LayerGroup, Map as LeafletMap, Marker } from "leaflet";
import { getImageProps } from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ErrorState } from "@/components/ui/States";
import { loadLeaflet, type LeafletModule } from "@/features/map/loadLeaflet";
import type { MapListing } from "@/features/map/mapListing";

const BHUBANESWAR = { lat: 20.2961, lng: 85.8245 };

type CityMapProps = {
  listings: MapListing[];
  selectedSlug?: string;
  className?: string;
};

/** Builds the preview with DOM nodes, so listing text is never parsed as HTML. */
function createPreview(listing: MapListing, onOpen: (href: string) => void) {
  const card = document.createElement("div");
  card.className = "map-preview";

  if (listing.photoSrc) {
    const { src } = getImageProps({
      src: listing.photoSrc,
      alt: "",
      width: 384,
      height: 216,
    }).props;
    const image = document.createElement("img");
    image.src = src;
    image.alt = "";
    image.onerror = () => image.remove();
    card.append(image);
  }

  const category = document.createElement("p");
  category.className = "map-preview-category";
  category.textContent = listing.categoryLabel;

  const title = document.createElement("h3");
  title.textContent = listing.name;

  const summary = document.createElement("p");
  summary.textContent = listing.summary;

  const link = document.createElement("a");
  link.href = listing.href;
  link.textContent = "View details";
  link.addEventListener("click", (event) => {
    event.preventDefault();
    onOpen(listing.href);
  });

  card.append(category, title, summary, link);
  return card;
}

export function CityMap({ listings, selectedSlug, className }: CityMapProps) {
  const router = useRouter();
  const container = useRef<HTMLDivElement>(null);
  const leaflet = useRef<LeafletModule | null>(null);
  const map = useRef<LeafletMap | null>(null);
  const markers = useRef(new Map<string, Marker>());
  const markerLayer = useRef<LayerGroup | null>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  // Leaflet needs the browser, so it loads only after the page has mounted.
  useEffect(() => {
    let cancelled = false;

    loadLeaflet().then(
      (L) => {
        if (cancelled || !container.current) return;

        leaflet.current = L;
        map.current = L.map(container.current, { scrollWheelZoom: false }).setView(BHUBANESWAR, 12);
        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map.current);
        markerLayer.current = L.layerGroup().addTo(map.current);
        setReady(true);
      },
      () => setFailed(true),
    );

    return () => {
      cancelled = true;
      // Stops any pan in progress, which would otherwise run after removal.
      map.current?.stop();
      map.current?.remove();
      map.current = null;
    };
  }, []);

  useEffect(() => {
    const L = leaflet.current;
    if (!ready || !L || !map.current || !markerLayer.current) return;

    markerLayer.current.clearLayers();
    markers.current.clear();

    for (const listing of listings) {
      const marker = L.marker([listing.lat, listing.lng], {
        title: listing.name,
        alt: listing.name,
        icon: L.divIcon({
          className: `map-pin map-pin-${listing.group}`,
          html: "<span></span>",
          iconSize: [34, 34],
          iconAnchor: [17, 32],
          popupAnchor: [0, -30],
        }),
      });

      marker.bindPopup(() => createPreview(listing, (href) => router.push(href)), {
        minWidth: 240,
        maxWidth: 260,
      });
      marker.addTo(markerLayer.current);
      markers.current.set(listing.slug, marker);
    }

    if (listings.length === 1) {
      map.current.setView([listings[0].lat, listings[0].lng], 15);
    } else if (listings.length > 1) {
      map.current.fitBounds(L.latLngBounds(listings.map(({ lat, lng }) => [lat, lng])), {
        padding: [48, 48],
      });
    }
  }, [ready, listings, router]);

  useEffect(() => {
    if (!selectedSlug || !map.current) return;

    const marker = markers.current.get(selectedSlug);
    if (!marker) return;

    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    map.current.setView(marker.getLatLng(), 15, { animate: !calm });
    marker.openPopup();
  }, [selectedSlug, ready]);

  if (failed) {
    return (
      <ErrorState
        title="The map couldn't be loaded"
        description="Check your connection and try again. Listings and directions still work."
      />
    );
  }

  return <div ref={container} className={className} role="region" aria-label="City map" />;
}
