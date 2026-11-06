import Form from "next/form";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";

type SearchFormProps = {
  query?: string;
  className?: string;
  action?: string;
  label?: string;
  placeholder?: string;
};

/** Sends the search through the URL, so results can be shared and revisited. */
export function SearchForm({
  query,
  className,
  action = "/search",
  label = "Search places, food, events and news",
  placeholder = "Search the city",
}: SearchFormProps) {
  return (
    <Form action={action} role="search" className={cn("relative", className)}>
      <label htmlFor="site-search" className="sr-only">
        {label}
      </label>
      <Icon
        name="search"
        className="pointer-events-none absolute top-1/2 left-5 size-5 -translate-y-1/2 text-ink-500"
      />
      <input
        id="site-search"
        name="q"
        type="search"
        defaultValue={query}
        placeholder={placeholder}
        className="h-14 w-full rounded-full bg-surface pr-28 pl-13 text-base text-strong shadow-lift placeholder:text-ink-500"
      />
      <button
        type="submit"
        className="absolute top-1.5 right-1.5 h-11 rounded-full bg-brand px-5 text-sm font-semibold text-white transition duration-200 hover:bg-saffron-700"
      >
        Search
      </button>
    </Form>
  );
}
