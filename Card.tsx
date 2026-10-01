import { cn } from "@/lib/cn";
import type { HTMLAttributes } from "react";
export const Card = ({ className, ...p }: HTMLAttributes<HTMLElement>) => (
  <article className={cn("rounded-control border border-line bg-surface p-5", className)} {...p} />
);
