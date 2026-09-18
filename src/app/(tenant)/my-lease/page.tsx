/**
 * Espace locataire — placeholder structurel. Le module `leases`/`tenants`
 * n'existe pas encore côté backend (Phase 2, voir
 * darmeuble-backend/README.md) : cet écran ne peut afficher aucune donnée
 * réelle avant cette phase, plutôt que de simuler un bail qui n'existe pas.
 */
export default function MyLeasePage() {
  return (
    <div className="mx-auto max-w-(--content-prose) space-y-2 py-12 text-center">
      <h1 className="text-xl font-semibold">Mon bail</h1>
      <p className="text-muted-foreground text-sm">
        Cet espace affichera votre bail, votre échéancier de loyer et vos
        demandes de maintenance dès que ces modules seront construits côté
        backend (Phase 2 du cahier des charges).
      </p>
    </div>
  );
}
