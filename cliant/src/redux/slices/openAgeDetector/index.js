import { createSlice } from "@reduxjs/toolkit";

const ageDetectorEnabelingSlice = createSlice({
  name: "ageDetectorEnabelingSlice",
  initialState: {
    ageDetectorEnabeled: false,
  },
  reducers: {
    enabelingAgeDetector(state) {
      state.ageDetectorEnabeled = true;
    },
    disabelingAgeDetector(state) {
      state.ageDetectorEnabeled = false;
    },
  },
});

export default ageDetectorEnabelingSlice.reducer;
export const ageDetectorEnabelingSliceAction =
  ageDetectorEnabelingSlice.actions;
