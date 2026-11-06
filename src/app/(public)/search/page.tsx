import type { Metadata } from "next";
import { Badge } from "@/components/ui/Badge";
import { PhotoCard } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { EmptyState } from "@/components/ui/States";
import { Container, Section } from "@/components/layout/Container";
import { PageHero } from "@/components/layout/PageHero";
import { getParam, type SearchParams } from "@/features/listings/queries";
import { SearchForm } from "@/features/search/SearchForm";
import { searchSite } from "@/features/search/searchSite";

export const metadata: Metadata = {
  title: "Search",
  robots: { index: false, follow: true },
};

const SUGGESTIONS = ["Temple", "Caves", "Odia", "Cafe", "Marathon", "Budget", "Airport"];

function Suggestions() {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {SUGGESTIONS.map((term) => (
        <Chip key={term} active={false} href={`/search?q=${term}`}>
          {term}
        </Chip>
      ))}
    </div>
  );
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const query = getParam(await searchParams, "q")?.trim() ?? "";
  const results = searchSite(query, new Date());

  return (
    <>
      <PageHero eyebrow="Search" title="Find your way around">
        <SearchForm key={query} query={query} className="stagger-2 mt-8 max-w-2xl animate-enter" />
      </PageHero>
      <Section className="py-10 md:py-14">
        <Container>
          {!query && (
            <EmptyState
              icon="search"
              title="What are you looking for?"
              description="Search places, food, events, news and bus routes, or try one of these."
              action={<Suggestions />}
            />
          )}
          {query && results.length === 0 && (
            <EmptyState
              icon="search"
              title={`No results for “${query}”`}
              description="Check the spelling, or try a broader word."
              action={<Suggestions />}
            />
          )}
          {results.length > 0 && (
            <>
              <p aria-live="polite" className="mb-5 text-sm text-muted">
                {results.length} {results.length === 1 ? "result" : "results"} for “{query}”
              </p>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {results.map(({ href, title, description, badge, photo }) => (
                  <PhotoCard
                    key={href}
                    href={href}
                    photo={photo}
                    title={title}
                    titleSize="small"
                    description={description}
                    badge={<Badge tone="glass">{badge}</Badge>}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="reveal"
                  />
                ))}
              </div>
            </>
          )}
        </Container>
      </Section>
    </>
  );
}
