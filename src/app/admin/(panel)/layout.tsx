import Link from "next/link";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { Logo } from "@/components/layout/Logo";
import { ADMIN_RESOURCES } from "@/features/admin/fields";
import { SignOutButton } from "@/features/admin/SignOutButton";
import { getCurrentUser } from "@/server/auth";

const linkClass =
  "shrink-0 rounded-control px-3 py-2 text-sm font-semibold text-ink-300 transition-colors hover:bg-white/10 hover:text-white";

export default async function PanelLayout({ children }: { children: ReactNode }) {
  const user = await getCurrentUser();
  if (!user) redirect("/admin/login");

  const resources = Object.entries(ADMIN_RESOURCES).filter(
    ([, resource]) => !resource.adminOnly || user.role === "admin",
  );

  return (
    <div className="min-h-dvh bg-sand-50 lg:grid lg:grid-cols-[17rem_1fr]">
      <aside className="bg-ink-950 p-4 text-white lg:sticky lg:top-0 lg:flex lg:h-dvh lg:flex-col lg:p-6">
        <Logo tone="light" />
        <nav aria-label="Admin" className="mt-4 flex gap-1 overflow-x-auto lg:mt-8 lg:flex-col">
          <Link href="/admin" className={linkClass}>
            Dashboard
          </Link>
          {resources.map(([name, { label }]) => (
            <Link key={name} href={`/admin/${name}`} className={linkClass}>
              {label}
            </Link>
          ))}
        </nav>
        <div className="mt-4 flex items-center justify-between gap-3 lg:mt-auto lg:block">
          <p className="min-w-0 truncate text-sm text-ink-300 lg:mb-3">
            {user.name} ({user.role})
          </p>
          <SignOutButton />
        </div>
      </aside>
      <main className="min-w-0 p-4 sm:p-6 lg:p-10">{children}</main>
    </div>
  );
}
