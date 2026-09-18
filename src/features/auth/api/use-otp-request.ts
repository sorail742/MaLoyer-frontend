import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api/client";
import type { OtpRequestInput } from "../schemas/otp.schema";

interface OtpRequestResult {
  message: string;
}

/**
 * `POST /api/auth/otp/request` — n'émet aucun jeton, passe donc par le
 * proxy générique (`app/api/[...chemin]`), pas une route dédiée.
 */
export function useOtpRequest() {
  return useMutation({
    mutationFn: (input: OtpRequestInput) =>
      api.post<OtpRequestResult>("/api/auth/otp/request", input),
  });
}
