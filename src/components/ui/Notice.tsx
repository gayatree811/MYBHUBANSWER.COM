import type { ReactNode } from "react";
import { Icon, type IconName } from "@/components/ui/Icon";

/** A short, important message, such as how far to trust scheduled data. */
export function Notice({
  title,
  icon = "clock",
  children,
}: {
  title: string;
  icon?: IconName;
  children: ReactNode;
}) {
  return (
    <aside className="flex gap-4 rounded-card border border-saffron-100 bg-saffron-100/50 p-5">
      <Icon name={icon} className="mt-0.5 size-5 shrink-0 text-saffron-700" />
      <div>
        <h2 className="font-semibold text-strong">{title}</h2>
        <div className="mt-1 leading-relaxed text-ink-700">{children}</div>
      </div>
    </aside>
  );
}
