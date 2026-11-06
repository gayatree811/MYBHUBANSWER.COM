import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/States";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <main className="grid min-h-dvh place-items-center">
      <EmptyState
        icon="compass"
        headingLevel="h1"
        title="Page not found"
        description="This page doesn't exist or may have moved."
        action={
          <Button href="/" icon="arrowRight">
            Go to home
          </Button>
        }
      />
    </main>
  );
}
