import type { Metadata } from "next";
import Link from "next/link";
import { PHOTOS } from "@/lib/photos";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { Notice } from "@/components/ui/Notice";
import { EmptyState } from "@/components/ui/States";
import { Container, Section } from "@/components/layout/Container";
import { PageHero } from "@/components/layout/PageHero";
import { FilterGroup } from "@/features/listings/FilterGroup";
import { getParam, type SearchParams } from "@/features/listings/queries";
import { SearchForm } from "@/features/search/SearchForm";
import { BUS_HUBS, findBusRoutes } from "@/features/transport/queries";
import { getContent } from "@/server/content";

export const metadata: Metadata = {
  title: "Ama Bus routes",
  description: "Find Ama Bus routes in Bhubaneswar by number, place or stop.",
};

export default async function BusRoutesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const query = getParam(params, "q")?.trim() ?? "";
  const { busRoutes } = await getContent();
  const routes = findBusRoutes(busRoutes, query, getParam(params, "hub"));
  const directorySource = busRoutes[0]?.directorySource;

  return (
    <>
      <PageHero
        eyebrow="Ama Bus"
        title="Find a bus route"
        description="Ama Bus, formerly Mo Bus, is run by Capital Region Urban Transport."
        photo={PHOTOS.moBus}
      >
        <SearchForm
          key={query}
          query={query}
          action="/transport/bus"
          label="Search bus routes"
          placeholder="Route number, place or stop"
          className="stagger-2 mt-8 max-w-2xl animate-enter"
        />
      </PageHero>
      <Section className="py-10 md:py-14">
        <Container>
          <Notice title="Scheduled information, not live status">
            Routes can change. For live tracking, use the{" "}
            <a
              href="https://capitalregiontransport.in/transit-services/ama-bus"
              target="_blank"
              rel="noreferrer"
              className="font-semibold underline underline-offset-4"
            >
              official Ama app
            </a>
            .
          </Notice>
          <div className="mt-6">
            <FilterGroup
              label="From"
              name="hub"
              path="/transport/bus"
              params={params}
              options={BUS_HUBS}
            />
          </div>
          <p aria-live="polite" className="mt-6 mb-5 text-sm text-muted">
            {routes.length} {routes.length === 1 ? "route" : "routes"}.
            {directorySource && (
              <>
                {" "}
                Directory from{" "}
                <a
                  href={directorySource.url}
                  target="_blank"
                  rel="noreferrer"
                  className="underline underline-offset-4"
                >
                  {directorySource.name}
                </a>
                .
              </>
            )}
          </p>
          {routes.length > 0 ? (
            <ul className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {routes.map((route) => (
                <li key={route.slug}>
                  <Link href={`/transport/bus/${route.slug}`} className="group block h-full">
                    <Card className="flex h-full items-center gap-4 p-4 transition duration-300 ease-out-soft group-hover:-translate-y-0.5 group-hover:shadow-lift">
                      <span className="grid min-h-12 min-w-12 shrink-0 place-items-center rounded-control bg-ink-900 px-2 text-center text-sm font-bold text-white">
                        {route.number}
                      </span>
                      <span className="min-w-0 flex-1 text-sm font-medium text-strong">
                        {route.from} <span className="text-muted">to</span> {route.to}
                      </span>
                      <Icon
                        name="arrowRight"
                        className="size-4 shrink-0 text-saffron-700 transition-transform group-hover:translate-x-1"
                      />
                    </Card>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState
              icon="bus"
              title="No routes found"
              description="Try a route number, another place name or a different hub."
              action={
                <Button href="/transport/bus" variant="secondary">
                  Clear search
                </Button>
              }
            />
          )}
        </Container>
      </Section>
    </>
  );
}
