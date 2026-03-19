"use client";

import { useMemo } from "react";
import { Input } from "@/components/ui/input";
import type { FillBlankOption, Question } from "@/types/quiz/quiz-types";

type FillBlankToken =
  | { type: "text"; value: string }
  | { type: "blank"; blankIndex: number };

const parseFillBlankTokens = (content: string): FillBlankToken[] => {
  const parts = content.split("___");
  const tokens: FillBlankToken[] = [];

  parts.forEach((part, index) => {
    if (part) {
      tokens.push({ type: "text", value: part });
    }

    if (index < parts.length - 1) {
      tokens.push({ type: "blank", blankIndex: index });
    }
  });

  return tokens;
};

export const syncBlanksWithContent = (
  content: string,
  existingBlanks?: FillBlankOption[],
): FillBlankOption[] => {
  const blankCount = content.split("___").length - 1;

  return Array.from({ length: blankCount }, (_, blankIndex) => {
    const existing = existingBlanks?.[blankIndex];

    return {
      clientTempId: existing?.clientTempId ?? crypto.randomUUID(),
      serverId: existing?.serverId,
      blankIndex,
      acceptedAnswers: existing?.acceptedAnswers ?? "",
    };
  });
};

interface FillBlankAnswersProps {
  question: Question;
  onBlankChange: (blankIndex: number, value: string) => void;
}

export function FillBlankAnswers({
  question,
  onBlankChange,
}: FillBlankAnswersProps) {
  const previewTokens = useMemo(
    () => parseFillBlankTokens(question.content),
    [question.content],
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-xl border border-border bg-muted/50 p-4">
        <p className="mb-2 text-sm text-muted-foreground">Preview:</p>
        <div className="flex flex-wrap items-center gap-2 text-base leading-relaxed">
          {previewTokens.map((token, idx) =>
            token.type === "text" ? (
              <span key={idx}>{token.value}</span>
            ) : (
              <div key={idx} className="mx-0.5 inline-flex items-center gap-1">
                <div className="flex h-8 min-w-[32px] items-center justify-center rounded border-2 border-dashed border-primary bg-primary/20 font-semibold text-primary">
                  {question.blanks?.[token.blankIndex]?.acceptedAnswers || "____"}
                </div>
              </div>
            ),
          )}
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">
          Enter the correct word for each blank:
        </p>
        {question.blanks?.map((blank, blankIndex) => (
          <div
            key={blank.clientTempId ?? blankIndex}
            className="flex items-center gap-2"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-xs font-bold text-primary-foreground">
              {blankIndex + 1}
            </span>
            <Input
              placeholder="Type the word"
              value={blank.acceptedAnswers || ""}
              onChange={(e) => onBlankChange(blankIndex, e.target.value)}
              className="h-10 rounded-lg text-base"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
