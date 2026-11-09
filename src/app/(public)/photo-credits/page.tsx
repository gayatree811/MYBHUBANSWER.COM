import type { Metadata } from "next";
import Image from "next/image";
import { getCreditedPhotos } from "@/server/content";
import { Card } from "@/components/ui/Card";
import { Container, Section } from "@/components/layout/Container";
import { PageHero } from "@/components/layout/PageHero";

export const metadata: Metadata = { title: "Photo credits" };

const linkClass = "font-semibold text-brand underline-offset-4 hover:underline";

export default async function PhotoCreditsPage() {
  const photos = await getCreditedPhotos();

  return (
    <>
      <PageHero
        title="Photo credits"
        description="Photos are by the people credited here and used under their Creative Commons licenses. They may be cropped, resized or darkened for display."
      />
      <Section>
        <Container>
          <ul className="grid gap-5 md:grid-cols-2">
            {photos.map((photo) => (
              <li key={photo.sourceUrl}>
                <Card className="flex h-full gap-4 p-4">
                  <div className="relative size-24 shrink-0 overflow-hidden rounded-control bg-sand-100">
                    <Image src={photo.src} alt="" fill sizes="96px" className="object-cover" />
                  </div>
                  <div className="min-w-0 text-sm">
                    <h2 className="text-base font-semibold text-strong">{photo.title}</h2>
                    <p className="mt-1 text-muted">By {photo.author}</p>
                    <p className="mt-2 flex flex-wrap gap-x-4">
                      <a
                        href={photo.licenseUrl}
                        target="_blank"
                        rel="noreferrer"
                        className={linkClass}
                      >
                        {photo.license}
                      </a>
                      <a
                        href={photo.sourceUrl}
                        target="_blank"
                        rel="noreferrer"
                        className={linkClass}
                      >
                        Source
                      </a>
                    </p>
                  </div>
                </Card>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  );
}
