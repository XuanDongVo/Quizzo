"use client";

import { useCallback } from "react";
import { ArrowLeft } from "lucide-react";
import { Label } from "@/components/ui/label";
import { QUESTION_TYPE_LABELS, QUESTION_TYPES } from "@/types/quiz/quiz-types";
import {
  selectQuestions,
  selectSelectedQuestionId,
} from "@/features/quizz/create-quizz/createQuizz.selectors";
import { useDispatch, useSelector } from "react-redux";
import {
  setCorrectAnswer,
  setSelectedQuestion,
  updateOption,
  updateQuestion,
} from "@/features/quizz/create-quizz/createQuizz.slice";
import { FillBlankAnswers, syncBlanksWithContent } from "./question-editor/FillBlankAnswers";
import { QuestionImageUpload } from "./question-editor/QuestionImageUpload";
import { QuestionTextEditor } from "./question-editor/QuestionTextEditor";
import { ChoiceAnswerOptions } from "./question-editor/ChoiceAnswerOptions";
import { QuestionSettings } from "./question-editor/QuestionSettings";

export function QuestionEditor() {
  const dispatch = useDispatch();
  const questions = useSelector(selectQuestions);
  const selectedQuestionId = useSelector(selectSelectedQuestionId);

  const question = questions.find((q) => q.clientTempId === selectedQuestionId);

  const handleBackToList = useCallback(() => {
    dispatch(setSelectedQuestion(null));
  }, [dispatch]);

  const handleQuestionImageUpload = useCallback(
    (file: File) => {
      if (!question) return;

      const url = URL.createObjectURL(file);
      dispatch(
        updateQuestion({
          questionId: question.clientTempId,
          updates: { imageUrl: url },
        }),
      );
    },
    [dispatch, question],
  );

  const handleQuestionImageRemove = useCallback(() => {
    if (!question) return;

    dispatch(
      updateQuestion({
        questionId: question.clientTempId,
        updates: { imageUrl: undefined },
      }),
    );
  }, [dispatch, question]);

  const handleQuestionContentChange = useCallback(
    (content: string) => {
      if (!question) return;

      if (question.questionType === QUESTION_TYPES.FILL_BLANK) {
        dispatch(
          updateQuestion({
            questionId: question.clientTempId,
            updates: {
              content,
              blanks: syncBlanksWithContent(content, question.blanks),
            },
          }),
        );
        return;
      }

      dispatch(
        updateQuestion({
          questionId: question.clientTempId,
          updates: { content },
        }),
      );
    },
    [dispatch, question],
  );

  const handleFillBlankAnswerChange = useCallback(
    (blankIndex: number, value: string) => {
      if (!question) return;

      const updatedBlanks = (question.blanks ?? []).map((blank, idx) =>
        idx === blankIndex ? { ...blank, acceptedAnswers: value } : blank,
      );

      dispatch(
        updateQuestion({
          questionId: question.clientTempId,
          updates: { blanks: updatedBlanks },
        }),
      );
    },
    [dispatch, question],
  );

  const handleChoiceOptionChange = useCallback(
    (optionId: string, content: string) => {
      if (!question) return;

      dispatch(
        updateOption({
          questionId: question.clientTempId,
          optionId,
          content,
        }),
      );
    },
    [dispatch, question],
  );

  const handleSetCorrectAnswer = useCallback(
    (optionId: string) => {
      if (!question) return;

      dispatch(
        setCorrectAnswer({
          questionId: question.clientTempId,
          optionId,
        }),
      );
    },
    [dispatch, question],
  );

  const handleTimeLimitChange = useCallback(
    (timeLimit: number) => {
      if (!question) return;

      dispatch(
        updateQuestion({
          questionId: question.clientTempId,
          updates: { timeLimit },
        }),
      );
    },
    [dispatch, question],
  );

  const handleScoreChange = useCallback(
    (score: number) => {
      if (!question) return;

      dispatch(
        updateQuestion({
          questionId: question.clientTempId,
          updates: { score },
        }),
      );
    },
    [dispatch, question],
  );

  if (!question) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
          <ArrowLeft className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="mb-1 text-lg font-semibold text-foreground">Select a question</h3>
        <p className="max-w-xs text-sm text-muted-foreground">
          Click on a question from the list to edit it here.
        </p>
      </div>
    );
  }

  const qIndex = questions.findIndex((q) => q.clientTempId === question.clientTempId);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleBackToList}
          className="rounded-lg p-2 transition-colors hover:bg-muted md:hidden"
          aria-label="Back to question list"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-xs font-bold text-primary-foreground">
              {qIndex + 1}
            </span>
            <span className="text-sm font-medium text-muted-foreground">
              {QUESTION_TYPE_LABELS[question.questionType]}
            </span>
          </div>
        </div>
      </div>

      <QuestionImageUpload
        imageUrl={question.imageUrl}
        onUpload={handleQuestionImageUpload}
        onRemove={handleQuestionImageRemove}
      />

      <QuestionTextEditor
        questionType={question.questionType}
        content={question.content}
        onChange={handleQuestionContentChange}
      />

      <div className="flex flex-col gap-3">
        <Label className="text-sm font-semibold text-foreground">
          {question.questionType === QUESTION_TYPES.FILL_BLANK
            ? "Correct Answers"
            : "Answer Options"}
        </Label>

        {question.questionType === QUESTION_TYPES.FILL_BLANK ? (
          <FillBlankAnswers
            question={question}
            onBlankChange={handleFillBlankAnswerChange}
          />
        ) : (
          <ChoiceAnswerOptions
            question={question}
            onOptionChange={handleChoiceOptionChange}
            onSetCorrectAnswer={handleSetCorrectAnswer}
          />
        )}
      </div>

      <QuestionSettings
        timeLimit={question.timeLimit}
        score={question.score}
        onTimeLimitChange={handleTimeLimitChange}
        onScoreChange={handleScoreChange}
      />
    </div>
  );
}
