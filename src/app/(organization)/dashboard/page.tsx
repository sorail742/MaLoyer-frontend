import { PageHeader } from "@/components/shared/PageHeader";
import { Can } from "@/components/shared/Can";
import { OrganizationSummaryCard } from "@/features/organizations/components/OrganizationSummaryCard";
import { UsersTable } from "@/features/users/components/UsersTable";

/**
 * Tableau de bord organisation — exerce la chaîne complète (proxy → JWT →
 * TenantScopeGuard/RolesGuard → repository) sur les deux seuls endpoints
 * réels de la Phase 1 backend (`organizations/me`, `users`). Les widgets
 * métier (occupation, recettes, impayés — cahier des charges §5.9) ne
 * peuvent pas encore exister : aucun module `buildings`/`payments` n'est
 * construit côté backend.
 */
export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <PageHeader
        title="Tableau de bord"
        description="Vue d'ensemble de votre organisation."
      />
      <OrganizationSummaryCard />
      <Can role={["owner"]}>
        <div className="space-y-3">
          <h2 className="text-sm font-semibold">Équipe</h2>
          <UsersTable />
        </div>
      </Can>
    </div>
  );
}
