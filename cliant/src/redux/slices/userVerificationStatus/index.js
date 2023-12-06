import { createSlice } from "@reduxjs/toolkit";

const userVerificationSlice = createSlice({
  name: "userVerificationSlice",
  initialState: {
    userAnsweredCorrectly: false,
  },
  reducers: {
    enabelingUserVerificationForAdultMovies(state) {
      state.userAnsweredCorrectly = true;
    },
    disabelingUserVerificationForAdultMovies(state) {
      state.userAnsweredCorrectly = false;
    },
  },
});

export default userVerificationSlice.reducer;
export const userVerificationSliceAction = userVerificationSlice.actions;
