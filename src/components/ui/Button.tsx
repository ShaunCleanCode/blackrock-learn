"use client";

import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md";

export function Button({
  className,
  variant = "secondary",
  size = "md",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
}) {
  return (
    <button
      {...props}
      className={cn(
        "inline-flex items-center justify-center rounded-xl font-medium transition-colors",
        "focus:outline-none focus:ring-4 focus:ring-[var(--ring)] disabled:opacity-40 disabled:pointer-events-none",
        size === "sm" ? "h-9 px-3 text-xs" : "h-11 px-4 text-sm",
        variant === "primary" &&
          "bg-[var(--br-black)] text-[var(--br-yellow)] hover:bg-black",
        variant === "secondary" &&
          "border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] hover:bg-[var(--muted)]",
        variant === "ghost" &&
          "bg-transparent text-[var(--foreground)] hover:bg-[var(--muted)]",
        className,
      )}
    />
  );
}

