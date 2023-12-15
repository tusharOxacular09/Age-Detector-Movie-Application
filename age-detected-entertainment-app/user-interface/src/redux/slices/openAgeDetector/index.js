import { createSlice } from "@reduxjs/toolkit";

const ageDetectorEnabelingSlice = createSlice({
  name: "ageDetectorEnabelingSlice",
  initialState: {
    ageDetectorEnabeled: false,
    ageDetectorEnabelingCounter: 0,
  },
  reducers: {
    enabelingAgeDetector(state) {
      state.ageDetectorEnabeled = true;
    },
    disabelingAgeDetector(state) {
      state.ageDetectorEnabeled = false;
    },
    incrementAgeDetectorEnabelingCounter(state) {
      state.ageDetectorEnabelingCounter = state.ageDetectorEnabelingCounter + 1;
    },
    resetAgeDetectorEnabelingCounter(state) {
      state.ageDetectorEnabelingCounter = 0;
    },
  },
});

export default ageDetectorEnabelingSlice.reducer;
export const ageDetectorEnabelingSliceAction =
  ageDetectorEnabelingSlice.actions;
