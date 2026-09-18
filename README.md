# MaLoyer — Frontend

Frontend Next.js de **MaLoyer** (nom de code interne : DarMeuble),
plateforme SaaS multi-tenant de gestion locative d'immeubles. Dépôt
GitHub : `git@github.com:sorail742/MaLoyer-frontend.git`.

**`AGENTS.md`** — règles condensées pour tout agent IA (Antigravity,
Cursor, Claude Code) travaillant sur ce dépôt ; à lire en premier.
**`docs/adr/`** — décisions d'architecture de ce dépôt.

Voir aussi le dépôt `darmeuble-kit` (kit de démarrage, dépôt séparé) et
`darmeuble-backend` (API, dépôt séparé) pour la documentation de référence
complète :

- `darmeuble-kit/docs/cahier-des-charges.md` — source de vérité fonctionnelle.
- `darmeuble-kit/docs/frontend/socle-frontend.md` — décisions de socle
  (stack, arborescence, auth, trois espaces).
- `darmeuble-kit/docs/frontend/architecture.md`, `contrat-api.md`,
  `design-system.md`, `testing.md`, `workflow.md`.
- `darmeuble-kit/docs/frontend/adr/` — ADR sources (avant formalisation
  dans `docs/adr/` de ce dépôt).

## État actuel — Phase 1 (Socle)

- **Proxy BFF** (`src/app/api/[...chemin]`) — le navigateur n'appelle
  jamais le backend directement ; ajoute l'`Authorization: Bearer`,
  renouvelle silencieusement l'access token sur un `401`.
- **Routes d'authentification dédiées** (`src/app/api/auth/{login,otp/verify,logout}`) —
  posent/effacent le cookie d'accès et relaient le `Set-Cookie` du refresh
  token posé directement par le backend (ADR-0004 backend, ADR-0002
  frontend). `otp/request` passe par le proxy générique (n'émet aucun
  jeton).
- **Trois espaces distincts** — `(organization)`, `(tenant)`,
  `(super-admin)`, chacun avec son propre layout serveur qui redirige si le
  rôle décodé du JWT ne correspond pas à l'espace (défense en profondeur,
  pas une vérification de sécurité — le backend reste seul juge).
- **Authentification fonctionnelle** — connexion email/mot de passe
  (`/login`) et OTP SMS locataire (`/otp`, en deux étapes), contre les
  endpoints réels de `darmeuble-backend`.
- **Tableau de bord organisation** (`/dashboard`) — organisation courante
  (`GET /api/organizations/me`) et liste d'équipe paginée
  (`GET /api/users`, réservée au rôle `owner`) : les deux seuls endpoints
  métier réels de la Phase 1 backend.
- **`(tenant)/my-lease`, `(super-admin)/organizations`** — placeholders
  structurels honnêtes : les modules backend correspondants (baux,
  supervision transverse) n'existent pas encore (Phases 2 et 6).
- **Composants partagés** (`components/shared/`) — `Can`, `AsyncBoundary`,
  `PageHeader`, `EmptyState`, `ErrorState`, `DataTable`, `TableSkeleton`,
  adaptés du projet frère `Oumra-hadj-web` (même principes, voir
  `darmeuble-kit/docs/frontend/design-system.md`), sans `next-intl`
  (DarMeuble est français uniquement en v1, cahier des charges §8).
- **Design system** — tokens OKLCH propres à DarMeuble (bleu ardoise +
  terracotta), polices Manrope/JetBrains Mono (distinctes des projets
  frères smartsms/Oumra-hadj).

**Non implémenté** (phases suivantes) : écrans métier (immeubles, baux,
paiements, charges, maintenance, documents, abonnements), registre de
statuts (`config/status-registry.ts`, aucun enum métier n'existe encore
côté backend), composants Lot C du design system
(`BuildingOccupancyPlan`, `RentScheduleTracker`, `DjomyPaymentFlow`...).

## Décisions prises en construisant ce socle

- **Cookie de refresh** : nom exact `darmeuble_refresh_token`, vérifié
  contre `darmeuble-backend/src/config/configuration.ts` (le gabarit du
  kit supposait un nom à confirmer — corrigé ici contre le code backend
  réel, pas deviné).
- **`@tanstack/react-table` épinglé en `8.21.3`**, pas la dernière version
  publiée (`9.x`) : le composant `DataTable` adapté d'`Oumra-hadj-web`
  utilise l'API v8, déjà vérifiée fonctionnelle dans ce projet frère.
- **TypeScript épinglé en `5.9.3`**, pas la dernière version publiée
  (`7.x`) — cohérent avec `darmeuble-backend` (même contrainte
  `typescript-eslint`) et avec la version déjà validée par `Oumra-hadj-web`.
- Versions alignées sur celles, déjà vérifiées fonctionnelles, du projet
  frère `Oumra-hadj-web` (même stack Next.js/React/Tailwind v4) plutôt que
  sur les dernières versions publiées à l'aveugle.

## Démarrage local

```bash
nvm use            # voir .nvmrc — doit correspondre à darmeuble-backend
cp .env.example .env.local
# BACKEND_URL=http://localhost:3000 (darmeuble-backend en local)
npm install
npm run dev         # http://localhost:3010
```

Le backend (`darmeuble-backend`) doit tourner en parallèle (`npm run
start:dev`, port 3000 par défaut) pour que la connexion et le tableau de
bord fonctionnent.

## Scripts

Voir `package.json`. `lint`, `typecheck`, `test`, `build` sont les portes
de qualité — voir `darmeuble-kit/docs/frontend/testing.md`.
