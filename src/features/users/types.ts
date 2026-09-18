import type { Role } from "@/lib/auth/permissions";

/**
 * Miroir de `UserResponseDto` côté backend
 * (darmeuble-backend/src/modules/users/dto/user-response.dto.ts) — à
 * garder synchronisé avec lui, c'est la source de vérité réelle.
 */
export interface UserSummary {
  id: string;
  organizationId: string | null;
  fullName: string;
  email: string | null;
  phone: string | null;
  role: Role;
  isActive: boolean;
  createdAt: string;
}
