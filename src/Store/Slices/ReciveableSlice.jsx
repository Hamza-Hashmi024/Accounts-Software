import { createSlice } from "@reduxjs/toolkit";
import { GetReciveAble, GetCreditInvoices } from "../../thunks/Api";

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
        state.error = action.error?.message || "Something went wrong";
      })

      // Get Credit Invoices only
      .addCase(GetCreditInvoices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetCreditInvoices.fulfilled, (state, action) => {
        state.loading = false;
        state.receivable = action.payload;
      })
      .addCase(GetCreditInvoices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || "Something went wrong";
      });
  },
});

export default ReceivableSlice.reducer;
