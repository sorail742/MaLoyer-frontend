# ADR-0005 — Conventions de localisation Guinée/Afrique

## Statut

Accepté.

## Contexte

MaLoyer est une plateforme opérée en Guinée, pas un produit
internationalisé générique (cahier des charges §1, §8 : "Interface en
français, montants en Franc Guinéen (GNF), formats de date locaux").
Miroir de `darmeuble-backend/docs/adr/0014-*.md`, côté affichage : le
backend fixe déjà `GNF` par défaut sur tout le schéma et valide le
téléphone contre la région Guinée, ce document fixe la convention
équivalente côté frontend avant que les premiers écrans qui affichent un
montant ou une date n'existent (Phase 2).

## Décision

1. **Devise : `formatGNF` (`src/lib/format/currency.ts`)**, seul point
   d'appel pour afficher un montant — jamais un `toLocaleString` ou un
   gabarit de chaîne ad hoc réécrit dans un composant. Repose sur
   `Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'GNF' })` :
   le nombre de décimales (0, comme les francs CFA) est déjà correct via
   les données ICU intégrées, jamais forcé en dur.
2. **Dates : `formatDateGN`/`formatRelativeGN` (`src/lib/format/date.ts`)**,
   `date-fns` avec la locale `fr` (noms de mois/jours). Aucune conversion
   de fuseau horaire appliquée : Africa/Conakry est à UTC+0 toute l'année,
   les dates reçues du backend en UTC (ISO 8601) s'affichent donc
   directement — voir l'ADR backend pour le détail.
3. **Téléphone : aucune validation de format frontend dupliquée** — le
   backend est seul juge (`@IsPhoneNumber('GN')`, ADR-0014 backend) ; un
   formulaire affiche l'erreur retournée par l'API, ne réimplémente pas la
   règle regex côté client.
4. **Adresses : champ texte libre**, jamais un composant d'autocomplétion
   d'adresse postale occidental (pas de système d'adressage postal
   guinéen formalisé, cahier des charges §5.1).

## Justification

Un seul point d'appel par type de donnée (devise, date) évite qu'un écran
réinvente son propre format légèrement différent d'un autre — cohérence
visuelle sur toute la plateforme, et un seul endroit à corriger si le
format cible change.

## Conséquences

- Tout nouvel écran qui affiche un montant importe `formatGNF`, jamais un
  calcul manuel.
- Tout nouvel écran qui affiche une date importe `formatDateGN`/
  `formatRelativeGN`, jamais `date.toLocaleDateString()` directement (pas
  de contrôle sur la locale utilisée par le navigateur du visiteur, qui
  peut différer du contexte cible).

## Alternatives écartées

**`next-intl` ou une librairie i18n complète.** Écarté — même raisonnement
que `AGENTS.md` : une seule langue (français), une seule devise, pas de
bascule de locale prévue. Une librairie i18n complète répondrait à un
besoin qui n'existe pas.
