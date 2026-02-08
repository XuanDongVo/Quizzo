'use client';

import { ArrowLeft } from 'lucide-react';
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

export default function ProgressBar({
  step,
  totalSteps,
  onClickBack,
}: {
  step: number;
  totalSteps: number;
  onClickBack: () => void;
}) {

  return (
    <div className="flex items-center gap-2 mb-6  justify-center">
      {step > 1 && (
        <button
          className="flex items-center justify-center w-10 h-10 rounded-full
                     text-gray-700 hover:text-indigo-600 transition"
          onClick={onClickBack}
          aria-label="Back"
          type="button"
        >
          <ArrowLeft size={20} strokeWidth={2} />
        </button>
      )}

    <div className="flex items-center justify-center gap-2">
      {Array.from({ length: totalSteps }, (_, i) => {
        const stepNumber = i + 1
        const isCompleted = stepNumber < step
        const isCurrent = stepNumber === step

        return (
          <div key={stepNumber} className="flex items-center gap-2">
            <div
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium transition-all",
                isCompleted && "bg-primary text-primary-foreground",
                isCurrent && "bg-primary text-primary-foreground ring-4 ring-primary/20",
                !isCompleted && !isCurrent && "bg-muted text-muted-foreground"
              )}
            >
              {isCompleted ? <Check className="h-5 w-5" /> : stepNumber}
            </div>
            {stepNumber < totalSteps && (
              <div
                className={cn(
                  "h-1 w-12 rounded-full transition-all",
                  stepNumber < step ? "bg-primary" : "bg-muted"
                )}
              />
            )}
          </div>
        )
      })}
    </div>
    </div>
  );
}
