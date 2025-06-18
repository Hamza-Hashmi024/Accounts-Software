import { createSlice } from "@reduxjs/toolkit";
import {
  CreateCustomer,
  GetCustomersIdOrName,
  UpdateCustomer,
  DeleteCustomerById,
  GetAllCustomers,
  GetCustomerName,
  GetTotalCustomerNum
} from "../../thunks/Api";

const CustomerSlice = createSlice({
  name: "Customer",
  initialState: {
    loading: false,
    customer: null,
    customers: [],
    error: null,
    totalCustomerNum: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(CreateCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(CreateCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.customer = action.payload; // this is your created customer response
      })
      .addCase(CreateCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })

      //   to Get Customer by Id Or Name

      .addCase(GetCustomersIdOrName.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetCustomersIdOrName.fulfilled, (state, action) => {
        state.loading = false;
        state.customers = action.payload;
      })
      .addCase(GetCustomersIdOrName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })

      .addCase(UpdateCustomer.pending, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(UpdateCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.customer = action.payload;
      })
      .addCase(UpdateCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })

      .addCase(DeleteCustomerById.pending, (state) => {
        state.loading = false;
        state.error = null;
      })

      .addCase(DeleteCustomerById.fulfilled, (state, action) => {
        state.loading = false;
        state.customer = action.payload;
        console.log(action.payload);
      })

      .addCase(DeleteCustomerById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something Went Wrong";

      })

      .addCase(GetAllCustomers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(GetAllCustomers.fulfilled, (state, action) => {
        state.loading = false;
        state.customers = action.payload;
        console.log("comming from Slaice " , action.payload)
      })

      .addCase(GetAllCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch customers.";
      })

      .addCase(GetCustomerName.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(GetCustomerName.fulfilled, (state, action) => {
        state.loading = false;
        state.customers = action.payload;
      })
      .addCase(GetCustomerName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || " Failed To fetch Customer Name";
      })
      // Get Total Customer Number 
      .addCase(GetTotalCustomerNum.pending, (state) =>{
        state.loading = true;
        state.error = null;
      })
      .addCase(GetTotalCustomerNum.fulfilled,  (state ,  action ) =>{
        state.loading = false;
        state.totalCustomerNum = action.payload;
        console.log(action.payload)

      })
      .addCase(GetTotalCustomerNum.rejected , (state , action ) =>{
        state.loading = false;
        state.error = action.payload || "Failed to fetch Total Customer Number";
      })
  },
});

export default CustomerSlice.reducer;
