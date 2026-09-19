# MaLoyer frontend — règles du socle

À appliquer sur tout code de ce dépôt (`darmeuble-frontend`, publié sous
`MaLoyer-frontend` sur GitHub). Next.js 16 App Router, TypeScript strict,
Tailwind v4, TanStack Query. Documentation complète : `AGENTS.md`,
`docs/adr/README.md`, dépôt séparé `darmeuble-kit`.

## Le proxy — jamais contourné

- Le navigateur appelle `/api/*`, jamais le backend directement.
  `BACKEND_URL` reste côté serveur, sans préfixe `NEXT_PUBLIC_`.
- Routes qui **émettent ou révoquent un jeton**
  (`api/auth/login`, `api/auth/otp/verify`, `api/auth/logout`) : Route
  Handlers dédiés, jamais le proxy générique `[...chemin]` — leur réponse a
  une forme particulière (cookie d'accès à poser, `Set-Cookie` du backend à
  relayer tel quel).
- `src/proxy.ts` (convention Next.js 16, remplace `middleware.ts`) ne
  vérifie que la **présence** du cookie d'accès, jamais sa validité, et ne
  décode jamais le rôle — cette décision se prend après connexion, à
  partir de la réponse d'authentification.

## Enveloppe de réponse

`src/lib/api/client.ts` déballe `{success,data,meta}` côté succès, lit
`error.message`/`error.code` côté échec. Ne jamais consommer une réponse
brute d'un projet frère sans vérifier que le contrat est bien le même.

## Trois espaces, pas un `AppShell` unique

`(organization)`, `(tenant)`, `(super-admin)` — chacun son layout serveur,
son shell (`components/layout/`), sa navigation. Un locataire n'a jamais
besoin de voir la structure de navigation d'un gestionnaire, même vide.

## Composants partagés

`Can`, `AsyncBoundary`, `PageHeader`, `EmptyState`, `ErrorState`,
`DataTable`, `TableSkeleton` (`src/components/shared/`) sont les briques
communes — un écran ne réimplémente jamais chargement/vide/erreur/nominal
à la main. Nouveau composant transverse : vérifier d'abord
`C:\Users\keith\Oumra-hadj-web` (même principes, même équipe) avant d'en
inventer un.

## Typage et qualité

- **`any` interdit sous toute forme.** `noUncheckedIndexedAccess`,
  `strictNullChecks` actifs.
- `import/no-restricted-paths` : un `features/x` n'importe jamais depuis
  `features/y`.
- Un composant avec logique (appel API, état, règle métier) a un test
  (Vitest + Testing Library). Un composant purement présentationnel n'en a
  pas besoin.

## Choisir quel ticket travailler (priorité)

Avant de commencer, vérifier sur GitHub Issues — jamais deviner depuis le
nom de l'écran :

- **Respecter « Bloqué par sorail742/MaLoyer-backend#N »** — ne jamais
  démarrer un écran dont le module backend dont il dépend est encore
  ouvert.
- **Parmi les tickets non bloqués, `prio::high` avant `medium` avant
  `low`**, à égalité l'ordre des phases (`phase-2-immeubles-baux` → … →
  `phase-7-tests-lancement`). Ne pas sauter à une phase ultérieure pendant
  qu'un ticket `prio::high` d'une phase antérieure est encore ouvert, sauf
  demande explicite de l'utilisateur.
- **Un écran référencé dans `docs/adr/0004-*.md`** (bloqué par une décision
  produit backend encore « Proposée ») ne se construit pas en devinant la
  réponse — construire d'abord ce qui n'en dépend pas (voir la section « Ce
  qui ne bloque pas » de cet ADR).
- Un ticket `epic` ne se ferme jamais directement — le travail se fait sur
  ses sous-issues.

Discipline `prio::`/`effort::` inspirée de `smartsms-frontend`/
`smartsms-backend` (`docs/pilotage-equipe.md`).

## Git / GitHub

- Branche `feature/*` depuis `develop`. Jamais de push ni de merge direct
  sur `develop`/`main`, jamais d'approbation ou de merge de Pull Request à
  la place d'un humain, jamais `--no-verify` sans accord explicite.
- Jamais de secret en dur, jamais de contenu de `.env`/`.env.local` lu ni
  affiché.
