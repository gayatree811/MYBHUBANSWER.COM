import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tone = "neutral" | "saffron" | "temple" | "lotus" | "river" | "glass";

const TONES: Record<Tone, string> = {
  neutral: "bg-sand-100 text-ink-700",
  saffron: "bg-saffron-100 text-saffron-700",
  temple: "bg-temple-100 text-temple-700",
  lotus: "bg-lotus-100 text-lotus-700",
  river: "bg-river-100 text-river-700",
  glass: "border border-white/25 bg-ink-950/45 text-white backdrop-blur-md",
};

export function Badge({ tone = "neutral", children }: { tone?: Tone; children: ReactNode }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold",
        TONES[tone],
      )}
    >
      {children}
    </span>
  );
}
