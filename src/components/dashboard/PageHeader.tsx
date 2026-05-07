import { Link } from "@tanstack/react-router";
import { ChevronRight, Home } from "lucide-react";

export type Crumb = { label: string; to?: string };

export function PageHeader({ title, description, crumbs }: { title: string; description?: string; crumbs: Crumb[] }) {
  return (
    <div className="mb-6 flex flex-col gap-2">
      <nav className="flex items-center gap-1 text-xs text-muted-foreground">
        <Link to="/" className="flex items-center gap-1 hover:text-foreground">
          <Home className="h-3 w-3" />
        </Link>
        {crumbs.map((c, i) => (
          <span key={i} className="flex items-center gap-1">
            <ChevronRight className="h-3 w-3" />
            {c.to ? (
              <Link to={c.to} className="hover:text-foreground">
                {c.label}
              </Link>
            ) : (
              <span className="text-foreground">{c.label}</span>
            )}
          </span>
        ))}
      </nav>
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
      </div>
    </div>
  );
}
