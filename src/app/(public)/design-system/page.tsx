import type { Metadata } from "next";
import type { ReactNode } from "react";
import { NAV_ITEMS } from "@/lib/navigation";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, PhotoCard } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { EmptyState, ErrorState, LoadingState } from "@/components/ui/States";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/layout/PageHero";

export const metadata: Metadata = {
  title: "Design system",
  robots: { index: false, follow: false },
};

const SWATCHES = [
  ["Ink 900", "bg-ink-900"],
  ["Ink 700", "bg-ink-700"],
  ["Saffron 600", "bg-saffron-600"],
  ["Saffron 400", "bg-saffron-400"],
  ["Sand 200", "bg-sand-200"],
  ["Sand 50", "bg-sand-50"],
  ["Temple 700", "bg-temple-700"],
  ["Lotus 700", "bg-lotus-700"],
  ["River 700", "bg-river-700"],
];

const BREAKPOINTS = [
  ["sm", "640 px"],
  ["md", "768 px"],
  ["lg", "1024 px"],
  ["xl", "1280 px"],
  ["2xl", "1536 px"],
];

function Group({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-t border-line py-10">
      <h2 className="mb-6 text-sm font-semibold tracking-wider text-muted uppercase">{title}</h2>
      {children}
    </section>
  );
}

export default function DesignSystemPage() {
  return (
    <>
      <PageHero
        eyebrow="Phase 1"
        title="Design system"
        description="The shared tokens and components used across MyBhubaneswar.com."
      />
      <Container className="py-10">
        <Group title="Colors">
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {SWATCHES.map(([name, swatch]) => (
              <li key={name} className="text-sm font-semibold">
                <span className={`mb-2 block h-20 rounded-control border border-line ${swatch}`} />
                {name}
              </li>
            ))}
          </ul>
        </Group>

        <Group title="Typography">
          <div className="space-y-4">
            <p className="font-display text-display-lg">Display large</p>
            <p className="font-display text-display">Display</p>
            <p className="font-display text-title">Title</p>
            <p className="max-w-prose text-lg leading-relaxed text-muted">
              Body text uses Figtree, with Fraunces for display headings.
            </p>
          </div>
        </Group>

        <Group title="Buttons">
          <div className="flex flex-wrap items-center gap-3">
            <Button icon="arrowRight">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button size="lg">Large</Button>
            <Button disabled>Disabled</Button>
            <span className="rounded-control bg-ink-900 p-3">
              <Button variant="light">On dark</Button>
            </span>
          </div>
        </Group>

        <Group title="Inputs">
          <div className="grid max-w-3xl gap-5 md:grid-cols-2">
            <Input label="Name" placeholder="Your name" hint="As you'd like it to appear." />
            <Input label="Email" type="email" defaultValue="name" error="Enter a valid email." />
            <Input label="Unavailable field" disabled defaultValue="Disabled" />
          </div>
        </Group>

        <Group title="Badges">
          <div className="flex flex-wrap gap-2">
            <Badge>Neutral</Badge>
            <Badge tone="saffron">Saffron</Badge>
            <Badge tone="temple">Temple</Badge>
            <Badge tone="lotus">Lotus</Badge>
            <Badge tone="river">River</Badge>
          </div>
        </Group>

        <Group title="Section header">
          <SectionHeader
            eyebrow="Eyebrow"
            title="Section title"
            description="A short description that supports the title."
            action={<Button variant="secondary">Action</Button>}
          />
        </Group>

        <Group title="Cards">
          <div className="grid gap-5 md:grid-cols-2">
            <Card>
              <h3 className="text-lg font-semibold">Content card</h3>
              <p className="mt-2 text-muted">For text and mixed content.</p>
            </Card>
            <PhotoCard
              href={NAV_ITEMS[0].href}
              photo={NAV_ITEMS[0].photo}
              title="Photo card"
              description="For links led by a photograph."
              badge={<Badge tone="glass">Badge</Badge>}
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </div>
        </Group>

        <Group title="Page states">
          <div className="space-y-6">
            <LoadingState />
            <div className="grid gap-5 md:grid-cols-2">
              <Card>
                <EmptyState title="Nothing here yet" description="Results will appear here." />
              </Card>
              <Card>
                <ErrorState
                  title="Something went wrong"
                  description="This content couldn't be loaded."
                  action={<Button variant="secondary">Try again</Button>}
                />
              </Card>
            </div>
          </div>
        </Group>

        <Group title="Breakpoints">
          <ul className="flex flex-wrap gap-2">
            {BREAKPOINTS.map(([name, width]) => (
              <li key={name}>
                <Badge>
                  {name}: {width}
                </Badge>
              </li>
            ))}
          </ul>
        </Group>
      </Container>
    </>
  );
}
