import type { ReactNode } from "react";
import { SuperAdminShell } from "@/components/layout/SuperAdminShell";
import { redirectUnlessRole } from "@/lib/auth/require-role";

export default async function SuperAdminGroupLayout({
  children,
}: {
  children: ReactNode;
}) {
  await redirectUnlessRole(["super_admin"]);
  return <SuperAdminShell>{children}</SuperAdminShell>;
}
