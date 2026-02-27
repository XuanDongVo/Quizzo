"use client"

import React from "react"
import {
  addQuestion,
  deleteQuestion,
  reorderQuestions,
  setSelectedQuestion,
} from "@/stores/create-quizz/createQuizz.slice"
import {
  selectQuestions,
  selectSelectedQuestionId,
} from "@/stores/create-quizz/createQuizz.selectors"
import { type QuestionType, QUESTION_TYPE_LABELS, QuestionStatus } from "@/types/quiz/quiz-types"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  Plus,
  GripVertical,
  Trash2,
  ToggleLeft,
  Type,
  ImageIcon,
  CopyCheck,
  AlertCircle,
  CheckCircle2
} from "lucide-react"
import { useCallback, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

const TYPE_ICONS: Record<QuestionType, typeof CheckCircle2> = {
  "single-choice": CheckCircle2,
  "multiple-choice": CopyCheck,
  "true-false": ToggleLeft,
  "fill-blank": Type,
}

const TYPE_COLORS: Record<QuestionType, string> = {
  "single-choice": "bg-primary/10 text-primary border-primary/20",
  "multiple-choice": "bg-primary/10 text-primary border-primary/20",
  "true-false": "bg-answer-b/10 text-answer-b border-answer-b/20",
  "fill-blank": "bg-accent/10 text-accent border-accent/20",
}

const STATUS_STYLES: Record<QuestionStatus, {
  badge: string
  border: string
  icon: typeof CheckCircle2
  label: string
}> = {
  draft: {
    badge: "bg-destructive/10 text-destructive border-destructive/20",
    border: "border-destructive/40",
    icon: AlertCircle,
    label: "Draft",
  },
  complete: {
    badge: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
    border: "border-emerald-500/40",
    icon: CheckCircle2,
    label: "Ready",
  },
}


export function QuestionBuilder() {
  const dispatch = useDispatch()
  const questions = useSelector(selectQuestions)
  const selectedQuestionId = useSelector(selectSelectedQuestionId)
  const [showTypePicker, setShowTypePicker] = useState(false)
  const [dragIndex, setDragIndex] = useState<number | null>(null)
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)

  const handleAddQuestion = (type: QuestionType) => {
    dispatch(addQuestion(type))
    setShowTypePicker(false)
  }


  const handleDragStart = useCallback((index: number) => {
    setDragIndex(index)
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent, index: number) => {
    e.preventDefault()
    setDragOverIndex(index)
  }, [])

  const handleDrop = useCallback(
    (toIndex: number) => {
      if (dragIndex !== null && dragIndex !== toIndex) {
        dispatch(reorderQuestions({ from: dragIndex, to: toIndex }))
      }
      setDragIndex(null)
      setDragOverIndex(null)
    },
    [dragIndex, dispatch]
  )

  return (
    <div className="flex flex-col gap-6">
      {/* Question list */}
      {questions.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 mb-4">
            <Plus className="h-7 w-7 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-1">No questions yet</h3>
          <p className="text-sm text-muted-foreground mb-6 max-w-xs">
            Start building your quiz by adding your first question below.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {questions.map((question, index) => {
            const Icon = TYPE_ICONS[question.type]
            const isSelected = selectedQuestionId === question.id
            const status = question.status
            const StatusIcon = STATUS_STYLES[status].icon
            return (
              <div
                key={question.id}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDrop={() => handleDrop(index)}
                onDragEnd={() => {
                  setDragIndex(null)
                  setDragOverIndex(null)
                }}
                className={cn(
                  "group flex items-center gap-3 rounded-xl border p-3 md:p-4 transition-all cursor-pointer",
                  isSelected
                    ? "border-primary bg-primary/5 shadow-sm"
                    : "border-border bg-card hover:border-primary/30 hover:shadow-sm",
                  STATUS_STYLES[status].border,
                  dragOverIndex === index && dragIndex !== index && "border-primary border-dashed bg-primary/5",
                  dragIndex === index && "opacity-50"
                )}
                onClick={() => dispatch(setSelectedQuestion(question.id))}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    dispatch(setSelectedQuestion(question.id))
                  }
                }}
              >
                {/* <div className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground">
                  <GripVertical className="h-5 w-5" />
                </div> */}
                <span
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold",
                    isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  )}
                >
                  {index + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {question.text || "Untitled question"}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-medium",
                        TYPE_COLORS[question.type]
                      )}
                    >
                      <Icon className="h-3 w-3" />
                      {QUESTION_TYPE_LABELS[question.type]}
                    </span>
                    <span className="text-xs text-muted-foreground">{question.points}pts</span>
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-semibold",
                        STATUS_STYLES[status].badge
                      )}
                    >
                      <StatusIcon className="h-3 w-3" />
                      {STATUS_STYLES[status].label}
                    </span>

                  </div>

                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    dispatch(deleteQuestion(question.id))
                    if (selectedQuestionId === question.id) {
                      dispatch(setSelectedQuestion(null))
                    }
                  }}
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive md:bg-destructive/10"
                  aria-label={`Delete question ${index + 1}`}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            )
          })}
        </div>
      )}

      {/* Add question */}
      {showTypePicker ? (
        <div className="rounded-2xl border border-border bg-card p-4 md:p-6">
          <p className="text-sm font-semibold text-foreground mb-4">Choose question type</p>
          <div className="grid grid-cols-2 gap-3">
            {(Object.keys(QUESTION_TYPE_LABELS) as QuestionType[]).map((type) => {
              const Icon = TYPE_ICONS[type]
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => handleAddQuestion(type)}
                  className={cn(
                    "flex flex-col items-center gap-2 rounded-xl border-2 border-border p-4 transition-all hover:border-primary hover:bg-primary/5",
                  )}
                >
                  <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl", TYPE_COLORS[type])}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-medium text-foreground text-center">
                    {QUESTION_TYPE_LABELS[type]}
                  </span>
                </button>
              )
            })}
          </div>
          <button
            type="button"
            onClick={() => setShowTypePicker(false)}
            className="w-full mt-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Cancel
          </button>
        </div>
      ) : (
        <Button
          onClick={() => setShowTypePicker(true)}
          className="w-full h-12 rounded-xl text-base font-semibold"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Question
        </Button>
      )}
    </div>
  )
}
