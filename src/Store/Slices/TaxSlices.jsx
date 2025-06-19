import { createSlice } from "@reduxjs/toolkit";
import { GetTax, CreateTax, UpdateTax } from "../../thunks/Api";

const TaxSlice = createSlice({
  name: "tax",
  initialState: {
    taxes: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GetAllTax
      .addCase(GetTax.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetTax.fulfilled, (state, action) => {
        state.loading = false;
        state.taxes = action.payload;
      })
      .addCase(GetTax.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error While Fetching Taxes";
      })
      //  Create Tax ON Product
      .addCase(CreateTax.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(CreateTax.fulfilled, (state, action) => {
        state.loading = false;
        state.taxes = [...state.taxes, action.payload];
      })
      .addCase(CreateTax.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error While Creating Tax";
      })
      // Update Tax ON Product
      .addCase(UpdateTax.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(UpdateTax.fulfilled, (state, action) => {
        state.loading = false;
        state.taxes = state.taxes.map((tax) =>
          tax.id === action.payload.id ? action.payload : tax
        );
      })
      
      .addCase(UpdateTax.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error While Updating Tax";
      });
  },
});

export default TaxSlice.reducer;
