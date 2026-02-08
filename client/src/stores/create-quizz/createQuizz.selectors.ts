import { RootState } from "@/stores"

export const selectQuizz = (state: RootState) => state.createQuizz.quizz
export const selectQuestions = (state: RootState) => state.createQuizz.quizz.questions
export const selectCurrentStep = (state: RootState) => state.createQuizz.currentStep
export const selectSelectedQuestionId = (state: RootState) =>state.createQuizz.selectedQuestionId
