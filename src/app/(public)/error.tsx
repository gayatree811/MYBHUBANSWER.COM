"use client";

import { Button } from "@/components/ui/Button";
import { ErrorState } from "@/components/ui/States";

export default function PublicError({ reset }: { error: Error; reset: () => void }) {
  return (
    <ErrorState
      className="pt-36"
      headingLevel="h1"
      title="Something went wrong"
      description="This page couldn't be loaded. Please try again."
      action={<Button onClick={reset}>Try again</Button>}
    />
  );
}
