import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Icon, type IconName } from "@/components/ui/Icon";

type StateProps = {
  title: string;
  description: string;
  action?: ReactNode;
  className?: string;
  headingLevel?: "h1" | "h2";
};

function StateMessage({
  icon,
  iconClass,
  title,
  description,
  action,
  className,
  role,
  headingLevel: Heading = "h2",
}: StateProps & { icon: IconName; iconClass: string; role?: "alert" }) {
  return (
    <div
      role={role}
      className={cn(
        "mx-auto flex max-w-lg flex-col items-center px-6 py-14 text-center",
        className,
      )}
    >
      <span className={cn("mb-5 grid size-16 place-items-center rounded-full", iconClass)}>
        <Icon name={icon} className="size-7" />
      </span>
      <Heading className="font-display text-title text-strong">{title}</Heading>
      <p className="mt-3 leading-relaxed text-muted">{description}</p>
      {action && <div className="mt-7">{action}</div>}
    </div>
  );
}

export function EmptyState({ icon = "inbox", ...props }: StateProps & { icon?: IconName }) {
  return <StateMessage icon={icon} iconClass="bg-sand-100 text-ink-700" {...props} />;
}

export function ErrorState(props: StateProps) {
  return <StateMessage icon="alert" iconClass="bg-lotus-100 text-danger" role="alert" {...props} />;
}

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-shimmer rounded-control bg-linear-to-r from-sand-100 via-sand-200 to-sand-100 bg-size-[200%_100%]",
        className,
      )}
    />
  );
}

/** A loading placeholder shaped like a grid of cards. */
export function LoadingState({ cards = 3 }: { cards?: number }) {
  return (
    <div role="status" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <span className="sr-only">Loading</span>
      {Array.from({ length: cards }, (_, index) => (
        <div key={index} className="rounded-card border border-line bg-surface p-4">
          <Skeleton className="aspect-4/3 w-full" />
          <Skeleton className="mt-4 h-5 w-2/3" />
          <Skeleton className="mt-3 h-4 w-full" />
        </div>
      ))}
    </div>
  );
}
