import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchFantesyMovies = createAsyncThunk(
  "fetchFantesyMovies",
  async () => {
    try {
      const fantesyMovies = await axios.get(
        "http://localhost:8080/api/movie/fantesy-movies"
      );
      return fantesyMovies;
    } catch (error) {
      console.log(error);
    }
  }
);

const FantesyMovieSlice = createSlice({
  name: "movie",
  initialState: {
    isLoading: false,
    data: null,
    error: false,
  },
  // "extraReducer" is used for handeling Such Asynchronous Tasks
  extraReducers: (builder) => {
    builder.addCase(fetchFantesyMovies.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(fetchFantesyMovies.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });

    builder.addCase(fetchFantesyMovies.rejected, (state, action) => {
      state.error = true;
    });
  },
});

export default FantesyMovieSlice.reducer;
