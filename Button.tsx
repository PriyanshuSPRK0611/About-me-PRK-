import { cn } from "@/lib/cn";
import type { ButtonHTMLAttributes } from "react";
type Props = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" };
export function Button({ variant = "primary", className, ...p }: Props) {
  return (
    <button
      className={cn(
        "inline-flex min-h-11 items-center justify-center rounded-control px-5 font-medium transition-colors disabled:opacity-50",
        variant === "primary" ? "bg-contour text-contour-ink hover:opacity-90" : "border border-line hover:bg-surface",
        className,
      )}
      {...p}
    />
  );
}
