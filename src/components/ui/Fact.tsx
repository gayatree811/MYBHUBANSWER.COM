import type { ReactNode } from "react";
import { Icon, type IconName } from "@/components/ui/Icon";

export const factLinkClass = "font-semibold text-saffron-700 underline-offset-4 hover:underline";

/** One labelled detail. Use inside a description list (dl). */
export function Fact({
  icon,
  label,
  children,
}: {
  icon: IconName;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex gap-3 border-t border-line py-4 first:border-t-0 first:pt-0">
      <Icon name={icon} className="mt-0.5 size-5 shrink-0 text-saffron-600" />
      <div className="min-w-0">
        <dt className="text-sm text-muted">{label}</dt>
        <dd className="mt-0.5 font-medium text-strong">{children}</dd>
      </div>
    </div>
  );
}
