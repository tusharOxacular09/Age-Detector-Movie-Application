import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchDramaMovies = createAsyncThunk(
  "fetchDramaMovies",
  async () => {
    try {
      const dramaMovies = await axios.get(
        "http://localhost:8080/api/movie/drama-movies"
      );
      return dramaMovies;
    } catch (error) {
      console.log(error);
    }
  }
);

const DramaMovieSlice = createSlice({
  name: "movie",
  initialState: {
    isLoading: false,
    data: null,
    error: false,
  },
  // "extraReducer" is used for handeling Such Asynchronous Tasks
  extraReducers: (builder) => {
    builder.addCase(fetchDramaMovies.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(fetchDramaMovies.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });

    builder.addCase(fetchDramaMovies.rejected, (state, action) => {
      state.error = true;
    });
  },
});

export default DramaMovieSlice.reducer;
