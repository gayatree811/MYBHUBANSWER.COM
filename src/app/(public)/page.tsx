import Image from "next/image";
import { NAV_ITEMS } from "@/lib/navigation";
import { PHOTOS } from "@/lib/photos";
import { cn } from "@/lib/cn";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, PhotoCard } from "@/components/ui/Card";
import { Icon, type IconName } from "@/components/ui/Icon";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Container, Section } from "@/components/layout/Container";
import { ListingCard } from "@/features/listings/ListingCard";
import { getListing } from "@/features/listings/queries";
import { SearchForm } from "@/features/search/SearchForm";

const PROMISES: { icon: IconName; title: string; description: string }[] = [
  {
    icon: "shield",
    title: "Verified first",
    description: "Information is checked before it's published.",
  },
  {
    icon: "link",
    title: "Sources shown",
    description: "You can see where information came from and when it was updated.",
  },
  {
    icon: "clock",
    title: "Honest about live data",
    description: "Scheduled information is never presented as live.",
  },
];

const FEATURED = ["lingaraja-temple", "udayagiri-khandagiri-caves", "dalma"];

/** The first card spans two columns to give the grid a clear focal point. */
const CARD_LAYOUT = ["lg:col-span-2 lg:min-h-96", "lg:min-h-96"];

export default function HomePage() {
  return (
    <>
      <div className="relative isolate flex min-h-svh items-end overflow-hidden bg-ink-950 pt-32 pb-14 text-white md:pb-20">
        <Image
          src={PHOTOS.rajarani.src}
          alt={PHOTOS.rajarani.alt}
          fill
          priority
          sizes="100vw"
          className="-z-20 animate-drift object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-linear-to-t from-ink-950 via-ink-950/65 to-ink-950/45" />
        <Container>
          <p className="mb-5 animate-enter text-sm font-semibold tracking-wider text-saffron-400 uppercase">
            The Temple City, Odisha
          </p>
          <h1 className="stagger-1 max-w-4xl animate-enter font-display text-display-lg">
            Everything Bhubaneswar, in one place.
          </h1>
          <p className="stagger-2 mt-6 max-w-xl animate-enter text-lg leading-relaxed text-white/85">
            A trusted guide to what you can know, do, discover and experience in the city.
          </p>
          <SearchForm className="stagger-3 mt-8 max-w-xl animate-enter" />
          <div className="stagger-3 mt-5 flex animate-enter flex-wrap gap-3">
            <Button href="/explore" size="lg" icon="arrowRight">
              Start exploring
            </Button>
            <Button href="#discover" size="lg" variant="light">
              See what&apos;s inside
            </Button>
          </div>
        </Container>
      </div>

      <Section id="discover" className="scroll-mt-16">
        <Container>
          <SectionHeader
            eyebrow="Discover"
            title="One city, many ways in"
            description="Start with what you need today, from a place to visit to a bus to catch."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {NAV_ITEMS.map(({ href, label, description, photo, ready }, index) => (
              <PhotoCard
                key={href}
                href={href}
                photo={photo}
                title={label}
                description={description}
                badge={ready ? undefined : <Badge tone="glass">Coming soon</Badge>}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className={cn("reveal", CARD_LAYOUT[index])}
              />
            ))}
          </div>
        </Container>
      </Section>

      <Section className="pt-0 md:pt-0">
        <Container>
          <SectionHeader eyebrow="Start here" title="Places to begin with" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURED.map((slug) => {
              const listing = getListing(slug);
              return listing && <ListingCard key={slug} listing={listing} />;
            })}
          </div>
        </Container>
      </Section>

      <Section className="bg-sand-100">
        <Container>
          <SectionHeader
            align="center"
            eyebrow="Our promise"
            title="Information you can trust"
            description="If we can't verify something, we'll tell you it's unavailable instead of guessing."
          />
          <div className="grid gap-5 md:grid-cols-3">
            {PROMISES.map(({ icon, title, description }) => (
              <Card
                key={title}
                className="reveal transition duration-300 ease-out-soft hover:-translate-y-1 hover:shadow-lift"
              >
                <span className="mb-5 grid size-12 place-items-center rounded-control bg-saffron-100 text-saffron-700">
                  <Icon name={icon} className="size-6" />
                </span>
                <h3 className="text-lg font-semibold text-strong">{title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
