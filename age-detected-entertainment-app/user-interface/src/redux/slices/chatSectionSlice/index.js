import { createSlice } from "@reduxjs/toolkit";

const chatSectionEnabelingSlice = createSlice({
  name: "chatSectionEnabelingSlice",
  initialState: {
    chatSectionEnabeled: false,
  },
  reducers: {
    enabelingChatSection(state) {
      state.chatSectionEnabeled = true;
    },
    disabelingChatSection(state) {
      state.chatSectionEnabeled = false;
    },
  },
});

export default chatSectionEnabelingSlice.reducer;
export const chatSectionEnabelingSliceAction =
  chatSectionEnabelingSlice.actions;
