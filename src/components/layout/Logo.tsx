import Link from "next/link";
import { cn } from "@/lib/cn";

/** An original mark based on the curved tower of a Kalinga-style temple. */
export function TempleMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M16 2.5c1 0 1.7.8 1.7 1.7 0 .5-.2 1-.6 1.3 2.7.5 3.8 1.9 4.1 3.6.6 3.6 1.4 8.8 3.8 14H7c2.4-5.2 3.2-10.4 3.8-14 .3-1.7 1.4-3.1 4.1-3.6-.4-.3-.6-.8-.6-1.3 0-.9.7-1.7 1.7-1.7Z" />
      <rect x="4.5" y="24.5" width="23" height="3.5" rx="1.25" />
    </svg>
  );
}

export function Logo({
  tone = "dark",
  onClick,
}: {
  tone?: "dark" | "light";
  onClick?: () => void;
}) {
  const light = tone === "light";

  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label="MyBhubaneswar.com home"
      className="group inline-flex items-center gap-2"
    >
      <TempleMark className="size-8 text-saffron-500 transition-transform duration-500 ease-out-soft group-hover:-translate-y-0.5" />
      <span
        className={cn(
          "font-display text-xl font-semibold tracking-tight transition-colors duration-300",
          light ? "text-white" : "text-strong",
        )}
      >
        My<span className={light ? "text-saffron-400" : "text-brand"}>Bhubaneswar</span>
      </span>
    </Link>
  );
}
