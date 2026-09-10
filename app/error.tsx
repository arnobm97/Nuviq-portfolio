"use client";

import { useEffect } from "react";
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container-px mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center text-center">
      <h1 className="font-display text-3xl font-semibold tracking-tight text-ink-100 sm:text-4xl light:text-ink-900">
        Something went wrong
      </h1>
      <p className="mt-4 max-w-md text-base leading-relaxed text-ink-300 light:text-ink-500">
        An unexpected error occurred while loading this page. You can try again, or head back
        to the homepage.
      </p>
      <div className="mt-8 flex gap-3">
        <Button onClick={reset} icon={<RotateCcw className="h-4 w-4" />}>
          Try again
        </Button>
        <Button href="/" variant="outline">
          Back to home
        </Button>
      </div>
    </div>
  );
}
