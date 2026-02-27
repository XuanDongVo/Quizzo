import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/auth.api";
import signupReducer from "./auth/signup/signup.slice";
import createQuizSlice from "./create-quizz/createQuizz.slice";
import { quizzApi } from "./api/quizz.api";
import { questionApi } from "./api/question.api";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [quizzApi.reducerPath]: quizzApi.reducer,
    [questionApi.reducerPath]: questionApi.reducer,
    signup: signupReducer,
    createQuizz: createQuizSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      quizzApi.middleware,
      questionApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
