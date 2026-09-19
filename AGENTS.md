# MaLoyer — frontend (AGENTS.md)

Règles pour tout agent IA (Antigravity, Cursor, Claude Code, ou autre)
travaillant sur ce dépôt. **MaLoyer** est le nom produit/GitHub de ce
projet — le code, les dossiers et la documentation technique gardent leur
nom de code interne « DarMeuble » (ne pas renommer les identifiants
existants sans demande explicite). Dépôt :
`git@github.com:sorail742/MaLoyer-frontend.git`. Backend associé :
`git@github.com:sorail742/MaLoyer-backend.git` (`darmeuble-backend` en
local).

Frontend Next.js App Router de la plateforme SaaS multi-tenant de gestion
locative MaLoyer/DarMeuble. TypeScript strict, Tailwind v4. Documentation
de référence complète dans le dépôt séparé `darmeuble-kit`
(`docs/frontend/*`) — ce fichier résume ce qu'un agent doit savoir *avant
d'écrire une ligne*, pas une redite intégrale.

## Commandes

```bash
pnpm install
pnpm run dev            # port 3010 — nécessite darmeuble-backend démarré (port 3000)
pnpm run lint            # ESLint (eslint-config-next + import/no-restricted-paths)
pnpm run typecheck        # tsc --noEmit
pnpm test                  # Vitest
pnpm run build              # next build
pnpm run start                # preview d'un build de production (pas pour Docker, voir docs/adr/0003-*.md)
```

Node exact requis : voir `.nvmrc` (doit correspondre à celui de
`darmeuble-backend`). Gestionnaire de paquets : **`pnpm`** uniquement
(`docs/adr/0003-*.md`, addendum 2026-09-19) — jamais `npm`/`yarn`, jamais de
`package-lock.json`/`yarn.lock` en parallèle de `pnpm-lock.yaml`. Backend
(`darmeuble-backend`) reste sur `npm`, ne pas aligner les deux sans demande
explicite.

## Ce qui ne se discute pas

- **Le navigateur ne parle jamais au backend directement.** Tout passe par
  les Route Handlers de `src/app/api/` — le proxy générique
  (`[...chemin]/route.ts`) ajoute l'`Authorization: Bearer` lu dans le
  cookie d'accès ; les routes dédiées (`api/auth/{login,otp/verify,logout}`)
  gèrent les réponses qui posent ou effacent un jeton. `BACKEND_URL`
  n'est **jamais** préfixée `NEXT_PUBLIC_`.
- **Le refresh token n'est ni lu ni construit par ce frontend** — il est
  posé directement par le backend via `Set-Cookie`, ce frontend le relaie
  tel quel sur les routes d'authentification (voir
  `src/lib/auth/process-auth-response.ts`, `src/lib/auth/refresh.ts`). Ne
  jamais reproduire le pattern « deux cookies posés par le proxy » d'un
  autre projet frère sans vérifier ce point.
- **Le client HTTP déballe l'enveloppe `{success,data,meta}`/`{success:false,error}`**
  (`src/lib/api/client.ts`, `response-interpreter.ts`) — c'est le contrat
  réel du backend MaLoyer, différent d'autres projets frères qui renvoient
  une réponse brute. Ne jamais inventer un format de pagination différent
  de `meta.{page,limit,total,totalPages}`.
- **Trois espaces distincts** — `(organization)`, `(tenant)`,
  `(super-admin)` — chacun avec son propre layout serveur et son propre
  shell (`components/layout/*Shell.tsx`), jamais un `AppShell` unique avec
  des conditions de rôle partout. `src/lib/auth/require-role.ts` redirige
  côté serveur si le rôle décodé du JWT ne correspond pas à l'espace —
  défense en profondeur, jamais une vérification de sécurité en soi (le
  backend reste seul juge).
- **`<Can role={[...]}>` (`src/components/shared/Can.tsx`) ne remplace
  jamais un filtre backend.** Un `manager` voit déjà une liste filtrée par
  l'API (portée intra-organisation) ; ne jamais reproduire ce filtre côté
  client en supposant qu'il est toujours correct.
- **`any` interdit sous toute forme.** `noUncheckedIndexedAccess`,
  `strictNullChecks` actifs.
- **`import/no-restricted-paths`** : un dossier `features/x` n'importe
  jamais depuis `features/y` — remonter le code partagé dans
  `components/shared/` ou `lib/`.
- **Un composant avec logique (appel API, état, règle métier) a un test.**
  Un composant purement présentationnel n'en a pas besoin.
- **Français exclusivement** (cahier des charges §8) — pas de `next-intl`
  tant que ce choix ne change pas, texte en dur en français dans les
  composants.

## Choisir quel ticket travailler (priorité)

Avant de commencer, vérifier sur GitHub Issues — jamais deviner depuis le
nom de l'écran (un agent qui construit un écran non prioritaire pendant
qu'un autre, plus prioritaire, reste ouvert produit du travail à refaire) :

1. **Respecter « Bloqué par sorail742/MaLoyer-backend#N »** dans le corps
   du ticket — ne jamais démarrer un écran dont le module backend associé
   est encore ouvert.
2. **Parmi les tickets non bloqués, `prio::high` avant `medium` avant
   `low`**, à égalité respecter l'ordre des phases. Ne pas sauter à une
   phase ultérieure pendant qu'un ticket `prio::high` d'une phase
   antérieure est encore ouvert, sauf demande explicite de l'utilisateur.
3. **Un écran listé dans `docs/adr/0004-*.md`** (bloqué par une décision
   produit backend encore « Proposée ») ne se construit pas en devinant la
   réponse — voir la section « Ce qui ne bloque pas » de cet ADR pour ce
   qui peut avancer sans attendre.
4. Un ticket `epic` (label `epic`) ne se ferme jamais directement — le
   travail se fait sur ses sous-issues.

Discipline `prio::`/`effort::` inspirée de `smartsms-frontend`
(`docs/pilotage-equipe.md` : « un ticket entre étiqueté, ou n'entre pas »).

## Où trouver le reste

- `docs/adr/README.md` — décisions d'architecture de ce dépôt.
- `README.md` — état d'avancement réel (quels écrans existent).
- Dépôt `darmeuble-kit` (séparé, en lecture) — cahier des charges,
  `docs/frontend/design-system.md` (tokens, registre de statuts, catalogue
  de composants), `docs/frontend/contrat-api.md`.
- Projet frère `C:\Users\keith\Oumra-hadj-web` (même compte, en lecture) —
  source directe des principes de composants partagés
  (`Can`, `AsyncBoundary`, `PageHeader`, `EmptyState`, `ErrorState`,
  `DataTable`) : vérifier là-bas avant de réinventer un pattern transverse.
