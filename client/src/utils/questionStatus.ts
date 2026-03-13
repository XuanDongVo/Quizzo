import { Question, QuestionStatus } from "@/types/quiz/quiz-types";

export function getQuestionStatus(q: Question): QuestionStatus {
  if (!q.content.trim()) return "draft";

  const hasCorrect = q.answers?.some((answers) => answers.isCorrect);
  if (!hasCorrect) return "draft";

  const hasEmptyBlank = q.questionType === "fill-blank" && q.answers?.some((a) => !a.content.trim());
  if (hasEmptyBlank) return "draft";

  // const hasEmptyOption = q.options.some((option) => !option.text.trim());
  // if (hasEmptyOption) return "draft";
  return "complete";
}
