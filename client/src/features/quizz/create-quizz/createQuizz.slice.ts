import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  QuizzData,
  Question,
  QuestionType,
  createQuestion,
} from "@/types/quiz/quiz-types";
import { getQuestionStatus } from "@/utils/questionStatus";
import { UpsertQuestionResponse } from "@/types/quiz/question-type";

interface CreateQuizState {
  quizz: QuizzData;

  currentStep: number;
  selectedQuestionId: string | null;

  dirtyQuestions: Record<string, Question>;
  deletedQuestionIds: string[];

  isDirty: boolean;
  isSaving: boolean;
}

const initialState: CreateQuizState = {
  quizz: {
    id: "",
    title: "",
    description: "",
    coverImageUrl: "",
    collectionResponse: { id: "", name: "" },
    isPublic: false,
    shuffleQuestions: false,
    isPublicQuestion: false,
    showResults: false,
    passingScore: 70,
    questions: [],
  },
  currentStep: 0,
  selectedQuestionId: null,
  dirtyQuestions: {},
  deletedQuestionIds: [],
  isDirty: false,
  isSaving: false,
};

const markQuestionDirty = (state: CreateQuizState, question: Question) => {
  state.dirtyQuestions[question.clientTempId] = question;
  state.isDirty = true;
};

const setSingleAnswer = (question: Question, optionId: string) => {
  question.answers?.forEach(a => {
    a.isCorrect = (a.clientTempId ?? a.serverId) === optionId;
  });
};

const toggleMultipleAnswer = (question: Question, optionId: string) => {
  const ans = question.answers?.find(
    a => (a.clientTempId ?? a.serverId) === optionId
  );
  if (ans) ans.isCorrect = !ans.isCorrect;
};

export const createQuizSlice = createSlice({
  name: "createQuiz",
  initialState,
  reducers: {
    /**
     * ===============================
     *  ROOT / INITIALIZE QUIZ
     * ===============================
     */

    setQuizz(state, action: PayloadAction<QuizzData>) {
      state.quizz = action.payload;
    },

    resetQuizz() {
      return initialState;
    },

    /**
     * ===============================
     *  QUIZ LEVEL UPDATE
     * (title, description, settings...)
     * ===============================
     */
    setField(state, action: PayloadAction<Partial<QuizzData>>) {
      if (!state.quizz) return;
      Object.assign(state.quizz, action.payload);
      state.quizz.status = "draft";
      state.isDirty = true;
    },

    /**
     * ===============================
     *  QUESTION CRUD
     * ===============================
     */

    addQuestion(state, action: PayloadAction<QuestionType>) {
      if (!state.quizz) return;

      const order = state.quizz.questions.length;

      state.quizz.questions.push(createQuestion(action.payload, order));
      // state.isDirty = true;
    },

    updateQuestion(
      state,
      action: PayloadAction<{
        questionId: string;
        updates: Partial<Question>;
      }>,
    ) {
      if (!state.quizz) return;

      const q = state.quizz.questions.find(
        (q) => q.clientTempId === action.payload.questionId,
      );

      if (!q) return;

      Object.assign(q, action.payload.updates);

      q.status = getQuestionStatus(q) as "draft" | "complete";

      markQuestionDirty(state, q);
    },

    deleteQuestion(state, action: PayloadAction<string>) {
      if (!state.quizz) return;

      const question = state.quizz.questions.find(
        (q) => q.clientTempId === action.payload,
      );

      if (!question) return;

      if (question.serverId) {
        state.deletedQuestionIds.push(question.serverId);
      }

      state.quizz.questions = state.quizz.questions.filter(
        (q) => q.clientTempId !== action.payload,
      );

      if (state.selectedQuestionId === action.payload) {
        state.selectedQuestionId = null;
      }

      state.isDirty = true;
    },

    reorderQuestions(
      state,
      action: PayloadAction<{ from: number; to: number }>,
    ) {
      if (!state.quizz) return;

      const { from, to } = action.payload;
      if (from === to) return;

      const questions = state.quizz.questions;
      const [moved] = questions.splice(from, 1);
      questions.splice(to, 0, moved);

      questions.forEach((q, index) => {
        q.orderIndex = index;
      });

      questions.forEach((q) => markQuestionDirty(state, q));
    },

    /**
     * ===============================
     *  QUESTION INTERNAL UPDATE
     * (options, correct answer, content)
     * ===============================
     */

    setCorrectAnswer(
      state,
      action: PayloadAction<{
        questionId: string;
        optionId: string;
      }>,
    ) {
      if (!state.quizz) return;

      const question = state.quizz.questions.find(
        (q) => q.clientTempId === action.payload.questionId,
      );

      if (!question) return;

      if (question.questionType === "MULTIPLE_CHOICE") {
        toggleMultipleAnswer(question, action.payload.optionId);
      } else {
        setSingleAnswer(question, action.payload.optionId);
      }

      question.status = getQuestionStatus(question) as "draft" | "complete";

      markQuestionDirty(state, question);
    },

    updateOption(
      state,
      action: PayloadAction<{
        questionId: string;
        optionId: string;
        content: string;
      }>,
    ) {
      if (!state.quizz) return;

      const question = state.quizz.questions.find(
        (q) => q.clientTempId === action.payload.questionId,
      );
      if (!question || !question.answers) return;

      const option = question.answers.find(
        (a) => a.clientTempId === action.payload.optionId,
      );
      if (!option) return;

      option.content = action.payload.content;

      question.status = getQuestionStatus(question) as "draft" | "complete";
      markQuestionDirty(state, question);
    },

    /**
     * ===============================
     * UI STATE
     * ===============================
     */

    applyServerIds(state, action: PayloadAction<UpsertQuestionResponse[]>) {
      const responses = action.payload;

      responses.forEach((qRes) => {
        if (!qRes.clientTempId) return;

        const question = state.quizz.questions.find(
          (q) => q.clientTempId === qRes.clientTempId,
        );

        if (!question) return;

        // set server questionId
        question.serverId = qRes.questionId;

        // map answer ids
        if (qRes.answers && question.answers) {
          qRes.answers.forEach((aRes) => {
            if (!aRes.clientTempId) return;

            const answer = question.answers?.find(
              (a) => a.clientTempId === aRes.clientTempId,
            );

            if (!answer) return;

            answer.serverId = aRes.answerId;
          });
        }

        // map blank ids
        if (qRes.blanks && question.blanks) {
          qRes.blanks.forEach((bRes) => {
            if (!bRes.clientTempId) return;

            const blank = question.blanks?.find(
              (b) => b.clientTempId === bRes.clientTempId,
            );

            if (!blank) return;

            blank.serverId = bRes.answerId;
          });
        }
      });
    },

    setCurrentStep(state, action: PayloadAction<number>) {
      state.currentStep = action.payload;
    },

    setSelectedQuestion(state, action: PayloadAction<string | null>) {
      state.selectedQuestionId = action.payload;
    },

    clearDirty(state) {
      state.dirtyQuestions = {};
      state.deletedQuestionIds = [];
      state.isDirty = false;
      state.quizz.status = "published";
    },
  },
});

export const {
  setQuizz,
  resetQuizz,

  setField,

  addQuestion,
  updateQuestion,
  deleteQuestion,
  reorderQuestions,

  setCorrectAnswer,
  updateOption,

  applyServerIds,
  setSelectedQuestion,
  setCurrentStep,
  clearDirty,
} = createQuizSlice.actions;

export default createQuizSlice.reducer;
