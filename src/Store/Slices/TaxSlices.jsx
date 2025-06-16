import { createSlice } from "@reduxjs/toolkit";
import { GetTax  ,CreateTax } from "../../thunks/Api";

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
      //  Create Tax U
      .addCase(CreateTax.pending, (state) =>{
        state.loading = true;
        state.error = null;
      })
      .addCase(CreateTax.fulfilled, (state, action) =>{
        state.loading = false;
        state.taxes = [...state.taxes, action.payload];
      })
      .addCase(CreateTax.rejected, (state, action) =>{
        state.loading = false;
        state.error = action.payload || "Error While Creating Tax";
      })
      
  },
});

export default TaxSlice.reducer;




