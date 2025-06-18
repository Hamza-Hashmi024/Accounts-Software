import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../Globle/Api";
import { id } from "date-fns/locale";

export const CreateSalesInvoice = createAsyncThunk(
  "invoice/create",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/sales/invoice`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const GetSalesInvoicesById = createAsyncThunk(
  "invoice/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/sales/invoice/:id`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const GetInvoiceNumOrRefNum = createAsyncThunk(
  "invoice/getInvoiceNumOrRefNum",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/sales/number`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const GetAllSalesInvoice = createAsyncThunk(
  "invoice/getAllSalesInvoice",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/sales/get/Invoices`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// export const GetSalesInvoicesViewById = createAsyncThunk(
//   "invoice/getSalesInvoicesById",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(`${BASE_URL}/sales/Invoices/View/${id}`, {
//       });
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

// Customer

export const GetSalesInvoicesViewById = createAsyncThunk(
  "salesInvoice/getById",
  async (id, thunkAPI) => {
    const response = await axios.get(`${BASE_URL}/sales/Invoices/View/${id}`);
    return  response.data.invoice;; // This will be available as `action.payload`
  }
);

export const CreateCustomer = createAsyncThunk(
  "customer/create",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/customer/customer`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const GetCustomersIdOrName = createAsyncThunk(
  "customer/getByIdOrName",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/customer/customer`, {
        headers: {
          "Content-Type": "application/json",
        },
        params: payload,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const UpdateCustomer = createAsyncThunk(
  "customer/update",
  async (payload, { rejectWithValue }) => {
    try {
      const { id, ...data } = payload; // id must be a number or string
      const response = await axios.put(`${BASE_URL}/customer/${id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update customer"
      );
    }
  }
);

export const DeleteCustomerById = createAsyncThunk(
  "customer/deleteById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${BASE_URL}/customer/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const GetAllCustomers = createAsyncThunk(
  "customer/getAll",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL}/customer/customers`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error Occurred Getting Customers:", error);
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to fetch customers"
      );
    }
  }
);

export const GetCustomerName = createAsyncThunk(
  "customer/getCustomerName",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL}/customer/name`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to fetch customer Name "
      );
    }
  }
);

// Create a new product
export const CreateProduct = createAsyncThunk(
  "product/create",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/product/product`,
        payload,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Get next available product ID
export const GetNextProductId = createAsyncThunk(
  "product/getNextId",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/product/next-id`, {
        headers: { "Content-Type": "application/json" },
        params: payload,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Get product by ID
export const GetProductById = createAsyncThunk(
  "product/getById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/product/product/${id}`, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Delete product by ID
export const DeleteProductById = createAsyncThunk(
  "product/deleteById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${BASE_URL}/api/products/${id}`);
      return response.data;
    } catch (err) {
      return rejectWithValue({
        error: err.response?.data?.message || "Delete failed",
      });
    }
  }
);

// Update product by ID
export const UpdateProduct = createAsyncThunk(
  "product/update",
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/product/product/${id}`,
        payload,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const GetAllProducts = createAsyncThunk(
  "product/getAll",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(`${BASE_URL}/product/products`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch products"
      );
    }
  }
);

export const GetTax = createAsyncThunk(
  "product/getTax",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL}/tax/taxes`);
      return response.data;
    } catch (error) {
      console.error("Error Occurred While Fetching Taxes:", error);
      return thunkAPI.rejectWithValue("Failed to fetch tax");
    }
  }
);

// Sales Dasborar
export const GetSalesRevenew = createAsyncThunk(
  "sales/getSalesRevenew",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL}/sales/totalrevenue`);
      return response.data;
    } catch {
      return thunkAPI.rejectWithValue("Failed to fetch sales revenue");
    }
  }
);

export const TotalProductSold = createAsyncThunk(
  "sales/totalProductSold",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL}/sales/soldproducts`);
      return response.data;
    } catch {
      return thunkAPI.rejectWithValue("Failed to fetch total product sold");
    }
  }
);

export const TotalInvoice = createAsyncThunk(
  "sales/totalInvoice",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL}/sales/totalNumInvoices`);
      return response.data;
    } catch {
      return thunkAPI.rejectWithValue("Failed to fetch total invoice");
    }
  }
);

export const GetTotalCustomerNum = createAsyncThunk(
  "sales/getTotalCustomerNum",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL}/customer/numberCus`);
      return response.data;
    } catch {
      return thunkAPI.rejectWithValue("Failed to fetch total customer");
    }
  }
);

export const GetSalesGrowth = createAsyncThunk(
  "sales/getSalesGrowth",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL}/sales/salesGrowth`);
      return response.data;
    } catch {
      return thunkAPI.rejectWithValue("Failed to fetch sales growth");
    }
  }
);

export const GetSalesAverage = createAsyncThunk(
  "sales/salesAverage",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL}/sales/averge`);
      return response.data;
    } catch {
      return thunkAPI.rejectWithValue("Failed to fetch sales average");
    }
  }
);

export const GetMonthlySalesOverView = createAsyncThunk(
  "sales/monthlySalesOverView",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL}/sales/monthlysales`);
      return response.data;
    } catch {
      return thunkAPI.rejectWithValue(
        "Failed to fetch monthly sales over view"
      );
    }
  }
);

export const GetProductSalesOverView = createAsyncThunk(
  "sales/productSalesOverView",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL}/product/productOverview`);
      return response.data;
    } catch {
      return thunkAPI.rejectWithValue(
        "Failed to fetch product sales over view"
      );
    }
  }
);

export const GetReciveAble = createAsyncThunk(
  "Receivable/GetReciveAble",
  async (filters, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const response = await axios.get(`/api/receivables?${queryParams}`);

      // Ensure response is always an array
      if (Array.isArray(response.data)) {
        return response.data;
      } else if (Array.isArray(response.data.data)) {
        return response.data.data;
      } else {
        return [];
      }
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch receivables"
      );
    }
  }
);

export const CreateTax = createAsyncThunk(
  "taxes/CreateTax",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/tax/create`, data);
      return response.data;
    } catch {
      return rejectWithValue("Failed to create tax");
    }
  }
);
