# ADR-0002 — Jeton en cookie httpOnly, proxy et enveloppe de réponse

## Statut

Accepté — implémenté.

## Contexte

Le backend MaLoyer/DarMeuble adopte un couple access/refresh avec
rotation, le refresh étant posé **directement par le backend**
(`darmeuble-backend/docs/adr/0004-*.md`) — différent d'`Oumra-hadj-web`
(les deux cookies posés par le proxy Next). Le backend applique aussi une
enveloppe de réponse `{success,data,meta}` — différent d'`Oumra-hadj-web`
(réponse brute).

## Décision

**Access token** : cookie `httpOnly` + `secure` + `sameSite=lax`, posé par
le proxy Next à partir de la réponse JSON du backend (`data.accessToken`)
— voir `src/lib/auth/session.ts`, `src/lib/auth/process-auth-response.ts`.

**Refresh token** : cookie `httpOnly` + `secure` + `sameSite=lax`, posé
**directement par le backend** via `Set-Cookie` — le proxy le relaie tel
quel sur les routes d'authentification
(`src/app/api/auth/{login,otp/verify,logout}/route.ts`), il ne le construit
jamais lui-même. Nom exact `darmeuble_refresh_token`
(`src/lib/auth/cookie.ts::NOM_COOKIE_REFRESH`), vérifié contre
`darmeuble-backend/src/config/configuration.ts`.

**Enveloppe de réponse** : `src/lib/api/client.ts` déballe
`{success,data,meta}` côté succès, lit `error.message`/`error.code` côté
échec.

## Justification

**Pourquoi laisser le backend poser le refresh token.** Minimise le nombre
d'endroits où la valeur en clair du refresh token est manipulée — voir
`darmeuble-backend/docs/adr/0004-*.md` §Justification.

**Pourquoi déballer une enveloppe.** Le backend MaLoyer en applique une —
le client HTTP doit refléter le contrat réel, pas celui d'un projet frère
au backend différent.

## Conséquences

- Le proxy `src/app/api/[...chemin]/route.ts` a deux comportements
  distincts selon la route : reconstruire le cookie d'accès à partir du
  JSON pour la plupart des routes, relayer le `Set-Cookie` tel quel pour
  les routes d'authentification.
- La file d'attente de requêtes concurrentes sur le renouvellement
  (`src/lib/auth/refresh.ts`, un seul appel en vol par processus serveur)
  reste une responsabilité frontend — le backend suppose que les appels à
  `/refresh` sont sérialisés côté client.
- `POST /api/auth/logout` a sa propre route dédiée (pas le proxy
  générique) : elle doit effacer le cookie d'accès local en plus de
  relayer la révocation côté backend, une réponse qui n'émet aucun nouveau
  jeton et que `relayerReponseAuth` ne sait donc pas traiter.

## Alternatives écartées

**Reproduire tel quel le proxy d'Oumra-hadj-web (les deux cookies posés
côté Next).** Contredirait le choix déjà documenté côté backend
(ADR-0004) de poser le refresh en `Set-Cookie` direct.
