"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";

/**
 * `POST /api/auth/logout` — route dédiée (voir
 * `src/app/api/auth/logout/route.ts`) qui révoque la session côté backend
 * et efface le cookie d'accès posé par ce frontend.
 */
export function LogoutButton() {
  const router = useRouter();
  const [enCours, setEnCours] = useState(false);

  async function seDeconnecter(): Promise<void> {
    setEnCours(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } finally {
      router.push("/");
      router.refresh();
    }
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      disabled={enCours}
      onClick={() => void seDeconnecter()}
    >
      Se déconnecter
    </Button>
  );
}
