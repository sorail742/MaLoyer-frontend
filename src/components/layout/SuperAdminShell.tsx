import type { ReactNode } from "react";
import { LogoutButton } from "@/features/auth/components/LogoutButton";

/**
 * Coquille de l'espace Super Administrateur (équipe DarMeuble) — voir
 * darmeuble-kit/docs/frontend/socle-frontend.md §1. Espace complètement
 * séparé, pas une bascule de contexte dans l'espace organisation : un
 * super admin n'appartient à aucune organisation (cahier des charges §4).
 * Aucun lien de navigation encore : le volet transverse (organisations
 * clientes, plans d'abonnement) est Phase 6 côté backend.
 */
export function SuperAdminShell({ children }: { children: ReactNode }) {
  return (
    <div data-slot="app-shell" className="flex h-svh flex-col">
      <header className="bg-background flex h-14 shrink-0 items-center justify-between border-b px-4">
        <span className="text-sm font-medium">DarMeuble — Super Admin</span>
        <LogoutButton />
      </header>
      <main className="scrollbar-fine flex-1 overflow-y-auto p-6">
        {children}
      </main>
    </div>
  );
}
