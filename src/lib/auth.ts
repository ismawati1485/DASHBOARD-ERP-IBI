export type Role = "sata" | "sales" | "logistik" | "produksi" | "accounting" | "tax" | "finance";

export const VALID_ROLES: Role[] = ["sata", "sales", "logistik", "produksi", "accounting", "tax", "finance"];

const KEY = "erp_auth";

export type Session = { username: string; role: Role };

export function login(username: string, _password: string): Session | null {
  const role = username.toLowerCase().trim() as Role;
  if (!VALID_ROLES.includes(role)) return null;
  const session: Session = { username: username.trim(), role };
  if (typeof window !== "undefined") localStorage.setItem(KEY, JSON.stringify(session));
  return session;
}

export function logout() {
  if (typeof window !== "undefined") localStorage.removeItem(KEY);
}

export function getSession(): Session | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Session) : null;
  } catch {
    return null;
  }
}

export function getDashboardPath(role: Role): string {
  if (role === "accounting") return "/accounting";
  if (role === "tax") return "/tax";
  if (role === "finance") return "/finance";
  return "/dashboard";
}
