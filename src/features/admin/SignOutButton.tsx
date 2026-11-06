"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { sendJson } from "@/features/admin/client";

export function SignOutButton() {
  const router = useRouter();

  async function signOut() {
    await sendJson("/api/v1/auth/logout", "POST");
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <Button variant="light" onClick={signOut}>
      Sign out
    </Button>
  );
}
