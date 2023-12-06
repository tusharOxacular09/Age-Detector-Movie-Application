import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchWarMovies = createAsyncThunk("fetchWarMovies", async () => {
  try {
    const warMovies = await axios.get(
      "http://localhost:8080/api/movie/war-movies"
    );
    return warMovies;
  } catch (error) {
    console.log(error);
  }
});

const WarMovieSlice = createSlice({
  name: "movie",
  initialState: {
    isLoading: false,
    data: null,
    error: false,
  },
  // "extraReducer" is used for handeling Such Asynchronous Tasks
  extraReducers: (builder) => {
    builder.addCase(fetchWarMovies.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(fetchWarMovies.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });

    builder.addCase(fetchWarMovies.rejected, (state, action) => {
      state.error = true;
    });
  },
});

export default WarMovieSlice.reducer;
