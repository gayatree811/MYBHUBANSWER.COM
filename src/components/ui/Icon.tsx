import type { SVGProps } from "react";

const PATHS = {
  alert:
    "M12 8v5m0 3.5h.01M10.3 3.9 2.6 17.2A2 2 0 0 0 4.3 20h15.4a2 2 0 0 0 1.7-2.8L13.7 3.9a2 2 0 0 0-3.4 0Z",
  arrowRight: "M5 12h14m-6-6 6 6-6 6",
  bus: "M8 6v6m8-6v6M3 12h18M6 18v2m12-2v2M7 18h10a3 3 0 0 0 3-3V8a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v7a3 3 0 0 0 3 3Zm0-3h.01M17 15h.01",
  calendar:
    "M8 3v4m8-4v4M4 10h16M6 5h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z",
  check: "m5 12.5 4.5 4.5L19 7.5",
  clock: "M12 7v5l3 2m6-2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
  compass: "m15.5 8.5-2 5-5 2 2-5 5-2ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
  external: "M14 4h6v6m0-6-9 9M18 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4",
  home: "m3 11 9-7 9 7M5.5 9.5V19a1 1 0 0 0 1 1H10v-5.5h4V20h3.5a1 1 0 0 0 1-1V9.5",
  inbox: "M3 13h5l1.5 3h5L16 13h5M5.5 5h13L21 13v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5l2.5-8Z",
  link: "M10 14a4 4 0 0 0 6 .4l3-3a4 4 0 0 0-5.7-5.7l-1.7 1.7M14 10a4 4 0 0 0-6-.4l-3 3a4 4 0 0 0 5.7 5.7l1.7-1.7",
  map: "m9 4 6 2 6-2v14l-6 2-6-2-6 2V6l6-2Zm0 0v14m6-12v14",
  mapPin:
    "M12 21s7-6.2 7-11.5a7 7 0 1 0-14 0C5 14.8 12 21 12 21Zm0-9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z",
  menu: "M4 7h16M4 12h16M4 17h16",
  newspaper:
    "M6 20H5a2 2 0 0 1-2-2V6h14v12a2 2 0 0 0 2 2H6Zm0 0h13a2 2 0 0 0 2-2V9h-4M7 10h6M7 14h6",
  phone:
    "M6.5 3.5 9 3l2 4.5L9 9c.9 2.4 3 4.5 6 6l1.5-2 4.5 2-.5 2.5a3 3 0 0 1-3 2.5C10 20.5 3.5 14 3.5 6.5a3 3 0 0 1 3-3Z",
  search: "m20 20-4.5-4.5M17 10.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0Z",
  shield: "m9 12 2 2 4-4m-3-7 7 2.5V11c0 4.5-3 8-7 10-4-2-7-5.5-7-10V5.5L12 3Z",
  tag: "M3 12V4h8l10 10-8 8L3 12Zm5-3.5h.01",
  utensils: "M6 3v7a2 2 0 0 0 2 2v9m2-18v7a2 2 0 0 1-2 2M8 3v6m10 12v-7h-2c-.6-3.5.2-8.5 2-11v18Z",
  x: "M6 6l12 12M18 6 6 18",
} as const;

export type IconName = keyof typeof PATHS;

type IconProps = SVGProps<SVGSVGElement> & { name: IconName };

/** Decorative by default. Give the parent control an accessible label. */
export function Icon({ name, className = "size-5", ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path d={PATHS[name]} />
    </svg>
  );
}
