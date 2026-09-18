import { redirect } from "next/navigation";
import { decoderPayloadUtile } from "./jwt";
import type { Role } from "./permissions";
import { lireAccessToken } from "./session";

/**
 * Défense en profondeur côté layout serveur — pas une vérification de
 * sécurité (voir darmeuble-kit/docs/frontend/testing.md :
 * "ne remplace pas le filtre backend, mais ne doit pas non plus supposer
 * qu'il est toujours correct"). Empêche un locataire connecté de se
 * retrouver dans l'espace organisation (ou l'inverse) par navigation
 * directe — chaque appel réel reste de toute façon vérifié par le backend.
 * Le rôle est décodé sans vérification de signature (voir jwt.ts) : un
 * jeton falsifié ne peut jamais élargir un accès ici, seulement rediriger
 * vers la mauvaise page côté UI, ce qu'un appel API refuserait de toute
 * façon.
 */
export async function redirectUnlessRole(
  roles: readonly Role[],
): Promise<void> {
  const accessToken = await lireAccessToken();
  const { role } = decoderPayloadUtile(accessToken);
  if (!role || !roles.includes(role)) {
    redirect("/");
  }
}
