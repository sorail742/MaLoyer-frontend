import { z } from "zod";

export const otpRequestSchema = z.object({
  phone: z
    .string()
    .min(8, "Numéro de téléphone invalide.")
    .regex(
      /^\+?[0-9]{8,15}$/,
      "Numéro de téléphone invalide (ex. +224620000000).",
    ),
});

export type OtpRequestInput = z.infer<typeof otpRequestSchema>;

export const otpVerifySchema = z.object({
  phone: otpRequestSchema.shape.phone,
  code: z.string().min(4, "Code invalide.").max(8, "Code invalide."),
});

export type OtpVerifyInput = z.infer<typeof otpVerifySchema>;
