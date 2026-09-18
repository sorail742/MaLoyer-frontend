"use client";

import { useState, type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import { RoleProvider } from "@/lib/auth/role-context";
import type { Role } from "@/lib/auth/permissions";

/** Providers globaux — Query, thème, toasts, rôle courant. */
export function Providers({
  role,
  userId,
  children,
}: {
  role: Role | undefined;
  userId: string | undefined;
  children: ReactNode;
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 30_000,
            retry: 1,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <RoleProvider role={role} userId={userId}>
          {children}
          <Toaster richColors position="top-right" />
        </RoleProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
