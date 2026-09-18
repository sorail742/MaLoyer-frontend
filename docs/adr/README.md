# Architecture Decision Records — MaLoyer frontend (darmeuble-frontend)

Même format que `darmeuble-backend/docs/adr/README.md` — un fichier par
décision, numérotation séquentielle, jamais réécrit une fois accepté.

## Index

| ADR | Titre | Statut |
| --- | --- | --- |
| [0001](0001-stack-nextjs-app-router.md) | Next.js App Router comme stack frontend | Accepté |
| [0002](0002-jeton-cookie-httponly-proxy.md) | Jeton en cookie httpOnly, proxy et enveloppe de réponse | Accepté |
| [0003](0003-versions-outillage-verifiees.md) | Versions d'outillage vérifiées à l'implémentation | Accepté |
| [0004](0004-ecrans-bloques-decisions-backend.md) | Écrans bloqués par des décisions produit backend en attente | Proposé — bloqué sur des ADR backend |

## Quand créer un nouvel ADR

Même règle que côté backend : choix de librairie structurante, nouveau
service externe, changement de pattern, changement d'hébergement — proposer
**avant** d'implémenter.
