"use client";

import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export function Surface({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cn(
        "rounded-2xl border border-[var(--border)] bg-[var(--card)] text-[var(--card-foreground)]",
        "shadow-[var(--shadow)]",
        className,
      )}
    />
  );
}

