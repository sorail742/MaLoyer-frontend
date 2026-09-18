"use client";

import { useState, type ReactNode } from "react";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { EmptyState } from "./EmptyState";

/**
 * Tableau générique — pagination côté client sur la page déjà chargée
 * (le backend pagine côté serveur via `PaginationQueryDto`, voir
 * darmeuble-kit/docs/frontend/contrat-api.md ; ce composant pagine en plus
 * la page reçue si elle dépasse `pageSize`, ce qui n'arrive pas tant que
 * `limit` API ≤ `pageSize`). Cartes sous `md`, contenu spécifique au
 * domaine consommateur — voir darmeuble-kit/docs/frontend/design-system.md §5.
 */
export interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  getRowId: (row: T) => string;
  renderCard: (row: T) => ReactNode;
  pageSize?: number;
  empty?: ReactNode;
}

export function DataTable<T>({
  data,
  columns,
  getRowId,
  renderCard,
  pageSize = 20,
  empty,
}: DataTableProps<T>) {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize });

  const table = useReactTable({
    data,
    columns,
    state: { pagination },
    onPaginationChange: setPagination,
    getRowId: (row) => getRowId(row),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (data.length === 0) {
    return <>{empty ?? <EmptyState />}</>;
  }

  return (
    <div className="space-y-4">
      {/* Cartes — sous md */}
      <div className="space-y-3 md:hidden">
        {table.getRowModel().rows.map((row) => (
          <div key={row.id}>{renderCard(row.original)}</div>
        ))}
      </div>

      {/* Tableau réel — md et plus */}
      <div className="hidden overflow-x-auto rounded-lg border md:block">
        <Table className="text-sm">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {table.getPageCount() > 1 ? (
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            Page {table.getState().pagination.pageIndex + 1} sur{" "}
            {table.getPageCount()}
          </span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Précédent
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Suivant
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
