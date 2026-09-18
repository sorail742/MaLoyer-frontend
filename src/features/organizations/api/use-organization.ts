import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api/client";
import { keys } from "@/lib/api/query-keys";
import type { OrganizationSummary } from "../types";

/** `GET /api/organizations/me` — voir darmeuble-backend OrganizationsController. */
export function useOrganization() {
  return useQuery({
    queryKey: keys.organizations.me(),
    queryFn: () => api.get<OrganizationSummary>("/api/organizations/me"),
  });
}
