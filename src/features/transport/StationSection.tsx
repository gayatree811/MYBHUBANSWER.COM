import { Card } from "@/components/ui/Card";
import { Fact } from "@/components/ui/Fact";
import type { IconName } from "@/components/ui/Icon";
import { MapPreview } from "@/features/map/MapPreview";
import type { MapListing } from "@/features/map/mapListing";

type StationSectionProps = {
  title: string;
  hub: MapListing;
  facts: { icon: IconName; label: string; value: string }[];
};

/** Shows one station or airport as key facts beside its map location. */
export function StationSection({ title, hub, facts }: StationSectionProps) {
  return (
    <section className="grid gap-5 lg:grid-cols-2">
      <Card>
        <h2 className="mb-5 font-display text-title">{title}</h2>
        <dl>
          {facts.map(({ icon, label, value }) => (
            <Fact key={label} icon={icon} label={label}>
              {value}
            </Fact>
          ))}
        </dl>
      </Card>
      <MapPreview listing={hub} />
    </section>
  );
}
