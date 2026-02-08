import { Question, QuestionStatus } from "@/types/quiz/quiz-types";

export function getQuestionStatus(q: Question): QuestionStatus {
  if (!q.text.trim()) return "draft";

  const hasCorrect = q.options.some((option) => option.isCorrect);
  if (!hasCorrect) return "draft";

  // const hasEmptyOption = q.options.some((option) => !option.text.trim());
  // if (hasEmptyOption) return "draft";
  return "complete";
}
