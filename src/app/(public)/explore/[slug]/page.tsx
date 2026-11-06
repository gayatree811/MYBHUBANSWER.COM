import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PLACES } from "@/features/listings/places";
import { ListingDetail } from "@/features/listings/ListingDetail";

export const dynamicParams = false;

type PageProps = { params: Promise<{ slug: string }> };

const find = (slug: string) => PLACES.find((listing) => listing.slug === slug);

export function generateStaticParams() {
  return PLACES.map(({ slug }) => ({ slug }));
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
