// Route dédiée : POST /api/auth/logout révoque la session côté backend
// (voir darmeuble-backend AuthController.logout, qui efface lui-même son
// cookie de refresh via Set-Cookie) et doit en plus effacer le cookie
// d'accès posé par CE frontend — le proxy générique ne le ferait pas
// puisque cette réponse ne contient pas de nouvel `accessToken` à traiter.
import { NextResponse } from "next/server";
import { PREFIXE_API_BACKEND, urlBackend } from "@/lib/api/backend";
import { effacerAccessTokenSur, lireAccessToken } from "@/lib/auth/session";

export async function POST(): Promise<Response> {
  const accessToken = await lireAccessToken();

  let reponseBackend: Response;
  try {
    reponseBackend = await fetch(
      `${urlBackend()}${PREFIXE_API_BACKEND}/auth/logout`,
      {
        method: "POST",
        headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
        cache: "no-store",
      },
    );
  } catch {
    // Le backend est injoignable : on efface quand même le cookie local,
    // se déconnecter ne doit jamais rester bloqué par une panne réseau.
    const relais = NextResponse.json({
      success: true,
      data: { message: "Déconnecté" },
      meta: {},
    });
    effacerAccessTokenSur(relais);
    return relais;
  }

  const corps: unknown = await reponseBackend.json().catch(() => null);
  const relais = NextResponse.json(corps, { status: reponseBackend.status });
  effacerAccessTokenSur(relais);
  for (const cookie of reponseBackend.headers.getSetCookie()) {
    relais.headers.append("set-cookie", cookie);
  }
  return relais;
}
