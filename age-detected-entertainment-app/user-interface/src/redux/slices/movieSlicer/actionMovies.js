import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchActionMovies = createAsyncThunk(
  "fetchActionMovies",
  async () => {
    try {
      const actionMovies = await axios.get(
        "http://localhost:8080/api/movie/action-movies"
      );
      return actionMovies;
    } catch (error) {
      console.log(error);
    }
  }
);

const ActionMovieSlice = createSlice({
  name: "movie",
  initialState: {
    isLoading: false,
    data: null,
    error: false,
  },
  // "extraReducer" is used for handeling Such Asynchronous Tasks
  extraReducers: (builder) => {
    builder.addCase(fetchActionMovies.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(fetchActionMovies.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });

    builder.addCase(fetchActionMovies.rejected, (state, action) => {
      state.error = true;
    });
  },
});

export default ActionMovieSlice.reducer;
