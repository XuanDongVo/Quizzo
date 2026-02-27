import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  QuizzData,
  Question,
  QuestionType,
  DEFAULT_QUIZZ,
  createQuestion,
} from "@/types/quiz/quiz-types";
import { getQuestionStatus } from "@/utils/questionStatus";

interface CreateQuizState {
  quizz: QuizzData | null;
  currentStep: number;
  selectedQuestionId: string | null;
}

const initialState: CreateQuizState = {
  quizz: null,
  currentStep: 0,
  selectedQuestionId: null,
};

export const createQuizSlice = createSlice({
  name: "createQuiz",
  initialState,
  reducers: {
    setQuizz: (state, action: PayloadAction<QuizzData>) => {
      state.quizz = action.payload;
    },

    setField: (state, action: PayloadAction<Partial<QuizzData>>) => {
      if (!state.quizz) return;
      Object.assign(state.quizz, action.payload);
    },

    addQuestion: (state, action: PayloadAction<QuestionType>) => {
      if (!state.quizz) return;
      const order = state.quizz.questions.length;
      state.quizz.questions.push(createQuestion(action.payload, order));
    },

    updateQuestion(
      state,
      action: PayloadAction<{ questionId: string; updates: Partial<Question> }>,
    ) {
      if (!state.quizz) return;
      const q = state.quizz.questions.find(
        (q) => q.id === action.payload.questionId,
      );
      if (q) {
        Object.assign(q, action.payload.updates);
        q.status = getQuestionStatus(q) as "draft" | "complete";
        q.syncStatus = "dirty";
      }
    },

    deleteQuestion: (state, action: PayloadAction<string>) => {
      if (!state.quizz) return;
      state.quizz.questions = state.quizz.questions.filter(
        (q) => q.id !== action.payload,
      );
    },

    reorderQuestions: (
      state,
      action: PayloadAction<{ from: number; to: number }>,
    ) => {
      if (!state.quizz) return;
      const { from, to } = action.payload;
      if (from == to) return;
      const questions = state.quizz.questions;
      const [movedQuestion] = questions.splice(from, 1);
      questions.splice(to, 0, movedQuestion);
      movedQuestion.syncStatus = "dirty";
    },

    setCorrectAnswer: (
      state,
      action: PayloadAction<{ questionId: string; optionId: string }>,
    ) => {
      if (!state.quizz) return;
      const question = state.quizz.questions.find(
        (q) => q.id === action.payload.questionId,
      );
      if (!question) return;
      question.options.forEach((option) => {
        option.isCorrect = option.id === action.payload.optionId;
      });
      question.status = getQuestionStatus(question) as "draft" | "complete";
      question.syncStatus = "dirty";
    },

    updateOption: (
      state,
      action: PayloadAction<{
        questionId: string;
        optionId: string;
        text: string;
      }>,
    ) => {
      if (!state.quizz) return;
      const question = state.quizz.questions.find(
        (q) => q.id === action.payload.questionId,
      );
      if (!question) return;
      const option = question.options.find(
        (o) => o.id === action.payload.optionId,
      );
      if (!option) return;
      option.text = action.payload.text;
      question.status = getQuestionStatus(question) as "draft" | "complete";
      question.syncStatus = "dirty";
    },

    setCurrentStep(state, action: PayloadAction<number>) {
      state.currentStep = action.payload;
    },

    setSelectedQuestion(state, action: PayloadAction<string | null>) {
      state.selectedQuestionId = action.payload;
    },

    resetQuizz() {
      return initialState;
    },
  },
});

export const {
  setQuizz,
  setField,
  addQuestion,
  updateQuestion,
  deleteQuestion,
  reorderQuestions,
  setCorrectAnswer,
  updateOption,
  setSelectedQuestion,
  setCurrentStep,
} = createQuizSlice.actions;
export default createQuizSlice.reducer;
