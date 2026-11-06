import { describe, expect, it } from "vitest";
import { ARTICLES, getArticles } from "@/features/news/articles";

describe("news", () => {
  it("every article has a date and a source", () => {
    for (const article of ARTICLES) {
      expect(article.publishedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(article.source.url).toMatch(/^https:\/\//);
    }
  });

  it("lists the newest first", () => {
    const dates = getArticles().map((article) => article.publishedAt);
    expect(dates).toEqual([...dates].sort().reverse());
  });

  it("filters by topic", () => {
    expect(getArticles("transport").every((article) => article.topic === "transport")).toBe(true);
  });
});
