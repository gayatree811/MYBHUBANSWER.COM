import type { Metadata } from "next";
import { PHOTOS } from "@/lib/photos";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/States";
import { Container, Section } from "@/components/layout/Container";
import { PageHero } from "@/components/layout/PageHero";
import { FilterGroup } from "@/features/listings/FilterGroup";
import { getParam, type SearchParams } from "@/features/listings/queries";
import { sortArticles } from "@/features/news/articles";
import { NewsGrid } from "@/features/news/NewsGrid";
import { getCategoryOptions, getContent } from "@/server/content";

export const metadata: Metadata = {
  title: "News and city updates",
  description: "Dated, sourced news and city updates from Bhubaneswar.",
};

export default async function NewsPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams;
  const [content, options] = await Promise.all([getContent(), getCategoryOptions("news")]);
  const articles = sortArticles(content.articles, getParam(params, "topic"));

  return (
    <>
      <PageHero
        eyebrow="News"
        title="City news and updates"
        description="Short summaries of reports from named publishers, each with its date and source."
        photo={PHOTOS.skyline}
      />
      <Section className="py-10 md:py-14">
        <Container>
          <FilterGroup label="Topic" name="topic" path="/news" params={params} options={options} />
          <p aria-live="polite" className="mt-6 mb-5 text-sm text-muted">
            {articles.length} {articles.length === 1 ? "story" : "stories"}, newest first. Photos
            are illustrative.
          </p>
          {articles.length > 0 ? (
            <NewsGrid articles={articles} />
          ) : (
            <EmptyState
              icon="newspaper"
              title="No stories found"
              description="Try another topic."
              action={
                <Button href="/news" variant="secondary">
                  Clear filter
                </Button>
              }
            />
          )}
        </Container>
      </Section>
    </>
  );
}
