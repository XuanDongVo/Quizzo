"use client";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { QUESTION_TYPES } from "@/types/quiz/quiz-types";
import type { QuestionType } from "@/types/quiz/quiz-types";

interface QuestionTextEditorProps {
  questionType: QuestionType;
  content: string;
  onChange: (value: string) => void;
}

export function QuestionTextEditor({
  questionType,
  content,
  onChange,
}: QuestionTextEditorProps) {
  const isFillBlank = questionType === QUESTION_TYPES.FILL_BLANK;

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="question-text" className="text-sm font-semibold text-foreground">
        Question
      </Label>

      {isFillBlank ? (
        <div className="flex flex-col gap-1">
          <Textarea
            id="question-text"
            placeholder="Type your question... Use ___ to indicate the blank."
            value={content}
            onChange={(e) => onChange(e.target.value)}
            className="min-h-[80px] resize-none rounded-xl text-base"
          />
          <p className="text-xs text-muted-foreground">
            Use three underscores (___) where the blank should appear.
          </p>
        </div>
      ) : (
        <Textarea
          id="question-text"
          placeholder="Type your question here..."
          value={content}
          onChange={(e) => onChange(e.target.value)}
          className="min-h-[80px] resize-none rounded-xl text-base"
        />
      )}
    </div>
  );
}
