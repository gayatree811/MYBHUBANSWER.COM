import { notFound } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { ADMIN_RESOURCES } from "@/features/admin/fields";
import { getFormFields } from "@/features/admin/getFormFields";
import { ResourceForm } from "@/features/admin/ResourceForm";
import { getCurrentUser } from "@/server/auth";

type PageProps = { params: Promise<{ resource: string }> };

export default async function NewResourcePage({ params }: PageProps) {
  const { resource } = await params;
  const config = Object.hasOwn(ADMIN_RESOURCES, resource) ? ADMIN_RESOURCES[resource] : undefined;
  const user = await getCurrentUser();
  if (!config || (config.adminOnly && user?.role !== "admin")) notFound();

  return (
    <>
      <h1 className="mb-6 font-display text-display">New {config.singular}</h1>
      <Card>
        <ResourceForm
          resource={resource}
          singular={config.singular}
          fields={await getFormFields(config.fields)}
          canDelete={false}
        />
      </Card>
    </>
  );
}
