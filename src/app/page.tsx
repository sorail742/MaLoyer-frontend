import Link from "next/link";
import { Button } from "@/components/ui/button";

/**
 * Racine publique — deux parcours de connexion distincts (cahier des
 * charges §6.4, §9.2), pas un formulaire unique qui devine le rôle.
 */
export default function HomePage() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-8 p-6 text-center">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">DarMeuble</h1>
        <p className="text-muted-foreground max-w-sm text-sm">
          Plateforme de gestion locative d&apos;immeubles.
        </p>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button asChild size="lg">
          <Link href="/login">Propriétaire / gestionnaire</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/otp">Locataire</Link>
        </Button>
      </div>
    </main>
  );
}
