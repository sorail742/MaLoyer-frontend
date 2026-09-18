import type { ReactNode } from "react";
import { TenantShell } from "@/components/layout/TenantShell";
import { redirectUnlessRole } from "@/lib/auth/require-role";

export default async function TenantGroupLayout({
  children,
}: {
  children: ReactNode;
}) {
  await redirectUnlessRole(["tenant"]);
  return <TenantShell>{children}</TenantShell>;
}
