"use client"

import { cn } from "@/lib/utils"
import { Check, FileText, ListChecks, Settings, Eye } from "lucide-react"

const STEPS = [
  { label: "Quiz Info", icon: FileText },
  { label: "Questions", icon: ListChecks },
  { label: "Settings", icon: Settings },
  { label: "Preview", icon: Eye },
]

interface QuizStepperProps {
  currentStep: number
  onStepClick: (step: number) => void
  canGoNext: () => boolean
  questionCount: number
}

export function QuizStepper({ currentStep, onStepClick, canGoNext, questionCount }: QuizStepperProps) {

  const handleStepclick = (step: number) => {
    if (canGoNext()) {
      onStepClick(step)
    }
  }

  return (
    <nav aria-label="Quiz creation steps" className="w-full">
      {/* Desktop stepper */}
      <ol className="hidden md:flex items-center gap-2">
        {STEPS.map((step, index) => {
          const isComplete = index < currentStep
          const isCurrent = index === currentStep
          const Icon = step.icon

          return (
            <li key={step.label} className="flex items-center gap-2 flex-1">
              <button
                type="button"
                onClick={() => handleStepclick(index)}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all w-full",
                  isCurrent && "bg-primary text-primary-foreground shadow-md",
                  isComplete && "bg-secondary text-secondary-foreground",
                  !isCurrent && !isComplete && "bg-muted text-muted-foreground hover:bg-muted/80"
                )}
                aria-current={isCurrent ? "step" : undefined}
              >
                <span
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                    isCurrent && "bg-primary-foreground/20",
                    isComplete && "bg-primary/10",
                    !isCurrent && !isComplete && "bg-background/60"
                  )}
                >
                  {isComplete ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Icon className="h-4 w-4" />
                  )}
                </span>
                <span className="hidden lg:inline">{step.label}</span>
                {index === 1 && questionCount > 0 && (
                  <span
                    className={cn(
                      "ml-auto rounded-full px-2 py-0.5 text-xs font-bold",
                      isCurrent ? "bg-primary-foreground/20 text-primary-foreground" : "bg-primary/10 text-primary"
                    )}
                  >
                    {questionCount}
                  </span>
                )}
              </button>
              {index < STEPS.length - 1 && (
                <div
                  className={cn(
                    "hidden lg:block h-px w-6 shrink-0",
                    index < currentStep ? "bg-primary" : "bg-border"
                  )}
                />
              )}
            </li>
          )
        })}
      </ol>

      {/* Mobile stepper - compact pills */}
      <div className="flex md:hidden items-center gap-1.5 px-1">
        {STEPS.map((step, index) => {
          const isComplete = index < currentStep
          const isCurrent = index === currentStep

          return (
            <button
              key={step.label}
              type="button"
              onClick={() => onStepClick(index)}
              className={cn(
                "flex-1 h-1.5 rounded-full transition-all",
                isCurrent && "bg-primary",
                isComplete && "bg-primary/40",
                !isCurrent && !isComplete && "bg-border"
              )}
              aria-label={`Step ${index + 1}: ${step.label}`}
              aria-current={isCurrent ? "step" : undefined}
            />
          )
        })}
      </div>
      <div className="flex md:hidden items-center justify-between mt-2 px-1">
        <p className="text-sm font-semibold text-foreground">{STEPS[currentStep].label}</p>
        <p className="text-xs text-muted-foreground">
          Step {currentStep + 1} of {STEPS.length}
        </p>
      </div>
    </nav>
  )
}
