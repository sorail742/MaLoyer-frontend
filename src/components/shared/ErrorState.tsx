"use client";

import { Button } from "@/components/ui/button";

/**
 * État « erreur » d'un écran de données — message exploitable + bouton
 * Réessayer, voir darmeuble-kit/docs/frontend/design-system.md § Écriture.
 */
export interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
}

export function ErrorState({ title, description, onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center gap-3 py-12 text-center">
      <p className="text-sm font-medium">
        {title ?? "Une erreur est survenue."}
      </p>
      <p className="text-muted-foreground max-w-sm text-sm">
        {description ?? "Vérifiez votre connexion et réessayez."}
      </p>
      {onRetry ? (
        <Button variant="outline" size="sm" onClick={onRetry}>
          Réessayer
        </Button>
      ) : null}
    </div>
  );
}
