import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ListingDetail } from "@/features/listings/ListingDetail";
import { getRelated } from "@/features/listings/queries";
import { getContent } from "@/server/content";

type PageProps = { params: Promise<{ slug: string }> };

async function find(slug: string) {
  const { listings } = await getContent();
  return listings.find((listing) => listing.kind === "food" && listing.slug === slug);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const listing = await find((await params).slug);
  return listing ? { title: listing.name, description: listing.summary } : {};
}

export default async function ListingPage({ params }: PageProps) {
  const listing = await find((await params).slug);
  if (!listing) notFound();

  const { listings } = await getContent();
  return <ListingDetail listing={listing} related={getRelated(listing, listings)} />;
}
