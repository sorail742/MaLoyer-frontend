import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api/client";
import type { UserSummary } from "@/features/users/types";
import type { OtpVerifyInput } from "../schemas/otp.schema";

interface OtpVerifyResult {
  user: UserSummary;
}

/**
 * `POST /api/auth/otp/verify` — route dédiée, voir
 * `src/app/api/auth/otp/verify/route.ts` (même raisonnement que
 * use-login.ts : émet un nouveau jeton).
 */
export function useOtpVerify() {
  return useMutation({
    mutationFn: (input: OtpVerifyInput) =>
      api.post<OtpVerifyResult>("/api/auth/otp/verify", input),
  });
}
