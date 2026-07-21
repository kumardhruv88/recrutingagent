"use client";

import { useEffect } from "react";
import { logger } from "@/lib/logger";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    logger.error("Global Error Boundary caught error", error);
  }, [error]);

  return (
    <div className="flex h-screen flex-col items-center justify-center text-center p-4">
      <h2 className="text-2xl font-bold">Something went wrong!</h2>
      <p className="text-muted-foreground mt-2 max-w-md">
        An unexpected error occurred. Our team has been notified.
      </p>
      <button
        onClick={() => reset()}
        className="mt-6 rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
      >
        Try again
      </button>
    </div>
  );
}
