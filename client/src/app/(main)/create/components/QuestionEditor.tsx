"use client"

import { QUESTION_TYPE_LABELS } from "@/types/quiz/quiz-types"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"
import { Check, ImagePlus, Clock, Zap, X, ArrowLeft } from "lucide-react"
import { useRef, useCallback } from "react"
import { selectQuestions, selectSelectedQuestionId } from "@/stores/create-quizz/createQuizz.selectors"
import { useSelector, useDispatch } from "react-redux"
import { setCorrectAnswer, setField, setSelectedQuestion, updateOption, updateQuestion } from "@/stores/create-quizz/createQuizz.slice"

const ANSWER_COLORS = [
  "bg-answer-a hover:bg-answer-a/90",
  "bg-answer-b hover:bg-answer-b/90",
  "bg-answer-c hover:bg-answer-c/90",
  "bg-answer-d hover:bg-answer-d/90",
]

const ANSWER_LABELS = ["A", "B", "C", "D"]

export function QuestionEditor() {
  const dispatch = useDispatch()
  const questions = useSelector(selectQuestions)
  const selectedQuestionId = useSelector(selectSelectedQuestionId)
  const imageInputRef = useRef<HTMLInputElement>(null)

  const question = questions.find((q) => q.id === selectedQuestionId)

  const handleQuestionImageUpload = useCallback(
    (file: File) => {
      if (!question) return
      const url = URL.createObjectURL(file)
      dispatch(updateQuestion({ questionId: question.id, updates: { imageUrl: url } }))
    },
    [dispatch, question]
  )

  if (!question) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted mb-4">
          <ArrowLeft className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-1">Select a question</h3>
        <p className="text-sm text-muted-foreground max-w-xs">
          Click on a question from the list to edit it here.
        </p>
      </div>
    )
  }

  const qIndex = questions.findIndex((q) => q.id === question.id)

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => dispatch(setSelectedQuestion(null))}
          className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
          aria-label="Back to question list"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground text-xs font-bold">
              {qIndex + 1}
            </span>
            <span className="text-sm font-medium text-muted-foreground">
              {QUESTION_TYPE_LABELS[question.type]}
            </span>
          </div>
        </div>
      </div>

      {/* Question image */}
      <div>
        <button
          type="button"
          onClick={() => imageInputRef.current?.click()}
          className={cn(
            "w-full rounded-2xl border-2 border-dashed transition-all overflow-hidden",
            question.imageUrl
              ? "border-primary/20 h-40 md:h-52"
              : "border-border hover:border-primary/40 h-32 md:h-40"
          )}
        >
          {question.imageUrl ? (
            <div className="relative w-full h-full group">
              <img
                src={question.imageUrl || "/placeholder.svg"}
                alt="Question"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-foreground/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-sm font-medium text-background">Change Image</span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  dispatch(updateQuestion({ questionId: question.id, updates: { imageUrl: undefined } }))
                }}
                className="absolute top-2 right-2 p-1.5 rounded-lg bg-foreground/60 text-background hover:bg-foreground/80 transition-colors"
                aria-label="Remove image"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full gap-2 text-muted-foreground">
              <ImagePlus className="h-6 w-6" />
              <span className="text-xs font-medium">Add question image (optional)</span>
            </div>
          )}
        </button>
        <input
          ref={imageInputRef}
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) handleQuestionImageUpload(file)
          }}
        />
      </div>

      {/* Question text */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="question-text" className="text-sm font-semibold text-foreground">
          Question
        </Label>
        {question.type === "fill-blank" ? (
          <div className="flex flex-col gap-1">
            <Textarea
              id="question-text"
              placeholder="Type your question... Use ___ to indicate the blank."
              value={question.text}
              onChange={(e) =>
                dispatch(updateQuestion({
                  questionId: question.id,
                  updates: { text: e.target.value },
                }))
              }
              className="min-h-[80px] rounded-xl text-base resize-none"
            />
            <p className="text-xs text-muted-foreground">
              Use three underscores (___) where the blank should appear.
            </p>
          </div>
        ) : (
          <Textarea
            id="question-text"
            placeholder="Type your question here..."
            value={question.text}
            onChange={(e) =>
              dispatch(updateQuestion({
                questionId: question.id,
                updates: { text: e.target.value },
              }))
            }
            className="min-h-[80px] rounded-xl text-base resize-none"
          />
        )}
      </div>

      {/* Answer options */}
      <div className="flex flex-col gap-3">
        <Label className="text-sm font-semibold text-foreground">
          {question.type === "fill-blank" ? "Correct Answer" : "Answer Options"}
        </Label>

        {question.type === "fill-blank" ? (
          <Input
            placeholder="Type the correct answer..."
            value={question.options[0]?.text || ""}
            onChange={(e) => {
              if (question.options[0]) {
                dispatch(updateOption({
                  questionId: question.id,
                  optionId: question.options[0].id,
                  text: e.target.value,
                }))
              }
            }}
            className="h-12 rounded-xl text-base"
          />
        ) : (
          <div className="grid grid-cols-1 gap-3">
            {question.options.map((option, optIndex) => (
              <div
                key={option.id}
                className={cn(
                  "relative flex items-center gap-3 rounded-xl p-3 md:p-4 transition-all",
                  ANSWER_COLORS[optIndex % 4]
                )}
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-background/20 text-sm font-bold text-background">
                  {ANSWER_LABELS[optIndex]}
                </span>
                <input
                  type="text"
                  placeholder={`Option ${ANSWER_LABELS[optIndex]}`}
                  value={option.text}
                  onChange={(e) =>
                    dispatch(updateOption({
                      questionId: question.id,
                      optionId: option.id,
                      text: e.target.value,
                    }))
                  }
                  className="flex-1 bg-transparent text-background placeholder:text-background/60 text-sm font-medium border-none outline-none"
                />
                <button
                  type="button"
                  onClick={() =>
                    dispatch(setCorrectAnswer({
                      questionId: question.id,
                      optionId: option.id,
                    }))
                  }
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-all",
                    option.isCorrect
                      ? "bg-background text-answer-b shadow-sm"
                      : "bg-background/20 text-background/60 hover:bg-background/30"
                  )}
                  aria-label={option.isCorrect ? "Correct answer" : "Mark as correct"}
                >
                  <Check className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Time & Points */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            <Label className="text-xs font-semibold text-foreground">Time Limit</Label>
          </div>
          <Slider
            value={[question.timeLimit]}
            onValueChange={([v]) =>
              dispatch(updateQuestion({
                questionId: question.id,
                updates: { timeLimit: v },
              }))
            }
            min={5}
            max={120}
            step={5}
          />
          <span className="text-sm font-semibold text-primary">{question.timeLimit}s</span>
        </div>
        <div className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-accent" />
            <Label className="text-xs font-semibold text-foreground">Points</Label>
          </div>
          <Slider
            value={[question.points]}
            onValueChange={([v]) =>
              dispatch(updateQuestion({
                questionId: question.id,
                updates: { points: v },
              }))
            }
            min={5}
            max={50}
            step={5}
          />
          <span className="text-sm font-semibold text-accent">{question.points}pts</span>
        </div>
      </div>
    </div>
  )
}
