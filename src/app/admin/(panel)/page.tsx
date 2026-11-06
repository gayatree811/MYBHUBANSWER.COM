import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { ADMIN_RESOURCES } from "@/features/admin/fields";
import { SeedButton } from "@/features/admin/SeedButton";
import { getCurrentUser } from "@/server/auth";
import { getDb } from "@/server/db";
import { getResource } from "@/server/repository";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  const db = await getDb();
  const resources = Object.entries(ADMIN_RESOURCES).filter(
    ([, resource]) => !resource.adminOnly || user?.role === "admin",
  );
  const counts = await Promise.all(
    resources.map(([name]) => db.collection(getResource(name).collection).countDocuments()),
  );

  return (
    <>
      <h1 className="font-display text-display">Dashboard</h1>
      <p className="mt-2 mb-8 text-muted">Manage everything published on MyBhubaneswar.com.</p>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {resources.map(([name, { label }], index) => (
          <Link key={name} href={`/admin/${name}`} className="group">
            <Card className="transition duration-300 ease-out-soft group-hover:-translate-y-1 group-hover:shadow-lift">
              <p className="font-display text-title">{counts[index]}</p>
              <p className="mt-1 text-muted">{label}</p>
            </Card>
          </Link>
        ))}
      </div>
      {user?.role === "admin" && (
        <div className="mt-8">
          <SeedButton />
        </div>
      )}
    </>
  );
}
