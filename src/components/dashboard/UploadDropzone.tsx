import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UploadCloud, FileSpreadsheet, X } from "lucide-react";

// this is a example of a file upload component
export function UploadDropzone({
  title = "Upload Production Analysis",
  description = "Drag & drop file Excel atau klik untuk memilih file.",
  acceptLabel = ".xlsx, .xls, .csv",
}: {
  title?: string;
  description?: string;
  acceptLabel?: string;
}) {
  const [hover, setHover] = useState(false);
  const [file, setFile] = useState<{ name: string; size: string } | null>({
    name: "production-analysis-2025-Q1.xlsx",
    size: "248 KB",
  });

  return (
    <Card className="rounded-xl shadow-sm">
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <button
          type="button"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onClick={() =>
            setFile({ name: "production-analysis-2025-Q1.xlsx", size: "248 KB" })
          }
          className={`flex w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed p-8 transition-colors ${
            hover ? "border-primary bg-primary/5" : "border-border bg-muted/30"
          }`}
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <UploadCloud className="h-6 w-6" />
          </div>
          <div className="text-sm font-medium text-foreground">
            Drag & drop file ke sini
          </div>
          <div className="text-xs text-muted-foreground">
            atau <span className="font-medium text-primary">browse</span> dari komputer
          </div>
          <div className="text-xs text-muted-foreground">{description}</div>
          <Badge variant="secondary" className="mt-1">{acceptLabel}</Badge>
        </button>

        {file && (
          <div className="flex items-center justify-between rounded-lg border bg-card p-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                <FileSpreadsheet className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-medium">{file.name}</div>
                <div className="text-xs text-muted-foreground">
                  {file.size} • Uploaded
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
                Ready
              </Badge>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setFile(null)}
                aria-label="Remove file"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        <div className="flex justify-end gap-2">
          <Button variant="outline">Cancel</Button>
          <Button disabled={!file}>Process Upload</Button>
        </div>
      </CardContent>
    </Card>
  );
}
