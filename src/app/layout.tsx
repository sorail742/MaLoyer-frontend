import type { Metadata } from "next";
import type { ReactNode } from "react";
import { JetBrains_Mono, Manrope } from "next/font/google";
import { Providers } from "./providers";
import { lireAccessToken } from "@/lib/auth/session";
import { decoderPayloadUtile } from "@/lib/auth/jwt";
import "./globals.css";

/**
 * Manrope (interface) + JetBrains Mono (téléphones, références de paiement
 * Djomy, numéros de bail, montants GNF) — voir
 * darmeuble-kit/docs/frontend/design-system.md §1 : éviter Inter
 * (smartsms) et Source Sans 3 (Oumra-hadj) pour rester visuellement
 * distinct des deux projets frères de l'équipe. JetBrains Mono distingue
 * clairement `0`/`O` et `1`/`l`.
 */
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-app-sans",
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-app-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DarMeuble",
  description: "Gestion locative d'immeubles — immeubles, baux, paiements.",
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const accessToken = await lireAccessToken();
  const { role, userId } = decoderPayloadUtile(accessToken);

  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${manrope.variable} ${jetBrainsMono.variable} antialiased`}
      >
        <Providers role={role} userId={userId}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
