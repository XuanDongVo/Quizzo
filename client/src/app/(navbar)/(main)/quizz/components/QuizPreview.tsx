"use client"

import { useState } from "react"
import { QUESTION_TYPE_LABELS } from "@/types/quiz/quiz-types"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Zap,
  Trophy,
  AlertCircle,
} from "lucide-react"
import { selectQuizz } from "@/stores/create-quizz/createQuizz.selectors"
import { useSelector, useDispatch } from "react-redux"

const PREVIEW_ANSWER_COLORS = [
  "bg-answer-a text-background",
  "bg-answer-b text-background",
  "bg-answer-c text-background",
  "bg-answer-d text-background",
]

const ANSWER_LABELS = ["A", "B", "C", "D"]

export function QuizPreview() {
  const dispatch = useDispatch()
  const quizz = useSelector(selectQuizz)
  const [previewIndex, setPreviewIndex] = useState(0)

  if (quizz.questions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center max-w-md mx-auto">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10 mb-4">
          <AlertCircle className="h-7 w-7 text-accent" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-1">No questions to preview</h3>
        <p className="text-sm text-muted-foreground">
          Go back to the Questions step and add at least one question to see a preview.
        </p>
      </div>
    )
  }

  const question = quizz.questions[previewIndex]
  const totalPoints = quizz.questions.reduce((sum, q) => sum + q.points, 0)

  return (
    <div className="flex flex-col gap-6 max-w-3xl mx-auto">
      {/* Quiz summary card */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        {quizz.coverImageUrl && (
          <div className="h-32 md:h-44 overflow-hidden">
            <img
              src={quizz.coverImageUrl || "/placeholder.svg"}
              alt="Quiz cover"
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="p-4 md:p-6">
          <h2 className="text-xl font-bold font-display text-foreground text-balance">
            {quizz.title || "Untitled Quiz"}
          </h2>
          {quizz.description && (
            <p className="text-sm text-muted-foreground mt-1 text-pretty">{quizz.description}</p>
          )}
          <div className="flex flex-wrap items-center gap-3 mt-3">
            {quizz.category && (
              <span className="inline-flex items-center rounded-lg bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                {quizz.category}
              </span>
            )}
            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
              <Trophy className="h-3.5 w-3.5" />
              {totalPoints} points
            </span>
            {/* <span className="inline-flex items-center gap-1 text-xs text-muted-foreground capitalize">
              {quizz.difficulty}
            </span> */}
            <span className="text-xs text-muted-foreground">
              {quizz.questions.length} question{quizz.questions.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
      </div>

      {/* Question preview */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        {/* Question header bar */}
        <div className="flex items-center justify-between bg-primary px-4 py-3 md:px-6">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-primary-foreground/80">
              Question {previewIndex + 1}/{quizz.questions.length}
            </span>
            <span className="rounded-md bg-primary-foreground/20 px-2 py-0.5 text-xs font-medium text-primary-foreground">
              {QUESTION_TYPE_LABELS[question.type]}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-xs text-primary-foreground/80">
              <Clock className="h-3.5 w-3.5" />
              {question.timeLimit}s
            </span>
            <span className="flex items-center gap-1 text-xs text-primary-foreground/80">
              <Zap className="h-3.5 w-3.5" />
              {question.points}pts
            </span>
          </div>
        </div>

        <div className="p-4 md:p-6 flex flex-col gap-5">
          {/* Question image */}
          {question.imageUrl && (
            <div className="rounded-xl overflow-hidden h-40 md:h-56">
              <img
                src={question.imageUrl || "/placeholder.svg"}
                alt="Question"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Question text */}
          <h3 className="text-lg md:text-xl font-semibold text-foreground text-balance">
            {question.text || "No question text"}
          </h3>

          {/* Answer options preview */}
          {question.type === "fill-blank" ? (
            <div className="rounded-xl border-2 border-dashed border-border bg-muted/30 p-4 text-center">
              <p className="text-sm text-muted-foreground">
                Answer: <span className="font-semibold text-foreground">{question.options[0]?.text || "___"}</span>
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {question.options.map((option, optIndex) => (
                <div
                  key={option.id}
                  className={cn(
                    "flex items-center gap-3 rounded-xl p-3 md:p-4 transition-all",
                    PREVIEW_ANSWER_COLORS[optIndex % 4]
                  )}
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-background/20 text-sm font-bold">
                    {ANSWER_LABELS[optIndex]}
                  </span>
                  <span className="flex-1 text-sm font-medium">
                    {option.text || `Option ${ANSWER_LABELS[optIndex]}`}
                  </span>
                  {option.isCorrect && (
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-background/30">
                      <Check className="h-3.5 w-3.5" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => setPreviewIndex((i) => Math.max(0, i - 1))}
          disabled={previewIndex === 0}
          className="rounded-xl"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Previous
        </Button>
        <div className="flex gap-1.5">
          {quizz.questions.map((_, i) => (
            <button
              key={quizz.questions[i].id}
              type="button"
              onClick={() => setPreviewIndex(i)}
              className={cn(
                "h-2 rounded-full transition-all",
                i === previewIndex ? "w-6 bg-primary" : "w-2 bg-border hover:bg-primary/30"
              )}
              aria-label={`Go to question ${i + 1}`}
            />
          ))}
        </div>
        <Button
          variant="outline"
          onClick={() => setPreviewIndex((i) => Math.min(quizz.questions.length - 1, i + 1))}
          disabled={previewIndex === quizz.questions.length - 1}
          className="rounded-xl"
        >
          Next
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>

      {/* Publish button */}
      <Button
        size="lg"
        className="w-full h-14 rounded-xl text-base font-bold shadow-lg"
      >
        Publish Quiz
      </Button>
    </div>
  )
}
