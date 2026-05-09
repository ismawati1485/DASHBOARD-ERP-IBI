import { CalendarDays } from "lucide-react";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

export const MONTHS = [
  "All",
  "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
  "Jul", "Agu", "Sep", "Okt", "Nov", "Des",
] as const;
export type MonthValue = (typeof MONTHS)[number];

export const ALL_MONTHS: MonthValue = "All";
export const DEFAULT_MONTH: MonthValue = "All";

export function MonthFilter({
  value,
  onChange,
  className,
}: {
  value: MonthValue;
  onChange: (v: MonthValue) => void;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-2 ${className ?? ""}`}>
      <CalendarDays className="h-4 w-4 text-muted-foreground" />
      <Select value={value} onValueChange={(v) => onChange(v as MonthValue)}>
        <SelectTrigger className="w-[160px] bg-background">
          <SelectValue placeholder="Bulan" />
        </SelectTrigger>
        <SelectContent>
          {MONTHS.map((m) => (
            <SelectItem key={m} value={m}>{m === "All" ? "Semua Bulan" : m}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export function filterByMonth<T extends { bulan?: string }>(
  rows: T[],
  month: MonthValue,
): T[] {
  if (month === "All") return rows;
  return rows.filter((r) => r.bulan === month);
}
