import type { Metadata } from "next";
import { PHOTOS } from "@/lib/photos";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/States";
import { Container, Section } from "@/components/layout/Container";
import { PageHero } from "@/components/layout/PageHero";
import { FilterGroup } from "@/features/listings/FilterGroup";
import { ListingGrid } from "@/features/listings/ListingCard";
import { filterFood, getCuisines, getParam, type SearchParams } from "@/features/listings/queries";
import { PRICE_BANDS, type FoodPlace } from "@/features/listings/types";
import { getCategoryOptions, getContent } from "@/server/content";

export const metadata: Metadata = {
  title: "Food and cafes",
  description: "Find Odia food, restaurants and cafes in Bhubaneswar.",
};

const PRICE_OPTIONS = Object.entries(PRICE_BANDS).map(([value, label]) => ({ value, label }));

export default async function FoodPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams;
  const [{ listings }, categoryOptions] = await Promise.all([
    getContent(),
    getCategoryOptions("food"),
  ]);
  const food = listings.filter((listing): listing is FoodPlace => listing.kind === "food");
  const cuisineOptions = getCuisines(food).map((cuisine) => ({ value: cuisine, label: cuisine }));
  const places = filterFood(food, {
    category: getParam(params, "category"),
    cuisine: getParam(params, "cuisine"),
    price: getParam(params, "price"),
  });

  return (
    <>
      <PageHero
        eyebrow="Food and cafes"
        title="Eat your way through the city"
        description="From Odia thalis to street-side dahibara. Hours are shown only when we can source them."
        photo={PHOTOS.odiaLunch}
      />
      <Section className="py-10 md:py-14">
        <Container>
          <div className="space-y-3">
            <FilterGroup
              label="Type"
              name="category"
              path="/food"
              params={params}
              options={categoryOptions}
            />
            <FilterGroup
              label="Cuisine"
              name="cuisine"
              path="/food"
              params={params}
              options={cuisineOptions}
            />
            <FilterGroup
              label="Price"
              name="price"
              path="/food"
              params={params}
              options={PRICE_OPTIONS}
            />
          </div>
          <p aria-live="polite" className="mt-6 mb-5 text-sm text-muted">
            {places.length} {places.length === 1 ? "listing" : "listings"}. Price ranges are for two
            people. Some photos show a typical dish.
          </p>
          {places.length > 0 ? (
            <ListingGrid listings={places} />
          ) : (
            <EmptyState
              icon="utensils"
              title="No matches"
              description="Try removing a filter."
              action={
                <Button href="/food" variant="secondary">
                  Clear filters
                </Button>
              }
            />
          )}
        </Container>
      </Section>
    </>
  );
}
