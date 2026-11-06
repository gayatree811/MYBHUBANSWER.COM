import type { Photo } from "@/lib/photos";

export type NewsArticle = {
  slug: string;
  status: "draft" | "published";
  title: string;
  topic: string;
  /** Our own short summary. The full report stays with its publisher. */
  summary: string;
  publishedAt: string;
  source: { name: string; url: string };
  photo?: Photo;
  /** Added when loaded, from the Category collection. */
  topicLabel?: string;
};

/** Newest first, so editors can add articles in any order. */
export function sortArticles(articles: NewsArticle[], topic?: string): NewsArticle[] {
  return articles
    .filter((article) => !topic || article.topic === topic)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}
