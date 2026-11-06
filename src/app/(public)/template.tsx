import type { ReactNode } from "react";

/** A template re-renders on each navigation, which runs the page transition. */
export default function PublicTemplate({ children }: { children: ReactNode }) {
  return <div className="animate-page">{children}</div>;
}
