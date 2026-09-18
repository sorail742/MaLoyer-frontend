"use client";

import { useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AsyncBoundary } from "@/components/shared/AsyncBoundary";
import { DataTable } from "@/components/shared/DataTable";
import { EmptyState } from "@/components/shared/EmptyState";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { useUsers } from "../api/use-users";
import type { UserSummary } from "../types";

const LABEL_ROLE: Record<UserSummary["role"], string> = {
  super_admin: "Super administrateur",
  owner: "Propriétaire",
  manager: "Gestionnaire",
  accountant: "Comptable",
  tenant: "Locataire",
};

const columns: ColumnDef<UserSummary>[] = [
  { accessorKey: "fullName", header: "Nom" },
  {
    id: "contact",
    header: "Contact",
    cell: ({ row }) => row.original.email ?? row.original.phone ?? "—",
  },
  {
    accessorKey: "role",
    header: "Rôle",
    cell: ({ row }) => (
      <Badge variant="outline">{LABEL_ROLE[row.original.role]}</Badge>
    ),
  },
  {
    accessorKey: "isActive",
    header: "Statut",
    cell: ({ row }) => (
      <Badge variant={row.original.isActive ? "secondary" : "destructive"}>
        {row.original.isActive ? "Actif" : "Désactivé"}
      </Badge>
    ),
  },
];

function UserCard({ user }: { user: UserSummary }) {
  return (
    <div className="space-y-1 rounded-lg border p-3 text-sm">
      <div className="flex items-center justify-between">
        <span className="font-medium">{user.fullName}</span>
        <Badge variant="outline">{LABEL_ROLE[user.role]}</Badge>
      </div>
      <p className="text-muted-foreground">{user.email ?? user.phone ?? "—"}</p>
    </div>
  );
}

/** `GET /api/users` — réservé au rôle `owner` (voir UsersController). */
export function UsersTable() {
  const [page, setPage] = useState(1);
  const query = useUsers({ page, limit: 20 });

  return (
    <AsyncBoundary
      query={query}
      skeleton={<TableSkeleton />}
      isEmpty={(page) => page.items.length === 0}
      empty={
        <EmptyState
          title="Aucun membre pour l'instant"
          description="Les comptes gestionnaire et comptable apparaîtront ici une fois invités."
        />
      }
    >
      {(donnees) => (
        <div className="space-y-4">
          <DataTable
            data={donnees.items}
            columns={columns}
            getRowId={(user) => user.id}
            renderCard={(user) => <UserCard user={user} />}
          />
          {donnees.totalPages > 1 ? (
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                Page {page} sur {donnees.totalPages}
              </span>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => p - 1)}
                >
                  Précédent
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page >= donnees.totalPages}
                  onClick={() => setPage((p) => p + 1)}
                >
                  Suivant
                </Button>
              </div>
            </div>
          ) : null}
        </div>
      )}
    </AsyncBoundary>
  );
}
