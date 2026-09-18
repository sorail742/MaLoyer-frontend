/**
 * Fabrique centrale des clés TanStack Query. Interdit d'écrire un tableau
 * de clé en dur dans un composant — voir
 * darmeuble-kit/docs/frontend/socle-frontend.md.
 *
 * Domaines calqués sur les modules backend réellement implémentés
 * (Phase 1 — organizations, users, auth). À compléter module par module au
 * fur et à mesure des phases suivantes (buildings, leases, payments...),
 * pas d'avance sur un endpoint qui n'existe pas encore côté backend.
 */

type Filtres = Record<string, unknown>;

export const keys = {
  organizations: {
    all: ["organizations"] as const,
    me: () => [...keys.organizations.all, "me"] as const,
  },

  users: {
    all: ["users"] as const,
    me: () => [...keys.users.all, "me"] as const,
    list: (f: Filtres) => [...keys.users.all, "list", f] as const,
  },

  auth: {
    all: ["auth"] as const,
  },
} as const;
