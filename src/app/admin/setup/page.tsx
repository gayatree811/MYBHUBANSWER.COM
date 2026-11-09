import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Logo } from "@/components/layout/Logo";
import { AuthForm } from "@/features/admin/AuthForm";
import { countUsers } from "@/server/auth";

export const metadata: Metadata = { title: "Create the first admin" };

export default async function SetupPage() {
  if ((await countUsers()) > 0) redirect("/admin/login");

  return (
    <main className="grid min-h-dvh place-items-center bg-sand-100 p-4">
      <Card className="w-full max-w-md">
        <Logo />
        <h1 className="mt-6 font-display text-title">Create the first admin</h1>
        <p className="mt-2 mb-5 text-muted">This page closes once the account exists.</p>
        <AuthForm setup />
      </Card>
    </main>
  );
}
