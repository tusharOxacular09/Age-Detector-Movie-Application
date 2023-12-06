import { createSlice } from "@reduxjs/toolkit";

const forgotPasswordPageEnabelingSlice = createSlice({
  name: "ForgotPasswordPageEnabeling",
  initialState: {
    forgotPasswordPageEnabeled: false,
  },
  reducers: {
    enabelingForgotPassword(state) {
      state.forgotPasswordPageEnabeled = true;
    },
    disabelingForgotPassword(state) {
      state.forgotPasswordPageEnabeled = false;
    },
    resetPageEnabeling(state) {
      state.forgotPasswordPageEnabeled = false;
    },
  },
});

export default forgotPasswordPageEnabelingSlice;
export const forgotPasswordPageEnabelingSliceAction =
  forgotPasswordPageEnabelingSlice.actions;
