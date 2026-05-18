import { useEffect } from "react";
import { clearSession, getSession } from "@/lib/auth";

export function useAutoLogout(navigate?: any) {
  useEffect(() => {
    const interval = setInterval(() => {
      const session = getSession();

      // kalau session tidak ada
      if (!session) {
        clearSession();

        if (navigate) {
          navigate({ to: "/login" });
        } else {
          window.location.href = "/login";
        }

        return;
      }

      // cek expired
      const expired =
        new Date(session.expires_at).getTime() <
        new Date().getTime();

      if (expired) {
        alert("Session expired. Please login again.");

        clearSession();

        if (navigate) {
          navigate({ to: "/login" });
        } else {
          window.location.href = "/login";
        }
      }
    }, 5000); // cek tiap 5 detik

    return () => clearInterval(interval);
  }, [navigate]);
}