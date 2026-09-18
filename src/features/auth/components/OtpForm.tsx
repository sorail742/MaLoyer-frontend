"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ApiError } from "@/lib/api/types";
import { useOtpRequest } from "../api/use-otp-request";
import { useOtpVerify } from "../api/use-otp-verify";
import {
  otpRequestSchema,
  otpVerifySchema,
  type OtpRequestInput,
  type OtpVerifyInput,
} from "../schemas/otp.schema";

/**
 * Connexion locataire — téléphone + OTP SMS
 * (darmeuble-kit/docs/backend/socle-backend.md §5), en deux étapes : la
 * demande de code ne révèle jamais si le numéro correspond à un compte
 * réel (voir darmeuble-backend AuthService.requestOtp) — ce formulaire
 * avance donc à l'étape suivante sur toute réponse réussie, sans
 * distinguer "compte trouvé" de "compte inconnu".
 */
export function OtpForm() {
  const router = useRouter();
  const [phone, setPhone] = useState<string | null>(null);
  const requestOtp = useOtpRequest();
  const verifyOtp = useOtpVerify();

  const requestForm = useForm<OtpRequestInput>({
    resolver: zodResolver(otpRequestSchema),
    defaultValues: { phone: "" },
  });
  const verifyForm = useForm<OtpVerifyInput>({
    resolver: zodResolver(otpVerifySchema),
    defaultValues: { phone: "", code: "" },
  });

  async function onRequest(values: OtpRequestInput): Promise<void> {
    try {
      const result = await requestOtp.mutateAsync(values);
      toast.success(result.message);
      verifyForm.setValue("phone", values.phone);
      setPhone(values.phone);
    } catch (error) {
      toast.error(
        error instanceof ApiError ? error.message : "Envoi du code impossible.",
      );
    }
  }

  async function onVerify(values: OtpVerifyInput): Promise<void> {
    try {
      await verifyOtp.mutateAsync(values);
      router.push("/my-lease");
      router.refresh();
    } catch (error) {
      toast.error(error instanceof ApiError ? error.message : "Code invalide.");
    }
  }

  if (!phone) {
    return (
      <Form {...requestForm}>
        <form
          onSubmit={(event) => void requestForm.handleSubmit(onRequest)(event)}
          className="space-y-4"
        >
          <FormField
            control={requestForm.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Numéro de téléphone</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    placeholder="+224620000000"
                    autoComplete="tel"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full"
            disabled={requestOtp.isPending}
          >
            {requestOtp.isPending ? "Envoi…" : "Recevoir un code par SMS"}
          </Button>
        </form>
      </Form>
    );
  }

  return (
    <Form {...verifyForm}>
      <form
        onSubmit={(event) => void verifyForm.handleSubmit(onVerify)(event)}
        className="space-y-4"
      >
        <p className="text-muted-foreground text-sm">
          Code envoyé au {phone}.{" "}
          <button
            type="button"
            className="text-primary underline underline-offset-4"
            onClick={() => setPhone(null)}
          >
            Changer de numéro
          </button>
        </p>
        <FormField
          control={verifyForm.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Code reçu par SMS</FormLabel>
              <FormControl>
                <Input
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={verifyOtp.isPending}>
          {verifyOtp.isPending ? "Vérification…" : "Valider"}
        </Button>
      </form>
    </Form>
  );
}
