'use client';
import SignInLayout from './SignInLayout'

export default function SignInPage() {
    return (
        <div className="flex flex-1">
            {/* Left side - Form */}
            <div className="flex w-full flex-col lg:w-3/5">
                <div className="flex flex-1 flex-col px-6 py-8 md:px-12 lg:px-16">
                    <div className="mx-auto flex w-full max-w-xl flex-1 flex-col justify-center">
                        <SignInLayout />
                    </div>
                </div>
            </div>

            {/* Right side - Decorative */}
            <div className="hidden bg-primary lg:block lg:w-2/5">
                <div className="flex h-full flex-col items-center justify-center p-12 text-primary-foreground">
                    <div className="max-w-md text-center">
                        <div className="mb-8 flex justify-center">
                            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary-foreground/20">
                                <svg
                                    className="h-12 w-12 text-primary-foreground"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    />
                                </svg>
                            </div>
                        </div>

                        <h2 className="mb-4 text-3xl font-bold">
                            Welcome back!
                        </h2>

                        <p className="text-lg text-primary-foreground/80">
                            Sign in to continue and access your account.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
