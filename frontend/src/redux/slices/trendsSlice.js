import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetch } from "../fetchtTends";

const handleError = (error, thunkAPI) => {
  if (error.response) {
    const { status, data } = error.response;
    let code = null;
    if (status === 404) {
      code = "404";
    } else if (status === 429) {
      code = "429";
    }

    return thunkAPI.rejectWithValue({
      code,
      message: data.message,
    });
  } else if (error.request) {
    return thunkAPI.rejectWithValue({
      code: error.code,
      message: "Network Error",
    });
  }

  return thunkAPI.rejectWithValue({
    code: "ERR_GENERIC",
    message: "Error",
  });
};

export const fetchTrends = createAsyncThunk(
  "fetch/trends",
  async (_, thunkAPI) => {
    try {
      return await fetch.fetchTrends();
    } catch (error) {
      return handleError(error, thunkAPI);
    }
  }
);

const initialState = {
  trends: [],
  isLoading: {
    fetchTrends: false,
  },
  isSuccess: {
    fetchTrends: false,
  },
  isError: {
    fetchTrends: false,
  },
  error: null,
};

const trendsSlice = createSlice({
  name: "trends",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchAllShows.pending, (state) => {
        state.isError.fetchAllShows = false;
        state.isLoading.fetchAllShows = true;
        state.isSuccess.fetchAllShows = false;
      })
      .addCase(fetchAllShows.rejected, (state, action) => {
        state.error = action.payload;
        state.isError.fetchAllShows = true;
        state.isLoading.fetchAllShows = false;
        state.isSuccess.fetchAllShows = false;
      })
      .addCase(fetchAllShows.fulfilled, (state, { payload }) => {
        state.isError.fetchAllShows = false;
        state.isLoading.fetchAllShows = false;
        state.isSuccess.fetchAllShows = true;
        state.shows = payload;
      });
  },
});
export default trendsSlice.reducer;
