import { Building2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { companies, type CompanyId } from "@/data/company";

export const ALL_COMPANY: CompanyId = "all";
export const DEFAULT_COMPANY: CompanyId = "ibi1";

export function CompanyFilter({
  value,
  onChange,
  className,
}: {
  value: CompanyId;
  onChange: (v: CompanyId) => void;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-2 ${className ?? ""}`}>
      <Building2 className="h-4 w-4 text-muted-foreground" />

      <Select
        value={value}
        onValueChange={(v) => onChange(v as CompanyId)}
      >
        <SelectTrigger className="w-[260px] bg-background">
          <SelectValue placeholder="Select company" />
        </SelectTrigger>

        <SelectContent>
          {companies.map((c) => (
            <SelectItem key={c.id} value={c.id}>
              {c.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export function filterByCompany<
  T extends { companyId?: CompanyId }
>(
  rows: T[],
  companyId: CompanyId
): T[] {
  if (companyId === ALL_COMPANY) {
    return rows;
  }

  return rows.filter(
    (row) => row.companyId === companyId
  );
}