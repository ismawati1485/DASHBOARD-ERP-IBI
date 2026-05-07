import { PageHeader, type Crumb } from "./PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { BarChart3, TrendingUp, Activity, DollarSign } from "lucide-react";

const stats = [
  { label: "Total Records", value: "—", icon: BarChart3, hint: "Awaiting data" },
  { label: "This Month", value: "—", icon: TrendingUp, hint: "Awaiting data" },
  { label: "Active", value: "—", icon: Activity, hint: "Awaiting data" },
  { label: "Value", value: "—", icon: DollarSign, hint: "Awaiting data" },
];

export function PlaceholderPage({ title, description, crumbs }: { title: string; description?: string; crumbs: Crumb[] }) {
  return (
    <div>
      <PageHeader title={title} description={description ?? "Placeholder content. Connect data source to populate."} crumbs={crumbs} />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} className="rounded-xl shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{s.label}</CardTitle>
              <s.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold">{s.value}</div>
              <p className="text-xs text-muted-foreground">{s.hint}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card className="rounded-xl shadow-sm lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex h-64 items-center justify-center rounded-lg border border-dashed bg-muted/40 text-sm text-muted-foreground">
              Chart placeholder
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-xl shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="h-9 w-9 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-3 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6 rounded-xl shadow-sm">
        <CardHeader>
          <CardTitle className="text-base">Recent Items</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Updated</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[1, 2, 3, 4, 5].map((i) => (
                <TableRow key={i}>
                  <TableCell className="font-mono text-xs">#000{i}</TableCell>
                  <TableCell>
                    <Skeleton className="h-3 w-40" />
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">Pending</Badge>
                  </TableCell>
                  <TableCell className="text-right text-xs text-muted-foreground">—</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
