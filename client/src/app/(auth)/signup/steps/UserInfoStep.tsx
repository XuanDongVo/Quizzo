'use client'

import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signupSchema, SignupFormValues } from '@/features/auth/schemas/auth.schema'
import FieldError from '@/features/auth/components/FieldError'
import { useRegisterMutation, useCheckUserNameAvailabilityQuery } from '@/stores/auth/auth.api'
import { useRouter } from 'next/dist/client/components/navigation'
import { ApiResponse } from '@/types/api/base-response.type';


export default function UserInfoStep() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [username, setUsername] = useState('')

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  })

  const [register, { isLoading, isSuccess, error }] =
    useRegisterMutation()

  useEffect(() => {
    if (isSuccess) router.push('/signin')
  }, [isSuccess, router])

  useEffect(() => {
    if (!error || !('data' in error)) return

    const apiError = error.data as ApiResponse<null>

    if (apiError.errors?.length) {
      apiError.errors.forEach(err => {
        form.setError(err.field as keyof SignupFormValues, {
          message: err.message,
        })
      })
    } else {
      form.setError('root', {
        message: apiError.message,
      })
    }
  }, [error, form])

  const { data: usernameCheck, isFetching } =
    useCheckUserNameAvailabilityQuery(
      { username },
      { skip: !username }
    )

  useEffect(() => {
    if (!usernameCheck) return

    if (!usernameCheck.success && usernameCheck.errors) {
      usernameCheck.errors.forEach(err => {
        form.setError(err.field as keyof SignupFormValues, {
          message: err.message,
        })
      })
    } else {
      form.clearErrors('name')
    }
  }, [usernameCheck, form])

  const onSubmit = async (values: SignupFormValues) => {
    await register(values)
  }


  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="text-center">
        <h1 className="text-2xl font-semibold md:text-3xl">
          Create an account
        </h1>
        <p className="mt-2 text-muted-foreground">
          Please enter your username, email address and password.
        </p>
      </div>

      {/* FORM */}
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        {/* Show root error if present */}
        {form.formState.errors.root && (
          <div className="mb-4 rounded-lg bg-red-50 border border-red-200 shadow-md p-3 flex items-center gap-2">
            <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm text-red-700 font-medium">{form.formState.errors.root.message}</span>
          </div>
        )}

        <div className="space-y-2">
          <Label>Username</Label>
          <Input
            {...form.register('name', {
              onBlur: e => setUsername(e.target.value),
            })}
            placeholder="andrew_ainsley"
            className="h-12"
          />

          {form.formState.errors.name && (
            <FieldError message={form.formState.errors.name.message} />
          )}
        </div>

        <div className="space-y-2">
          <Label>Email</Label>
          <Input
            type="email"
            {...form.register('email')}
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
              type={showPassword ? 'text' : 'password'}
              {...form.register('password')}
              className="h-12 pr-12"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2"
              onClick={() => setShowPassword(v => !v)}
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

        <Button
          type="submit"
          className="h-12 w-full"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Creating account...
            </span>
          ) : (
            'Sign up'
          )}
        </Button>

      </form>

      {/* ===== DIVIDER ===== */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            or continue with
          </span>
        </div>
      </div>

      {/* ===== GOOGLE LOGIN ===== */}
      <Button
        variant="outline"
        className="h-12 w-full gap-2 bg-transparent"
        onClick={() => {
        }}
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
        </svg>
        Continue with Google
      </Button>
    </div>
  );
}
