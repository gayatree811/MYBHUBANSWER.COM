import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
  align?: "start" | "center";
  headingLevel?: "h1" | "h2";
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  action,
  align = "start",
  headingLevel: Heading = "h2",
}: SectionHeaderProps) {
  const centered = align === "center";

  return (
    <header
      className={cn(
        "mb-10 flex flex-col gap-6 md:mb-14",
        centered ? "items-center text-center" : "md:flex-row md:items-end md:justify-between",
      )}
    >
      <div className="max-w-2xl">
        {eyebrow && (
          <p className="mb-3 text-sm font-semibold tracking-wider text-saffron-700 uppercase">
            {eyebrow}
          </p>
        )}
        <Heading className="font-display text-display text-strong">{title}</Heading>
        {description && <p className="mt-4 text-lg leading-relaxed text-muted">{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </header>
  );
}
