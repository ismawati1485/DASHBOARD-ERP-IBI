// ============================================
// FILE: src/routes/login.tsx
// ============================================

import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent, useEffect } from "react";
import { Building2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { loginAsync, getDashboardPath, VALID_ROLES, getSession } from "@/lib/auth";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — ERP Dashboard" }] }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Redirect jika sudah login
  useEffect(() => {
    const session = getSession();
    if (session) {
      navigate({ to: getDashboardPath(session.user.role) });
    }
  }, [navigate]);
  

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Try login dengan backend API
      const session = await loginAsync(username, password);
      
      if (!session) {
        setError("Invalid username or password");
        setPassword("");
        return;
      }

      navigate({ to: getDashboardPath(session.user.role) });
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#EEF2FF] via-white to-[#F8FAFC] px-4">
      <div className="grid w-full max-w-5xl gap-8 lg:grid-cols-2 lg:items-center">
        <div className="hidden flex-col gap-6 lg:flex">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#4361EE] text-white shadow-md shadow-blue-200">
              <Building2 className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-slate-900">ERP Dashboard</h1>
              <p className="text-sm text-slate-600">
                Unified operations, accounting, tax & finance.
              </p>
            </div>
          </div>
          <p className="max-w-md text-sm text-slate-600">
            Sign in with your role to access your tailored workspace. Streamline sales, inventory, production,
            cashflow, tax reporting, and more — all from one clean interface.
          </p>
          <div className="rounded-xl border bg-card p-4 text-xs text-muted-foreground shadow-sm">
            <div className="mb-1 font-medium text-foreground">Demo roles available</div>
            <div className="flex flex-wrap gap-1.5">
              {VALID_ROLES.map((r) => (
                <span
                  key={r}
                  className="rounded-lg bg-[#EEF2FF] px-2.5 py-1 text-[#4361EE] capitalize font-medium"
                >
                  {r}
                </span>
              ))}
            </div>
            <p className="mt-2">Use the role name as username. Password: any value (for demo)</p>
          </div>
        </div>

        <Card className="rounded-3xl border border-slate-200 bg-white/95 shadow-xl backdrop-blur">
          <CardHeader className="space-y-1">
            <div className="flex items-center gap-2 lg:hidden">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#4361EE] text-white">
                <Building2 className="h-5 w-5" />
              </div>
              <span className="text-base font-semibold">ERP Dashboard</span>
            </div>
            <CardTitle className="text-2xl">Welcome back</CardTitle>
            <CardDescription>Sign in to continue to your workspace.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  placeholder="e.g. admin_sales"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                  disabled={isLoading}
                />
              </div>
              {error && (
                <div className="rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-xs text-destructive">
                  {error}
                </div>
              )}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#4361EE] text-white shadow-md shadow-blue-200 hover:bg-[#3651D4] disabled:opacity-50"
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
