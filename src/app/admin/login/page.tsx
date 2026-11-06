import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Logo } from "@/components/layout/Logo";
import { AuthForm } from "@/features/admin/AuthForm";
import { countUsers, getCurrentUser } from "@/server/auth";

export const metadata: Metadata = { title: "Sign in" };

export default async function LoginPage() {
  if ((await countUsers()) === 0) redirect("/admin/setup");
  if (await getCurrentUser()) redirect("/admin");

  return (
    <main className="grid min-h-dvh place-items-center bg-sand-100 p-4">
      <Card className="w-full max-w-md">
        <Logo />
        <h1 className="mt-6 mb-5 font-display text-title">Sign in</h1>
        <AuthForm />
      </Card>
    </main>
  );
}
