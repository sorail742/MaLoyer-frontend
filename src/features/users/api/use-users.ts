import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api/client";
import { keys } from "@/lib/api/query-keys";
import type { UserSummary } from "../types";

export interface UsersFilters {
  page: number;
  limit: number;
  [cle: string]: string | number | boolean | undefined;
}

/** `GET /api/users` — paginé, réservé au rôle `owner` (voir UsersController). */
export function useUsers(filters: UsersFilters) {
  return useQuery({
    queryKey: keys.users.list(filters),
    queryFn: () => api.getPage<UserSummary>("/api/users", filters),
  });
}
