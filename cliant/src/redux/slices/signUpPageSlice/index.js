import { createSlice } from "@reduxjs/toolkit";

const signUpPageEnabelingSlice = createSlice({
  name: "SignUpPageEnabling",
  initialState: {
    signUpPageEnabeled: false,
  },
  reducers: {
    enabelingSignUpPage(state) {
      state.signUpPageEnabeled = true;
    },
    disablingSignUpPage(state) {
      state.signUpPageEnabeled = false;
    },
    resetPageEnabeling(state) {
      state.signUpPageEnabeled = false;
    },
  },
});

export default signUpPageEnabelingSlice;
export const signUpPageEnabelingSliceAction = signUpPageEnabelingSlice.actions;
