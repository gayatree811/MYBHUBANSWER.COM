import { notFound } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { ADMIN_RESOURCES } from "@/features/admin/fields";
import { getFormFields } from "@/features/admin/getFormFields";
import { ResourceForm } from "@/features/admin/ResourceForm";
import { ApiError } from "@/server/api";
import { getCurrentUser } from "@/server/auth";
import { getRecord, getResource } from "@/server/repository";

type PageProps = { params: Promise<{ resource: string; id: string }> };

export default async function EditResourcePage({ params }: PageProps) {
  const { resource, id } = await params;
  const config = Object.hasOwn(ADMIN_RESOURCES, resource) ? ADMIN_RESOURCES[resource] : undefined;
  const user = await getCurrentUser();
  if (!config || (config.adminOnly && user?.role !== "admin")) notFound();

  const record = await getRecord(getResource(resource), id).catch((error: unknown) => {
    if (error instanceof ApiError && error.status === 404) notFound();
    throw error;
  });
  const { createdAt, updatedAt, ...editable } = record;
  void createdAt;

  return (
    <>
      <h1 className="font-display text-display">Edit {config.singular}</h1>
      <p className="mt-2 mb-6 text-sm text-muted">
        Last updated {new Date(updatedAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
      </p>
      <Card>
        <ResourceForm
          resource={resource}
          singular={config.singular}
          fields={await getFormFields(config.fields)}
          record={editable}
          canDelete={user?.role === "admin"}
        />
      </Card>
    </>
  );
}
