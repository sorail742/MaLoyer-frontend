/**
 * Espace Super Administrateur — placeholder structurel. Le volet
 * transverse (supervision des organisations clientes, plans d'abonnement)
 * est Phase 6 du cahier des charges — cet écran ne peut afficher aucune
 * donnée réelle avant cette phase.
 */
export default function SuperAdminOrganizationsPage() {
  return (
    <div className="mx-auto max-w-(--content-prose) space-y-2 py-12 text-center">
      <h1 className="text-xl font-semibold">Organisations clientes</h1>
      <p className="text-muted-foreground text-sm">
        Cet espace affichera la liste des organisations clientes de la
        plateforme et leurs abonnements dès que le module correspondant sera
        construit côté backend (Phase 6 du cahier des charges).
      </p>
    </div>
  );
}
