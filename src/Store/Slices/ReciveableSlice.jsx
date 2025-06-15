import { createSlice } from "@reduxjs/toolkit";
import { GetReciveAble } from "../../thunks/Api";

const ReceivableSlice = createSlice({
  name: "Receivable",
  initialState: {
    receivable: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetReciveAble.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetReciveAble.fulfilled, (state, action) => {
        state.loading = false;
        state.receivable = action.payload;
      })
      .addCase(GetReciveAble.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default ReceivableSlice.reducer;
