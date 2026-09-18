"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
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
import { useLogin } from "../api/use-login";
import { loginSchema, type LoginInput } from "../schemas/login.schema";

/**
 * Connexion propriétaire / gestionnaire / comptable / super admin — email +
 * mot de passe (darmeuble-kit/docs/backend/socle-backend.md §5). Le
 * locataire utilise `OtpForm` (téléphone + code SMS).
 */
export function LoginForm() {
  const router = useRouter();
  const login = useLogin();
  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(values: LoginInput): Promise<void> {
    try {
      const { user } = await login.mutateAsync(values);
      router.push(
        user.role === "super_admin" ? "/organizations" : "/dashboard",
      );
      router.refresh();
    } catch (error) {
      const message =
        error instanceof ApiError ? error.message : "Connexion impossible.";
      toast.error(message);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={(event) => void form.handleSubmit(onSubmit)(event)}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" autoComplete="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mot de passe</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  autoComplete="current-password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={login.isPending}>
          {login.isPending ? "Connexion…" : "Se connecter"}
        </Button>
      </form>
    </Form>
  );
}
