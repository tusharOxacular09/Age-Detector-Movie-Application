import { createSlice } from "@reduxjs/toolkit";

const userVerificationSlice = createSlice({
  name: "userVerificationSlice",
  initialState: {
    isUserVerified: false,
  },
  reducers: {
    enabelingUserVerification(state) {
      state.isUserVerified = true;
    },
    disabelingUserVerification(state) {
      state.isUserVerified = false;
    },
  },
});

export default userVerificationSlice.reducer;
export const userVerificationSliceAction = userVerificationSlice.actions;
