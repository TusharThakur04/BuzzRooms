import axios from "axios";

export const fetchTrends = async () => {
  const res = await axios.get(`http://localhost:8000/trends`, {});
  return res.data;
};

export const fetch = {
  fetchTrends,
};

const showsSlice = createSlice({
  name: "shows",
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
export default tredsSLice.reducer;
