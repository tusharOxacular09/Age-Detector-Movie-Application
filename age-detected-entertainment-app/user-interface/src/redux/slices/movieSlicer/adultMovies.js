import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAdultMovies = createAsyncThunk(
  "fetchAdultMovies",
  async () => {
    try {
      const adultMovies = await axios.get(
        "http://localhost:8080/api/movie/adult-movies"
      );
      return adultMovies;
    } catch (error) {
      console.log(error);
    }
  }
);

const AdultMovieSlice = createSlice({
  name: "movie",
  initialState: {
    isLoading: false,
    data: null,
    error: false,
  },
  // "extraReducer" is used for handeling Such Asynchronous Tasks
  extraReducers: (builder) => {
    builder.addCase(fetchAdultMovies.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(fetchAdultMovies.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });

    builder.addCase(fetchAdultMovies.rejected, (state, action) => {
      state.error = true;
    });
  },
});

export default AdultMovieSlice.reducer;
