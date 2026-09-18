import type { ReactNode } from "react";
import Link from "next/link";
import { LogoutButton } from "@/features/auth/components/LogoutButton";

/**
 * Coquille de l'espace organisation (propriétaire/gestionnaire/comptable) —
 * sidebar + header + zone de contenu. Un des trois espaces distincts
 * imposés par darmeuble-kit/docs/frontend/socle-frontend.md §1 — jamais un
 * `AppShell` unique partagé avec les espaces locataire/super-admin.
 *
 * Volontairement minimale (Phase 1 du socle) : un seul lien de navigation
 * réel (`Dashboard`) tant que les modules métier (immeubles, baux,
 * paiements...) n'existent pas côté backend — un lien vers un écran qui
 * n'existe pas encore serait un lien mort, pas de la navigation anticipée.
 * `data-slot="app-shell"` déclenche la règle `overflow: hidden` du `body`
 * dans `globals.css` — une seule zone défile par écran.
 */
export function OrganizationShell({ children }: { children: ReactNode }) {
  const liens = [{ href: "/dashboard", label: "Tableau de bord" }];

  return (
    <div data-slot="app-shell" className="flex h-svh">
      <aside className="bg-sidebar border-sidebar-border hidden w-(--sidebar-width) shrink-0 flex-col border-r lg:flex">
        <div className="text-sidebar-foreground flex h-14 items-center border-b px-4 text-sm font-semibold">
          DarMeuble
        </div>
        <nav className="scrollbar-fine flex-1 space-y-1 overflow-y-auto p-2">
          {liens.map((lien) => (
            <Link
              key={lien.href}
              href={lien.href}
              className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground block rounded-md px-3 py-2 text-sm"
            >
              {lien.label}
            </Link>
          ))}
        </nav>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="bg-background flex h-14 shrink-0 items-center justify-between border-b px-4">
          <span className="text-sm font-medium">DarMeuble — Organisation</span>
          <LogoutButton />
        </header>
        <main className="scrollbar-fine flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
