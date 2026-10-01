import { cn } from "@/lib/cn";
export const Skeleton = ({ className }: { className?: string }) => (
  <div aria-hidden className={cn("h-4 rounded-control bg-[linear-gradient(90deg,var(--line),var(--surface),var(--line))] bg-[length:200%_100%] animate-[shimmer_1.6s_linear_infinite]", className)} />
);
