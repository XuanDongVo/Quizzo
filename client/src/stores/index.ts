import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./auth/auth.api";
import signupReducer from "./auth/signup/signup.slice";
import createQuizSlice from "./create-quizz/createQuizz.slice";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    signup: signupReducer,
    createQuizz: createQuizSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
