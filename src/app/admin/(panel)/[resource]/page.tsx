import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/States";
import { ADMIN_RESOURCES } from "@/features/admin/fields";
import { getParam, type SearchParams } from "@/features/listings/queries";
import { SearchForm } from "@/features/search/SearchForm";
import { getCurrentUser } from "@/server/auth";
import { getResource, listRecords } from "@/server/repository";

const PAGE_SIZE = 25;

type PageProps = {
  params: Promise<{ resource: string }>;
  searchParams: Promise<SearchParams>;
};

export default async function ResourceListPage({ params, searchParams }: PageProps) {
  const { resource: name } = await params;
  const config = Object.hasOwn(ADMIN_RESOURCES, name) ? ADMIN_RESOURCES[name] : undefined;
  const user = await getCurrentUser();
  if (!config || (config.adminOnly && user?.role !== "admin")) notFound();

  const query = await searchParams;
  const search = getParam(query, "q")?.trim() ?? "";
  const page = Math.max(1, Number(getParam(query, "page")) || 1);
  const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const filter = search ? { [config.titleField]: { $regex: escaped, $options: "i" } } : {};

  const { records, meta } = await listRecords(getResource(name), filter, {
    page,
    limit: PAGE_SIZE,
  });
  const pageHref = (target: number) =>
    `/admin/${name}?${new URLSearchParams({ page: String(target), q: search })}`;

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-display">{config.label}</h1>
        <Button href={`/admin/${name}/new`} icon="arrowRight">
          New {config.singular}
        </Button>
      </div>
      <SearchForm
        key={search}
        query={search}
        action={`/admin/${name}`}
        label={`Search ${config.label.toLowerCase()}`}
        placeholder={`Search ${config.label.toLowerCase()}`}
        className="mb-6 max-w-xl"
      />
      {records.length === 0 ? (
        <EmptyState title="Nothing found" description="Try another search, or add a new record." />
      ) : (
        <ul className="divide-y divide-line rounded-card border border-line bg-surface">
          {records.map((record) => (
            <li key={record.id}>
              <Link
                href={`/admin/${name}/${record.id}`}
                className="flex items-center justify-between gap-4 p-4 transition-colors hover:bg-sand-100"
              >
                <span className="min-w-0">
                  <span className="block truncate font-semibold text-strong">
                    {record[config.titleField]}
                  </span>
                  <span className="block truncate text-sm text-muted">
                    {record[config.subtitleField]}
                  </span>
                </span>
                {record.status && (
                  <Badge tone={record.status === "published" ? "temple" : "saffron"}>
                    {record.status}
                  </Badge>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-6 flex items-center justify-between gap-4">
        <p className="text-sm text-muted">
          {meta.total} {meta.total === 1 ? "record" : "records"}, page {meta.page} of{" "}
          {Math.max(1, meta.totalPages)}
        </p>
        <div className="flex gap-2">
          {page > 1 && (
            <Button href={pageHref(page - 1)} variant="secondary">
              Previous
            </Button>
          )}
          {page < meta.totalPages && (
            <Button href={pageHref(page + 1)} variant="secondary">
              Next
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
