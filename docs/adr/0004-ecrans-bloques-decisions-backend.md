# ADR-0004 — Écrans bloqués par des décisions produit backend en attente

## Statut

Proposé — bloqué sur les ADR backend correspondantes, pas une décision
technique frontend.

## Contexte

`darmeuble-kit/docs/frontend/socle-frontend.md` §4 identifie trois écrans
frontend bloqués par des inconnues backend, elles-mêmes formalisées côté
`darmeuble-backend` en ADR proposées (0009 à 0012). Ce document sert de
point de correspondance unique côté frontend, pour ne pas dupliquer le
contenu des ADR backend ni construire ces écrans en devinant une réponse.

## Correspondance

| Écran frontend | Dépend de | ADR backend |
| --- | --- | --- |
| `DjomyPaymentFlow` (paiement de loyer en ligne, §9.2) | Contrat technique réel Djomy | [`darmeuble-backend/docs/adr/0009-*.md`](../../../darmeuble-backend/docs/adr/0009-contrat-technique-djomy.md) |
| Écran de choix de plan / page de facturation organisation | Modèle de tarification des abonnements | [`darmeuble-backend/docs/adr/0011-*.md`](../../../darmeuble-backend/docs/adr/0011-modele-tarification-abonnements.md) |
| Aperçu de bail avant acceptation (§5.3, §9.1) | Modèles de contrat de location (PDF) | [`darmeuble-backend/docs/adr/0012-*.md`](../../../darmeuble-backend/docs/adr/0012-modeles-contrat-location-pdf.md) |

(Chemins relatifs indicatifs : à ajuster selon l'emplacement réel des deux
dépôts sur la machine qui les lit — ils sont deux dépôts Git séparés, pas
un monorepo.)

## Ce qui ne bloque pas

Voir `darmeuble-kit/docs/frontend/socle-frontend.md` §4 : construire
d'abord l'écran d'échéancier et d'historique de loyer (`RentScheduleTracker`,
`darmeuble-kit/docs/frontend/design-system.md` §3), qui ne dépend d'aucune
de ces trois inconnues — l'affichage et le suivi des échéances sont déjà
bien définis par le cahier des charges (§5.4), seule l'action "payer en
ligne via Djomy" est bloquée.

## Conséquences

Cet ADR est mis à jour (jamais réécrit — voir la convention `docs/adr/README.md`)
au fur et à mesure que les ADR backend correspondantes passent de
"proposé" à "accepté", pour refléter que l'écran concerné n'est plus
bloqué.
