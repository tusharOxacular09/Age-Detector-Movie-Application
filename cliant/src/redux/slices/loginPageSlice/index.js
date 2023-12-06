import { createSlice } from "@reduxjs/toolkit";

const loginPageEnabelingSlice = createSlice({
  name: "LoginPageEnabeling",
  initialState: {
    loginPageEnabeled: false,
  },
  reducers: {
    enabelingLoginPage(state) {
      state.loginPageEnabeled = true;
    },
    disabelingLoginPage(state) {
      state.loginPageEnabeled = false;
    },
    resetPageEnabeling(state) {
      state.loginPageEnabeled = false;
    },
  },
});

export default loginPageEnabelingSlice;
export const loginPageEnabelingSliceAction = loginPageEnabelingSlice.actions;
