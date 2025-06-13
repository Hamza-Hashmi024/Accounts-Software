import { createSlice } from "@reduxjs/toolkit";
import {
  CreateSalesInvoice,
  GetInvoiceNumOrRefNum,
  GetSalesRevenew,
  TotalInvoice,
  GetSalesGrowth,
  GetSalesAverage,
  GetMonthlySalesOverView,
} from "../../thunks/Api";

const SalesInvoiceSlice = createSlice({
  name: "SalesInvoice",
  initialState: {
    isLoading: false,
    isError: false,
    errorMessage: "",
    revenueData: null,
    totalInvoices: null,
    invoiceMeta: null,
    salesGrowth: null,
    salesAverage: null,
    monthlySales: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(CreateSalesInvoice.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(CreateSalesInvoice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.isError = false;
      })
      .addCase(CreateSalesInvoice.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload || "Something went wrong";
      })
      // getting Invoice Number or Referance Number
      .addCase(GetInvoiceNumOrRefNum.pending, (state) => {
        state.isLoading = false;
        state.isError = false;
      })

      .addCase(GetInvoiceNumOrRefNum.fulfilled, (state, action) => {
        state.invoiceMeta = {
          invoice_number: action.payload.invoice_number,
          reference_number: action.payload.reference_number,
        };
      })

      .addCase(GetInvoiceNumOrRefNum.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      // Gettin Sales Revenew
      .addCase(GetSalesRevenew.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(GetSalesRevenew.fulfilled, (state, action) => {
        state.isLoading = false;
        state.revenueData = action.payload.data;
        console.log("Revenue data:", action.payload.data);
      })

      .addCase(GetSalesRevenew.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })

      //  TotalNumber Invoices
      .addCase(TotalInvoice.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(TotalInvoice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.totalInvoices = action.payload;
        console.log("Invoice count:", action.payload);
      })
      .addCase(TotalInvoice.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })

      // Get Sales Growth

      .addCase(GetSalesGrowth.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(GetSalesGrowth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.salesGrowth = action.payload;
        console.log("Sales growth:", action.payload);
      })

      .addCase(GetSalesGrowth.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })

      //  Get Sales Average
      .addCase(GetSalesAverage.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(GetSalesAverage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.salesAverage = action.payload;
        console.log("Sales average:", action.payload);
      })
      .addCase(GetSalesAverage.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })

      // Get Monthly Sales OverView
      .addCase(GetMonthlySalesOverView.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(GetMonthlySalesOverView.fulfilled, (state, action) => {
        state.isLoading = false;
        state.monthlySales = action.payload;
        console.log(action.payload);
      })
      .addCase(GetMonthlySalesOverView.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage =
        action.payload || "Failed to fetch monthly sales overview";
      });
  },
});

export default SalesInvoiceSlice.reducer;
