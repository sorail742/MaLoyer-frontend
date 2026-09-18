import type { ReactNode } from "react";
import { OrganizationShell } from "@/components/layout/OrganizationShell";
import { redirectUnlessRole } from "@/lib/auth/require-role";

export default async function OrganizationGroupLayout({
  children,
}: {
  children: ReactNode;
}) {
  await redirectUnlessRole(["owner", "manager", "accountant"]);
  return <OrganizationShell>{children}</OrganizationShell>;
}
