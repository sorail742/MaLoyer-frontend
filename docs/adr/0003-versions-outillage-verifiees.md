# ADR-0003 — Versions d'outillage vérifiées à l'implémentation

## Statut

Accepté.

## Contexte

Le kit de démarrage `darmeuble-kit` (`config-templates/frontend/`,
`code-templates/frontend/`) fournit des gabarits écrits contre une version
antérieure de l'écosystème Next.js/ESLint/TanStack. En créant ce dépôt
(2026-09-18), plusieurs écarts réels ont été trouvés — vérifiés contre le
registre npm et le projet frère `Oumra-hadj-web` (même stack, versions déjà
prouvées fonctionnelles), pas contre les gabarits seuls.

## Décision

1. **`postcss.config.mjs` manquant dans le kit** — sans lui, Tailwind v4
   ne traite pas du tout les directives `@theme`/`@apply`/`@custom-variant`
   de `globals.css` ("Unknown at rule"). Copié depuis `Oumra-hadj-web`.
2. **ESLint épinglé en `9.39.5`**, pas la dernière version publiée
   (`10.x`). `eslint-config-next@16.3.5` embarque une version
   d'`eslint-plugin-react` qui appelle `context.getFilename()`, une API
   supprimée par ESLint 10 (`TypeError` au premier lint) — `9.39.5` est la
   version que `Oumra-hadj-web` utilise déjà pour la même stack.
3. **`eslint-import-resolver-typescript` ajouté en dépendance directe**
   (`4.4.5`) — la version qu'`eslint-config-next` tire en transitif
   (`^3.5.2`) lève "invalid interface loaded as resolver" pour la règle
   `import/no-restricted-paths`.
4. **`@tanstack/react-table` maintenu en `8.21.3`**, pas la dernière
   majeure publiée (`9.x`) — le composant `DataTable`
   (`src/components/shared/DataTable.tsx`), adapté d'`Oumra-hadj-web`,
   utilise l'API v8 (`getCoreRowModel`, `getPaginationRowModel`).
5. **`middleware.ts` renommé `proxy.ts`** (export `proxy` au lieu de
   `middleware`) — Next.js 16 a renommé cette convention de fichier ; le
   gabarit du kit utilisait encore l'ancien nom.
6. **`eslint@10.10.0` reste le choix du dépôt `darmeuble-backend`** — les
   deux dépôts n'ont pas la même contrainte (`eslint-config-next` côté
   frontend impose `9.x`, `typescript-eslint` seul côté backend accepte
   `10.x`) : ne pas aligner les deux ESLint par souci de cohérence sans
   revérifier.

## Justification

Le même principe que côté backend (voir `darmeuble-backend/docs/adr/0007-*.md`) :
vérifier contre l'état réel des outils et un projet frère déjà fonctionnel,
plutôt que de faire confiance à `latest` ou aux gabarits du kit sans
contrôle.

## Conséquences

- Toute mise à jour future d'ESLint ou de `@tanstack/react-table` doit
  revérifier ces contraintes avant de faire évoluer les pins.
- `npm run start` (preview de production) émet un avertissement Next.js :
  "next start" ne fonctionne pas avec `output: standalone` — utiliser
  `node .next/standalone/server.js` (après avoir copié `public/` et
  `.next/static` à côté, voir la documentation Next.js sur le déploiement
  standalone) pour un test fidèle au mode Docker prévu par ADR-0001.
  `npm run dev` (développement) n'est pas concerné.

## Alternatives écartées

**Copier les gabarits du kit tels quels.** Aurait produit un projet qui ne
compile pas (`@apply` non reconnu) et un lint qui plante
(`eslint-plugin-react` incompatible) dès la première commande.
