import { Chip } from "@/components/ui/Chip";
import { buildFilterHref, getParam, type SearchParams } from "@/features/listings/queries";

type FilterGroupProps = {
  label: string;
  name: string;
  path: string;
  params: SearchParams;
  options: { value: string; label: string }[];
};

/** Filters are links, so they work without JavaScript and can be shared. */
export function FilterGroup({ label, name, path, params, options }: FilterGroupProps) {
  const selected = getParam(params, name);

  return (
    <div role="group" aria-label={label} className="flex flex-wrap items-center gap-2">
      <span className="mr-1 w-full text-sm font-semibold text-muted sm:w-20">{label}</span>
      <Chip active={!selected} href={buildFilterHref(path, params, name)}>
        All
      </Chip>
      {options.map((option) => (
        <Chip
          key={option.value}
          active={selected === option.value}
          href={buildFilterHref(path, params, name, option.value)}
        >
          {option.label}
        </Chip>
      ))}
    </div>
  );
}
