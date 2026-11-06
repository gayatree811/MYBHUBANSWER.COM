import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";
import type { Photo } from "@/lib/photos";
import { Icon } from "@/components/ui/Icon";
import { SafeImage } from "@/components/ui/SafeImage";
import { TempleMark } from "@/components/layout/Logo";

export function Card({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("rounded-card border border-line bg-surface p-6 shadow-soft", className)}
      {...props}
    />
  );
}

type PhotoCardProps = {
  href: string;
  photo?: Photo;
  title: string;
  description?: string;
  badge?: ReactNode;
  sizes: string;
  titleSize?: "large" | "small";
  priority?: boolean;
  className?: string;
};

/** A full-bleed photo link. Without a photo, it falls back to a branded panel. */
export function PhotoCard({
  href,
  photo,
  title,
  description,
  badge,
  sizes,
  titleSize = "large",
  priority,
  className,
}: PhotoCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative isolate flex min-h-72 flex-col justify-end overflow-hidden rounded-card bg-ink-800 p-6 text-white shadow-soft",
        "transition duration-500 ease-out-soft hover:-translate-y-1.5 hover:shadow-lift",
        className,
      )}
    >
      <TempleMark className="absolute -top-6 -right-6 -z-30 size-52 text-white/10" />
      {photo && (
        <SafeImage
          src={photo.src}
          alt=""
          fill
          sizes={sizes}
          priority={priority}
          className="-z-20 object-cover transition-transform duration-700 ease-out-soft group-hover:scale-105"
        />
      )}
      <span className="absolute inset-0 -z-10 bg-linear-to-t from-ink-950/90 via-ink-950/35 to-ink-950/5" />
      {badge && <span className="absolute top-5 left-5">{badge}</span>}
      <span className="flex items-end justify-between gap-4">
        <span>
          <span
            className={cn(
              "block font-display",
              titleSize === "large" ? "text-title" : "text-xl leading-snug",
            )}
          >
            {title}
          </span>
          {description && (
            <span className="mt-1.5 block max-w-sm text-sm leading-relaxed text-white/85">
              {description}
            </span>
          )}
        </span>
        <span className="grid size-11 shrink-0 place-items-center rounded-full bg-white/15 backdrop-blur-md transition duration-300 group-hover:bg-brand">
          <Icon
            name="arrowRight"
            className="size-5 transition-transform duration-300 group-hover:translate-x-0.5"
          />
        </span>
      </span>
    </Link>
  );
}
