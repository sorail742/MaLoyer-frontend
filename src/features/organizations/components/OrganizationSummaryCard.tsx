"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AsyncBoundary } from "@/components/shared/AsyncBoundary";
import { useOrganization } from "../api/use-organization";

const LABEL_STATUT: Record<string, string> = {
  trialing: "Période d'essai",
  active: "Actif",
  suspended: "Suspendu",
  cancelled: "Résilié",
};

export function OrganizationSummaryCard() {
  const query = useOrganization();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mon organisation</CardTitle>
      </CardHeader>
      <CardContent>
        <AsyncBoundary
          query={query}
          skeleton={<Skeleton className="h-16 w-full" />}
        >
          {(organization) => (
            <div className="flex items-center justify-between">
              <span className="font-medium">{organization.name}</span>
              <Badge variant="secondary">
                {LABEL_STATUT[organization.status] ?? organization.status}
              </Badge>
            </div>
          )}
        </AsyncBoundary>
      </CardContent>
    </Card>
  );
}
