import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/dates";
import { Button } from "@/components/ui/Button";
import { Notice } from "@/components/ui/Notice";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Container, Section } from "@/components/layout/Container";
import { PageHero } from "@/components/layout/PageHero";
import { ARTICLES, getArticle, getArticles, NEWS_TOPICS } from "@/features/news/articles";
import { NewsGrid } from "@/features/news/NewsGrid";

export const dynamicParams = false;

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return ARTICLES.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const article = getArticle((await params).slug);
  return article ? { title: article.title, description: article.summary } : {};
}

export default async function ArticlePage({ params }: PageProps) {
  const article = getArticle((await params).slug);
  if (!article) notFound();

  const related = getArticles(article.topic)
    .filter(({ slug }) => slug !== article.slug)
    .slice(0, 3);

  return (
    <>
      <PageHero eyebrow={NEWS_TOPICS[article.topic]} title={article.title} photo={article.photo} />
      <Section className="py-12 md:py-16">
        <Container narrow>
          <p className="text-sm font-semibold text-muted">
            Published {formatDate(article.publishedAt)} by {article.source.name}
          </p>
          <p className="mt-5 text-xl leading-relaxed text-ink-700">{article.summary}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={article.source.url} target="_blank" rel="noreferrer" icon="external">
              Read at {article.source.name}
            </Button>
            <Button href="/news" variant="secondary">
              All news
            </Button>
          </div>
          <div className="mt-10">
            <Notice title="About this page" icon="shield">
              This is our short summary of a published report. The situation may have changed since
              the publication date.
              {article.photo && ` Illustrative photo by ${article.photo.author}.`}
            </Notice>
          </div>
        </Container>
      </Section>
      {related.length > 0 && (
        <Section className="bg-sand-100">
          <Container>
            <SectionHeader eyebrow="Keep reading" title="More on this topic" />
            <NewsGrid articles={related} />
          </Container>
        </Section>
      )}
    </>
  );
}
