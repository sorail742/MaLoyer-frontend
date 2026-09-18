/**
 * Nom du cookie d'accès — sans dépendance runtime, pour que
 * `middleware.ts` (Edge) puisse l'importer sans tirer `next/headers`.
 *
 * **Le refresh token n'a pas de nom de cookie géré ici** : il est posé
 * directement par le backend (voir darmeuble-kit/docs/backend/adr/0004-*.md
 * et docs/frontend/adr/0002-*.md) — ce frontend ne le lit ni ne l'écrit
 * jamais, il relaie seulement le `Set-Cookie` du backend tel quel sur les
 * routes d'authentification (voir le proxy).
 */

export const NOM_COOKIE_ACCES = "darmeuble_access";

/**
 * Nom du cookie de refresh — **connu ici uniquement pour le relayer**, pas
 * pour le gérer. Doit correspondre exactement à `REFRESH_TOKEN_COOKIE_NAME`
 * côté backend (voir darmeuble-backend/.env.example et
 * src/config/configuration.ts, valeur par défaut
 * `darmeuble_refresh_token`) — vérifié contre le code backend réel de ce
 * projet, pas supposé.
 */
export const NOM_COOKIE_REFRESH = "darmeuble_refresh_token";

/**
 * Durée à vérifier contre l'environnement réellement déployé —
 * `JWT_ACCESS_EXPIRES_IN` côté backend (par défaut 15 minutes,
 * darmeuble-kit/docs/backend/adr/0004-*.md), pas une garantie
 * contractuelle figée ici.
 */
export const DUREE_ACCES_S = 60 * 15; // 15 minutes

export const OPTIONS_COOKIE_ACCES = {
  httpOnly: true,
  secure: process.env.NODE_ENV !== "development",
  sameSite: "lax" as const,
  path: "/",
};
