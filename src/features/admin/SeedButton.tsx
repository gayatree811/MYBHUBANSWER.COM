"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { sendJson } from "@/features/admin/client";

export function SeedButton() {
  const router = useRouter();
  const [message, setMessage] = useState("");

  async function seed() {
    const result = await sendJson("/api/v1/admin/seed", "POST");
    setMessage(result.success ? "Done. Existing records weren't changed." : result.message);
    router.refresh();
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="secondary" onClick={seed}>
        Import starter content
      </Button>
      {message && (
        <p role="status" className="text-sm text-muted">
          {message}
        </p>
      )}
    </div>
  );
}
