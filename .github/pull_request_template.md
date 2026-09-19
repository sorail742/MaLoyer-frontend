## Quoi et pourquoi

Closes #

## Checklist (auto-évaluation avant de demander une revue)

- [ ] Pipeline CI vert (`lint` → `build` → `test`).
- [ ] Appel effectué via le proxy `/api/*` uniquement, jamais le backend directement.
- [ ] Les quatre états (chargement/vide/erreur/nominal) gérés, pas réimplémentés à la main.
- [ ] Test component ajouté si logique métier, état ou appel API.
- [ ] Aucun secret ni contenu de `.env`/`.env.local` commité ou affiché.
- [ ] Documentation mise à jour si le changement l'impose (ADR, README).

## Ce qu'un relecteur vérifie

Avant le fond : le pipeline est vert, les tests couvrent le changement, aucune règle du socle n'est enfreinte (`AGENTS.md`), la description dit pourquoi.

Puis le fond : l'écran fait-il ce qu'il annonce, et le fait-il là où il faut.
