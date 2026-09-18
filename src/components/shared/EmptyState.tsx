import type { ReactNode } from "react";

/**
 * État « vide » d'un écran de données — voir
 * darmeuble-kit/docs/frontend/design-system.md § Écriture : propose
 * toujours l'étape suivante, ne se contente jamais de « Aucune donnée. ».
 * `title`/`description` par défaut sont génériques ; un écran réel passe
 * un titre et une action concrets plutôt que de garder ce repli.
 */
export interface EmptyStateProps {
  title?: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-2 py-12 text-center">
      <p className="text-sm font-medium">{title ?? "Aucune donnée."}</p>
      {description ? (
        <p className="text-muted-foreground max-w-sm text-sm">{description}</p>
      ) : null}
      {action}
    </div>
  );
}
