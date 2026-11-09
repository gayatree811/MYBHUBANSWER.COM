"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { sendJson } from "@/features/admin/client";

/** Signs in, or creates the first admin when `setup` is true. */
export function AuthForm({ setup = false }: { setup?: boolean }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");

    const body = Object.fromEntries(new FormData(event.currentTarget));
    const result = await sendJson(`/api/v1/auth/${setup ? "setup" : "login"}`, "POST", body);

    if (result.success) {
      router.replace("/admin");
      router.refresh();
    } else {
      setError(result.message);
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      {setup && <Input label="Name" name="name" required autoComplete="name" />}
      <Input label="Email" name="email" type="email" required autoComplete="email" />
      <Input
        label="Password"
        name="password"
        type="password"
        required
        minLength={setup ? 12 : undefined}
        hint={setup ? "Use at least 12 characters." : undefined}
        autoComplete={setup ? "new-password" : "current-password"}
      />
      {error && (
        <p role="alert" className="text-sm font-semibold text-danger">
          {error}
        </p>
      )}
      <Button type="submit" disabled={busy} className="w-full">
        {setup ? "Create admin account" : "Sign in"}
      </Button>
    </form>
  );
}
