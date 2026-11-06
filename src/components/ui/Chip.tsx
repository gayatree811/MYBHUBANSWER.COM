import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type ChipProps = {
  active: boolean;
  children: ReactNode;
  href?: string;
  onClick?: () => void;
};

/** A filter option. Uses a link when its state belongs in the URL. */
export function Chip({ active, children, href, onClick }: ChipProps) {
  const classes = cn(
    "inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-semibold transition duration-200 ease-out-soft hover:-translate-y-0.5",
    active
      ? "border-ink-900 bg-ink-900 text-white"
      : "border-sand-300 bg-surface text-ink-700 hover:border-ink-300",
  );

  if (href) {
    return (
      <Link
        href={href}
        scroll={false}
        aria-current={active ? "true" : undefined}
        className={classes}
      >
        {children}
      </Link>
    );
  }

  return (
    <button type="button" aria-pressed={active} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
