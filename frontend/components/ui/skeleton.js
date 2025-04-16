import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-moted", className)}
      {...props}
    />
  );
}

export { Skeleton };
