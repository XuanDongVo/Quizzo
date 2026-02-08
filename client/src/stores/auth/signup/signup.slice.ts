import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SignupState {
  step: number;
  accountType?: string;
  workspace?: string;
  userInfo: {
    name: string;
    email: string;
    password: string;
  };
}

const initialState: SignupState = {
  step: 1,
  userInfo: {
    name: "",
    email: "",
    password: "",
  },
};

export const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    nextStep: (state) => {
      if (state.step == 3) {
        return;
      }
      state.step += 1;
    },

    previousStep: (state) => {
      if (state.step <= 1) {
        return;
      }
      state.step -= 1;
    },

    setSignupData: (state, action: PayloadAction<Partial<SignupState>>) => {
      Object.assign(state, action.payload);
    },

    resetSignup: () => initialState,
  },
});

export const { nextStep, previousStep, setSignupData, resetSignup } =
  signupSlice.actions;

export default signupSlice.reducer;
