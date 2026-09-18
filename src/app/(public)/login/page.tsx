import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoginForm } from "@/features/auth/components/LoginForm";

/**
 * Connexion propriétaire / gestionnaire / comptable / super admin —
 * darmeuble-kit/docs/backend/socle-backend.md §5.
 */
export default function LoginPage() {
  return (
    <main className="flex min-h-svh items-center justify-center p-6">
      <Card className="w-full max-w-(--content-form)">
        <CardHeader>
          <CardTitle>Connexion</CardTitle>
          <CardDescription>
            Propriétaire, gestionnaire, comptable ou super administrateur.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <LoginForm />
          <p className="text-muted-foreground text-center text-sm">
            Locataire ?{" "}
            <Link
              href="/otp"
              className="text-primary underline underline-offset-4"
            >
              Connexion par téléphone
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
