export type LeafletModule = typeof import("leaflet");

const VERSION = "1.9.4";
const BASE_URL = `https://unpkg.com/leaflet@${VERSION}/dist`;
const STYLE_INTEGRITY = "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=";
const SCRIPT_INTEGRITY = "sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=";

let loading: Promise<LeafletModule> | null = null;

/**
 * Loads Leaflet only on pages with a map, which keeps other pages light. The
 * integrity hashes make the browser reject a file that has been changed.
 */
export function loadLeaflet(): Promise<LeafletModule> {
  loading ??= new Promise((resolve, reject) => {
    const style = document.createElement("link");
    style.rel = "stylesheet";
    style.href = `${BASE_URL}/leaflet.css`;
    style.integrity = STYLE_INTEGRITY;
    style.crossOrigin = "";

    const script = document.createElement("script");
    script.src = `${BASE_URL}/leaflet.js`;
    script.integrity = SCRIPT_INTEGRITY;
    script.crossOrigin = "";
    script.onload = () => resolve((window as unknown as { L: LeafletModule }).L);
    script.onerror = () => {
      loading = null;
      reject(new Error("Leaflet could not be loaded"));
    };

    document.head.append(style, script);
  });

  return loading;
}
