import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

/** Sets the shared page width and side gutters. */
export function Container({
  narrow,
  className,
  ...props
}: ComponentProps<"div"> & { narrow?: boolean }) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        narrow ? "max-w-3xl" : "max-w-7xl",
        className,
      )}
      {...props}
    />
  );
}

/** Sets the shared vertical rhythm between page sections. */
export function Section({ className, ...props }: ComponentProps<"section">) {
  return <section className={cn("py-16 md:py-24", className)} {...props} />;
}
