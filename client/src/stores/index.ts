import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../service/apiConfig/auth.api";
import signupReducer from "./auth/signup/signup.slice";
import createQuizSlice from "../features/quizz/create-quizz/createQuizz.slice";
import { quizzApi } from "../service/quizz.api";
import { questionApi } from "../service/question.api";
import { autoSavedApi } from "../service/auto-saved.api";
import { collectionApi } from "@/service/collection.api";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [quizzApi.reducerPath]: quizzApi.reducer,
    [questionApi.reducerPath]: questionApi.reducer,
    [autoSavedApi.reducerPath]: autoSavedApi.reducer,
    [collectionApi.reducerPath]: collectionApi.reducer,
    signup: signupReducer,
    createQuizz: createQuizSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      quizzApi.middleware,
      questionApi.middleware,
      autoSavedApi.middleware,
      collectionApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
