import Image from "next/image";
import type { ReactNode } from "react";
import type { Photo } from "@/lib/photos";
import { Container } from "@/components/layout/Container";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  photo?: Photo;
  children?: ReactNode;
};

/** The dark opening band shared by every inner page. */
export function PageHero({ eyebrow, title, description, photo, children }: PageHeroProps) {
  return (
    <div className="relative isolate overflow-hidden bg-ink-900 pt-36 pb-16 text-white md:pt-44 md:pb-24">
      {photo && (
        <>
          <Image
            src={photo.src}
            alt=""
            fill
            priority
            sizes="100vw"
            className="-z-20 animate-drift object-cover"
          />
          <span className="absolute inset-0 -z-10 bg-linear-to-t from-ink-950/90 via-ink-950/60 to-ink-950/55" />
        </>
      )}
      <Container>
        {eyebrow && (
          <p className="mb-3 animate-enter text-sm font-semibold tracking-wider text-saffron-400 uppercase">
            {eyebrow}
          </p>
        )}
        <h1 className="stagger-1 max-w-3xl animate-enter font-display text-display">{title}</h1>
        {description && (
          <p className="stagger-2 mt-4 max-w-2xl animate-enter text-lg leading-relaxed text-white/85">
            {description}
          </p>
        )}
        {children}
      </Container>
    </div>
  );
}
