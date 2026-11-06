import { describe, expect, it } from "vitest";
import { sortArticles, type NewsArticle } from "@/features/news/articles";
import { ARTICLES as SEEDED } from "@/server/seed/news";

const ARTICLES: NewsArticle[] = SEEDED.map((article) => ({ ...article, status: "published" }));

describe("news", () => {
  it("every article has a date and a source", () => {
    for (const article of ARTICLES) {
      expect(article.publishedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(article.source.url).toMatch(/^https:\/\//);
    }
  });

  it("lists the newest first", () => {
    const dates = sortArticles(ARTICLES).map((article) => article.publishedAt);
    expect(dates).toEqual([...dates].sort().reverse());
  });

  it("filters by topic", () => {
    expect(
      sortArticles(ARTICLES, "transport").every((article) => article.topic === "transport"),
    ).toBe(true);
  });
});
