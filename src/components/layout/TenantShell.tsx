import type { ReactNode } from "react";
import { LogoutButton } from "@/features/auth/components/LogoutButton";

/**
 * Coquille de l'espace locataire — voir
 * darmeuble-kit/docs/frontend/socle-frontend.md §1. Aucun lien de
 * navigation encore : le module `tenants`/`leases` n'existe pas côté
 * backend (Phase 2, voir darmeuble-backend/README.md). Un locataire n'a
 * jamais besoin de voir la structure de navigation d'un gestionnaire —
 * cet espace ne réutilise donc jamais `OrganizationShell`.
 */
export function TenantShell({ children }: { children: ReactNode }) {
  return (
    <div data-slot="app-shell" className="flex h-svh flex-col">
      <header className="bg-background flex h-14 shrink-0 items-center justify-between border-b px-4">
        <span className="text-sm font-medium">DarMeuble — Mon espace</span>
        <LogoutButton />
      </header>
      <main className="scrollbar-fine flex-1 overflow-y-auto p-6">
        {children}
      </main>
    </div>
  );
}
