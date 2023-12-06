import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchKidMovies = createAsyncThunk("fetchKidMovies", async () => {
  try {
    const kidMovies = await axios.get(
      "http://localhost:8080/api/movie/kids-movies"
    );
    return kidMovies;
  } catch (error) {
    console.log(error);
  }
});

const KidMovieSlice = createSlice({
  name: "movie",
  initialState: {
    isLoading: false,
    data: null,
    error: false,
  },
  // "extraReducer" is used for handeling Such Asynchronous Tasks
  extraReducers: (builder) => {
    builder.addCase(fetchKidMovies.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(fetchKidMovies.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });

    builder.addCase(fetchKidMovies.rejected, (state, action) => {
      state.error = true;
    });
  },
});

export default KidMovieSlice.reducer;
