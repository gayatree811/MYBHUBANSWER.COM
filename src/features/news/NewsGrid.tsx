import { Badge } from "@/components/ui/Badge";
import { PhotoCard } from "@/components/ui/Card";
import { formatShortDate } from "@/lib/dates";
import type { NewsArticle } from "@/features/news/articles";

export function NewsGrid({ articles }: { articles: NewsArticle[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((article, index) => (
        <PhotoCard
          key={article.slug}
          href={`/news/${article.slug}`}
          priority={index === 0}
          photo={article.photo}
          title={article.title}
          titleSize="small"
          description={`${formatShortDate(article.publishedAt)} · ${article.source.name}`}
          badge={<Badge tone="glass">{article.topicLabel ?? article.topic}</Badge>}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="reveal"
        />
      ))}
    </div>
  );
}
