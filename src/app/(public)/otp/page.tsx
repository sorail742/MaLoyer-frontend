import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { OtpForm } from "@/features/auth/components/OtpForm";

/**
 * Connexion locataire — téléphone + OTP SMS,
 * darmeuble-kit/docs/backend/socle-backend.md §5.
 */
export default function OtpPage() {
  return (
    <main className="flex min-h-svh items-center justify-center p-6">
      <Card className="w-full max-w-(--content-form)">
        <CardHeader>
          <CardTitle>Connexion locataire</CardTitle>
          <CardDescription>
            Recevez un code par SMS pour vous connecter.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <OtpForm />
          <p className="text-muted-foreground text-center text-sm">
            Propriétaire ou gestionnaire ?{" "}
            <Link
              href="/login"
              className="text-primary underline underline-offset-4"
            >
              Connexion par email
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
