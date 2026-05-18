// =========================
// TYPES
// =========================
export interface User {
  id: string;
  username: string;
  role: Role;
}

export interface Session {
  user: User;
  token: string;
  expires_at: string;
}

// =========================
// ROLES
// =========================
export const VALID_ROLES: Role[] = [
  "admin_tax",
  "admin_finance",
  "admin_accounting",

  "admin_sales",
  "manager_sales",
  "user_sales",

  "admin_sata",
  "manager_sata",
  "user_sata",

  "admin_logistik",
  "manager_logistik",
  "user_logistik",

  "admin_produksi",
  "manager_produksi",
  "user_produksi",

  "manager",
  "super_admin",
];

export type Role =
  | "admin_tax"
  | "admin_finance"
  | "admin_accounting"

  | "admin_sales"
  | "manager_sales"
  | "user_sales"

  | "admin_sata"
  | "manager_sata"
  | "user_sata"

  | "admin_logistik"
  | "manager_logistik"
  | "user_logistik"

  | "admin_produksi"
  | "manager_produksi"
  | "user_produksi"

  | "manager"
  | "super_admin";

// =========================
// DASHBOARD MAP
// =========================
const DASHBOARD_PATHS: Record<Role, string> = {

  // TAX
  admin_tax: "/tax",

  // FINANCE
  admin_finance: "/finance",

  // ACCOUNTING
  admin_accounting: "/accounting",

  // SALES
  admin_sales: "/dashboard",
  manager_sales: "/dashboard",
  user_sales: "/dashboard",

  // SATA
  admin_sata: "/dashboard",
  manager_sata: "/dashboard",
  user_sata: "/dashboard",

  // LOGISTIK
  admin_logistik: "/dashboard",
  manager_logistik: "/dashboard",
  user_logistik: "/dashboard",

  // PRODUKSI
  admin_produksi: "/dashboard",
  manager_produksi: "/dashboard",
  user_produksi: "/dashboard",

  // GLOBAL
  manager: "/dashboard",
  super_admin: "/dashboard",
};

// =========================
// LOGIN
// =========================
export async function loginAsync(
  username: string,
  password: string
): Promise<Session | null> {
  try {

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      }
    );

    const data = await response.json();


    if (!response.ok || !data.success) {
      return null;
    }

    const role = data.data.role as Role;

    const session: Session = {
      user: {
        id: data.data.id,
        username: data.data.username,
        role,
      },
      token: data.token,
      expires_at: data.token_expires_at,
    };

    // SAVE SESSION
    localStorage.setItem(
      "auth:session",
      JSON.stringify(session)
    );

    localStorage.setItem(
      "auth:token",
      session.token
    );

    localStorage.setItem(
      "auth:expires_at",
      session.expires_at
    );

    return session;

  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return null;
  }
}

// =========================
// GET SESSION
// =========================
export function getSession(): Session | null {

  const session = localStorage.getItem("auth:session");

  if (!session) {
    return null;
  }

  const parsed: Session = JSON.parse(session);

  // EXPIRED
  if (
    new Date(parsed.expires_at) < new Date()
  ) {
    clearSession();
    return null;
  }

  return parsed;
}

// =========================
// DASHBOARD PATH
// =========================
export function getDashboardPath(
  role: Role
): string {

  console.log("ROLE:", role);
  console.log("PATH:", DASHBOARD_PATHS[role]);

  return DASHBOARD_PATHS[role] || "/dashboard";
}

// =========================
// LOGOUT
// =========================
export function logout(): void {
  clearSession();
}

// =========================
// CLEAR SESSION
// =========================
export function clearSession(): void {

  localStorage.removeItem("auth:session");

  localStorage.removeItem("auth:token");

  localStorage.removeItem("auth:expires_at");
}