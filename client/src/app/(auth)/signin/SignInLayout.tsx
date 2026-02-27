"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  loginSchema,
  LoginFormValues,
} from "@/features/auth/schemas/auth.schema";
import FieldError from "@/features/auth/components/FieldError";
import { useLoginMutation } from "@/stores/api/auth.api";
import { ApiResponse } from "@/types/api/base-response.type";
import { useRouter } from "next/navigation";

export default function SignInLayout() {
  const [showPassword, setShowPassword] = useState(false);
  const [login, { isLoading, isSuccess, error }] = useLoginMutation();
  const router = useRouter();
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (values: LoginFormValues) => {
    login(values);
    if (isSuccess) {
      router.refresh();
      router.push(`/home`);
    }
  };

  useEffect(() => {
    if (!error || !("data" in error)) return;
    const apiError = error.data as ApiResponse<null>;
    form.setError("root", {
      message: apiError.message,
    });
  }, [error, form]);

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="text-center">
        <h1 className="text-2xl font-semibold md:text-3xl">
          Hello there, welcome back!
        </h1>
        <p className="mt-2 text-muted-foreground">
          Please enter your email address and password.
        </p>
      </div>

      {/* FORM */}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Show root error if present */}
        {form.formState.errors.root && (
          <div className="mb-4 rounded-lg bg-red-50 border border-red-200 shadow-md p-3 flex items-center gap-2">
            <svg
              className="w-5 h-5 text-red-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-sm text-red-700 font-medium">
              {form.formState.errors.root.message}
            </span>
          </div>
        )}

        <div className="space-y-2">
          <Label>Email</Label>
          <Input
            type="email"
            {...form.register("email")}
            placeholder="andrew@yourdomain.com"
            className="h-12"
          />
          {form.formState.errors.email && (
            <FieldError message={form.formState.errors.email.message} />
          )}
        </div>

        <div className="space-y-2">
          <Label>Password</Label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              {...form.register("password")}
              className="h-12 pr-12"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2"
              onClick={() => setShowPassword((v) => !v)}
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </Button>
          </div>

          {form.formState.errors.password && (
            <FieldError message={form.formState.errors.password.message} />
          )}
        </div>

        <div className="flex items-center gap-2">
          <Checkbox id="remember" />
          <Label htmlFor="remember" className="text-sm font-normal">
            Remember me
          </Label>
        </div>

        <Button type="submit" className="h-12 w-full" disabled={isLoading}>
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Signing in...
            </span>
          ) : (
            "Sign In"
          )}
        </Button>
      </form>
    </div>
  );
}
