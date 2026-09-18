/**
 * Miroir de `OrganizationResponseDto` côté backend
 * (darmeuble-backend/src/modules/organizations/dto/organization-response.dto.ts).
 */
export interface OrganizationSummary {
  id: string;
  name: string;
  status: "trialing" | "active" | "suspended" | "cancelled";
  trialEndsAt: string | null;
  createdAt: string;
}
