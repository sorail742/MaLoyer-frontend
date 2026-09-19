---
name: Évolution
about: Nouvel écran ou changement de comportement attendu
title: ""
labels: ""
---

<!--
Un ticket qui ne remplit pas ces sections n'est pas recevable — voir
AGENTS.md et darmeuble-kit/docs/frontend/testing.md. Il se complète ou se
ferme, il n'entre pas dans une phase tel quel.
-->

## Contexte

<!-- Pourquoi ce ticket existe. Renvoyer au cahier des charges (§ du
darmeuble-kit) ou à l'ADR concernée si applicable. -->

## Comportement attendu

<!-- Ce qui doit exister ou se passer après livraison, écran par écran si
plusieurs. Observable, pas une description d'implémentation. -->

## Bloqué par / dépend de

<!-- Issues ou ADR dont ce ticket dépend, y compris côté MaLoyer-backend
(`owner/repo#123`). "Aucun" si indépendant. -->

## Critères d'acceptation

- [ ]
- [ ]

## Définition de terminé

- [ ] Code fusionné dans `develop`.
- [ ] Appel effectué via le proxy `/api/*` uniquement, jamais le backend directement.
- [ ] Les quatre états (chargement/vide/erreur/nominal) gérés via `AsyncBoundary`/`EmptyState`/`ErrorState`.
- [ ] Test component (Vitest + Testing Library) si logique métier, état ou appel API.
- [ ] `pnpm run lint`, `pnpm run typecheck` propres — zéro nouvelle erreur.
- [ ] Documentation mise à jour si le changement l'impose (ADR, README).
- [ ] Ce qui reste à faire a son propre ticket, pas un commentaire dans le code.
