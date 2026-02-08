'use client';
import SignupFlow from './SignupFlow';
import ProgressBar from './ProgressBar';
import { RootState } from '@/stores';
import { useDispatch, useSelector } from 'react-redux';
import { previousStep } from '@/stores/auth/signup/signup.slice';


export default function SignupPage() {
  const step = useSelector((state: RootState) => state.signup.step);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-1">
      {/* Left side - Form */}
      <div className="flex w-full flex-col lg:w-3/5">
        <div className="flex flex-1 flex-col px-6 py-8 md:px-12 lg:px-16">
          {/* Step indicator */}
          {step < 4 && (
            <div className="mb-5">
              <ProgressBar step={step} totalSteps={3} onClickBack={() => dispatch(previousStep())} />
            </div>
          )}

          {/* Form content */}
          <div className="mx-auto flex w-full max-w-xl flex-1 flex-col justify-center">
            <SignupFlow />
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
            <h2 className="mb-4 text-3xl font-bold">Welcome!</h2>
            <p className="text-lg text-primary-foreground/80">
              Create your account and start your journey with us. We&apos;re excited to have you on board!
            </p>
          </div>

          {/* Decorative dots */}
          <div className="mt-12 flex gap-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`h-2 w-2 rounded-full ${i === step ? "bg-primary-foreground" : "bg-primary-foreground/30"
                  }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}