import type { ReactNode } from "react";

export function FiltersBar({ children }: { children: ReactNode }) {
  return (
    <div className="sticky top-16 z-[5] -mx-4 mb-6 flex flex-wrap items-center gap-3 border-b bg-background/85 px-4 py-3 backdrop-blur md:-mx-6 md:px-6">
      <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Filters</span>
      {children}
    </div>
  );
}
