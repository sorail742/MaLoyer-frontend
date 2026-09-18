import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api/client";
import type { UserSummary } from "@/features/users/types";
import type { LoginInput } from "../schemas/login.schema";

interface LoginResult {
  user: UserSummary;
}

/**
 * `POST /api/auth/login` — route dédiée (pas le proxy générique), voir
 * `src/app/api/auth/login/route.ts`. Le cookie d'accès est posé
 * côté serveur par cette route ; ce hook n'a jamais accès au jeton
 * lui-même.
 */
export function useLogin() {
  return useMutation({
    mutationFn: (input: LoginInput) =>
      api.post<LoginResult>("/api/auth/login", input),
  });
}
