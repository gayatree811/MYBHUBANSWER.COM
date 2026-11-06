import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FOOD_PLACES } from "@/features/listings/food";
import { ListingDetail } from "@/features/listings/ListingDetail";

export const dynamicParams = false;

type PageProps = { params: Promise<{ slug: string }> };

const find = (slug: string) => FOOD_PLACES.find((listing) => listing.slug === slug);

export function generateStaticParams() {
  return FOOD_PLACES.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const listing = find((await params).slug);
  return listing ? { title: listing.name, description: listing.summary } : {};
}

export default async function ListingPage({ params }: PageProps) {
  const listing = find((await params).slug);
  if (!listing) notFound();

  return <ListingDetail listing={listing} />;
}
