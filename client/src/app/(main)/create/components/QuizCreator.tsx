"use client"
import { useDispatch, useSelector } from "react-redux"
import {
  selectQuizz,
  selectCurrentStep,
  selectSelectedQuestionId,
} from "@/stores/create-quizz/createQuizz.selectors"
import {
  setCurrentStep,
  setSelectedQuestion,
} from "@/stores/create-quizz/createQuizz.slice"

import { QuizStepper } from "./QuizStepper"
import { QuizInfoStep } from "./QuizInfoStep"
import { QuestionBuilder } from "./QuestionBuilder"
import { QuestionEditor } from "./QuestionEditor"
import { QuizSettings } from "./QuizSettings"
import { QuizPreview } from "./QuizPreview"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Save } from "lucide-react"
import { cn } from "@/lib/utils"
import { useCreateQuizzMutation } from "@/stores/api/quizz.api"

export function QuizCreator() {
  const dispatch = useDispatch()

  const quiz = useSelector(selectQuizz)
  const currentStep = useSelector(selectCurrentStep)
  const selectedQuestionId = useSelector(selectSelectedQuestionId)

  const [createQuizz, sucess] = useCreateQuizzMutation(); 

  const totalSteps = 4

  const handleNext = async () => {
  // Nếu đang ở step 0 và chưa có quizId → tạo draft
  if (currentStep === 0 && !quiz.quizId) {
    try {
      const res = await createDraft({
        title: quiz.title,
        description: quiz.description,
      }).unwrap()

      dispatch(setQuizId(res.data.quizzId))

      dispatch(setCurrentStep(1))
    } catch (error) {
      console.error("Create draft failed", error)
    }

    return
  }

  // các step khác thì chỉ chuyển step
  dispatch(setCurrentStep(Math.min(totalSteps - 1, currentStep + 1)))
}


  const canGoNext = () => {
    switch (currentStep) {
      case 0:
        return quiz.title.trim().length > 0
      case 1:
        return quiz.questions.length > 0
      default:
        return true
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-border bg-card/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
          <h1 className="text-lg font-bold font-display text-foreground">Create Quiz</h1>
          <div className="flex items-center gap-2">
            <span className="hidden md:inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-answer-b animate-pulse" />
              Auto-saved
            </span>
            <Button variant="outline" size="sm" className="rounded-lg gap-1.5 bg-transparent">
              <Save className="h-3.5 w-3.5" />
              <span className="hidden md:inline">Save Draft</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Stepper */}
      <div className="mx-auto w-full max-w-6xl px-4 py-4 md:px-6 md:py-6">
        <QuizStepper
          currentStep={currentStep}
          onStepClick={(step) => dispatch(setCurrentStep(step))}
          canGoNext={canGoNext}
          questionCount={quiz.questions.length}
        />
      </div>

      {/* Main content area */}
      <main className="flex-1 mx-auto w-full max-w-6xl px-4 pb-32 md:px-6">
        {currentStep === 0 && <QuizInfoStep />}

        {currentStep === 1 && (
          <div className="flex gap-6">
            {/* Question list - sidebar on desktop, full width on mobile when no question selected */}
            <div
              className={cn(
                "w-full md:w-[360px] md:shrink-0 flex flex-col",
                selectedQuestionId ? "hidden md:flex" : "flex"
              )}
            >
              <QuestionBuilder />
            </div>

            {/* Question editor - full width on mobile, right panel on desktop */}
            <div
              className={cn(
                "flex-1 min-w-0",
                selectedQuestionId ? "flex flex-col" : "hidden md:flex md:flex-col"
              )}
            >
              <div className="rounded-2xl border border-border bg-card p-4 md:p-6">
                <QuestionEditor />
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && <QuizSettings />}

        {currentStep === 3 && <QuizPreview />}
      </main>

      {/* Bottom navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-border bg-card/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
          <Button
            variant="outline"
            onClick={() => {
              if (currentStep === 1 && selectedQuestionId) {
                dispatch(setSelectedQuestion(null))
              } else {
                dispatch(setCurrentStep(Math.max(0, currentStep - 1)))
              }
            }}
            disabled={currentStep === 0 && !selectedQuestionId}
            className="rounded-xl gap-1.5"
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </Button>

          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div
                key={`step-dot-${i}`}
                className={cn(
                  "h-1.5 rounded-full transition-all md:hidden",
                  i === currentStep ? "w-6 bg-primary" : "w-1.5 bg-border"
                )}
              />
            ))}
          </div>

          {currentStep < totalSteps - 1 ? (
            <Button
              onClick={() => dispatch(setCurrentStep(Math.min(totalSteps - 1, currentStep + 1)))}
              disabled={!canGoNext()}
              className="rounded-xl gap-1.5"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button className="rounded-xl gap-1.5 font-bold">
              Publish
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
