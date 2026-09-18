# ADR-0001 — Next.js App Router comme stack frontend

## Statut

Accepté — implémenté.

## Contexte

Le cahier des charges impose Next.js (§6.1) sans trancher App Router vs
Pages Router. Le projet frère `Oumra-hadj-web` a choisi App Router pour les
mêmes raisons qui s'appliquent ici (proxy BFF via Route Handlers, rendu
serveur sur connexion lente).

## Décision

Next.js 16, App Router, TypeScript strict, épinglé sans `^`. Les Route
Handlers de `src/app/api/` servent de proxy entre le navigateur et le
backend NestJS (`darmeuble-backend`).

## Justification

**Le jeton ne doit pas vivre dans `localStorage`.** MaLoyer manipule des
paiements de loyer et des données financières — l'exposition XSS d'un
jeton y a un coût élevé.

**Rendu serveur adapté à une connectivité limitée.** Le cahier des charges
(§8, "Connectivité") anticipe des connexions internet limitées côté
locataires — un rendu serveur affiche du contenu avant le téléchargement
complet du bundle JavaScript.

**Alignement avec l'écosystème.** Même stack que `Oumra-hadj-web` et
`smartsms-frontend`.

## Conséquences

- Serveur Node requis en production (le proxy l'impose) — `next.config.ts`
  déclare `output: "standalone"` pour une image Docker éventuelle ; voir
  ADR-0003 pour la nuance opérationnelle entre `next start` et
  `node .next/standalone/server.js`.
- Voir `darmeuble-kit/docs/frontend/socle-frontend.md` pour la stack
  complète et l'arborescence.

## Alternatives écartées

**React + Vite avec BFF séparé.** Coût opérationnel d'un service
supplémentaire. **Jeton en mémoire seule.** Perte de session à chaque
rechargement — inacceptable pour un usage réparti sur plusieurs jours
(suivi de bail, paiements récurrents).
