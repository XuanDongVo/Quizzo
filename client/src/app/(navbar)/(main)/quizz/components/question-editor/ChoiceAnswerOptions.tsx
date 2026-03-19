"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { QUESTION_TYPES } from "@/types/quiz/quiz-types";
import type { Question } from "@/types/quiz/quiz-types";

const ANSWER_COLORS = [
  "bg-answer-a hover:bg-answer-a/90",
  "bg-answer-b hover:bg-answer-b/90",
  "bg-answer-c hover:bg-answer-c/90",
  "bg-answer-d hover:bg-answer-d/90",
];

const ANSWER_LABELS = ["A", "B", "C", "D"];

interface ChoiceAnswerOptionsProps {
  question: Question;
  onOptionChange: (optionId: string, value: string) => void;
  onSetCorrectAnswer: (optionId: string) => void;
}

export function ChoiceAnswerOptions({
  question,
  onOptionChange,
  onSetCorrectAnswer,
}: ChoiceAnswerOptionsProps) {
  return (
    <div className="grid grid-cols-1 gap-3">
      {question.answers?.map((option, optIndex) => {
        const optionId = option.clientTempId ?? option.serverId;
        const isTrueFalse = question.questionType === QUESTION_TYPES.TRUE_FALSE;
        const isMultiple =
          question.questionType === QUESTION_TYPES.MULTIPLE_CHOICE;

        if (!optionId) return null;

        return (
          <div
            key={optionId}
            className={cn(
              "relative flex items-center gap-3 rounded-xl p-3 transition-all md:p-4",
              ANSWER_COLORS[optIndex % 4],
            )}
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-background/20 text-sm font-bold text-background">
              {ANSWER_LABELS[optIndex]}
            </span>

            {isTrueFalse ? (
              <span className="flex-1 font-semibold text-background">
                {option.content}
              </span>
            ) : (
              <input
                type="text"
                placeholder={`Option ${ANSWER_LABELS[optIndex]}`}
                value={option.content}
                onChange={(e) => onOptionChange(optionId, e.target.value)}
                className="flex-1 border-none bg-transparent text-sm font-medium text-background outline-none placeholder:text-background/60"
              />
            )}

            <button
              type="button"
              onClick={() => onSetCorrectAnswer(optionId)}
              className={cn(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-all",
                option.isCorrect
                  ? "bg-background text-answer-b shadow-sm"
                  : "bg-background/20 text-background/60 hover:bg-background/30",
              )}
            >
              {isMultiple ? (
                <div className="flex h-4 w-4 items-center justify-center rounded-sm border-2">
                  {option.isCorrect && <Check className="h-3 w-3" />}
                </div>
              ) : (
                <Check className="h-4 w-4" />
              )}
            </button>
          </div>
        );
      })}
    </div>
  );
}
