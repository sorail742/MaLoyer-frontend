"use client";

import type { ReactNode } from "react";
import { hasRole, type ModeCan, type Role } from "@/lib/auth/permissions";
import { useRole } from "@/lib/auth/role-context";

/**
 * Garde par rôle. **Ne remplace jamais une vérification backend** : un
 * contournement client-side ne donne jamais accès à une donnée que le
 * backend refuserait — voir darmeuble-kit/docs/backend/multi-tenant.md.
 */
export interface CanProps {
  role: Role | Role[];
  mode?: ModeCan;
  fallback?: ReactNode;
  children: ReactNode;
}

export function Can({
  role,
  mode = "any",
  fallback = null,
  children,
}: CanProps) {
  const roleActuel = useRole();
  return hasRole(roleActuel, role, mode) ? <>{children}</> : <>{fallback}</>;
}
