import { createSlice } from "@reduxjs/toolkit";
import {
  CreateProduct,
  GetNextProductId,
  GetProductById,
  DeleteProductById,
  UpdateProduct,
  GetAllProducts,
  TotalProductSold,
  GetProductSalesOverView,
} from "../../thunks/Api";

const initialState = {
  product: null,
  products: [],
  nextProductId: null,
  isLoading: false,
  error: null,
  productSalesOverView: [],
};

const productSlice = createSlice({
  name: "Product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Create Product
    builder.addCase(CreateProduct.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(CreateProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.product = action.payload;
    });
    builder.addCase(CreateProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || "Something went wrong";
    });

    // Get Next Product ID
    builder.addCase(GetNextProductId.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(GetNextProductId.fulfilled, (state, action) => {
      state.isLoading = false;
      state.nextProductId = action.payload.nextId;
    });
    builder.addCase(GetNextProductId.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || "Failed to fetch next product ID";
    });

    //  Get Product By Id
    builder.addCase(GetProductById.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });

    builder.addCase(GetProductById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.product = action.payload;
    });

    builder.addCase(GetProductById.rejected, (state, action) => {
      state.isLoading = false;
      state.error =
        action.payload || "Failed to fetch Product by Id from The Server";
    });

    // Delete Product By Id
    builder.addCase(DeleteProductById.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(DeleteProductById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.product = null;
      state.nextProductId = action.payload;
    });
    builder.addCase(DeleteProductById.rejected, (state, action) => {
      state.isLoading = false;
      state.error =
        action.payload || " Failed to Delete Product By Id From  the Server";
    });

    // Updating Products
    builder.addCase(UpdateProduct.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(UpdateProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.product = action.payload;
    });
    builder.addCase(UpdateProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.error =
        action.payload || "Failed to Update Product By id from the Server";
    });

    builder.addCase(GetAllProducts.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });

    builder.addCase(GetAllProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    });

    builder.addCase(GetAllProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.error =
        action.payload || "Failed to Get All Products from the Server ";
    });

    // get Product Sold Data For DashBoard
    builder.addCase(TotalProductSold.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });

    builder.addCase(TotalProductSold.fulfilled, (state, action) => {
      state.isLoading = false;
      state.totalProductSold = action.payload;
      console.log(action.payload);
    });

    builder.addCase(TotalProductSold.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || "Server Error";
    });

    // Get Product Sales OverView
    builder.addCase(GetProductSalesOverView.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    builder.addCase(GetProductSalesOverView.fulfilled, (state, action) => {
      state.isLoading = false;
      state.productSalesOverView = action.payload;
      console.log("Product OverView ", action.payload);
    })
    builder.addCase(GetProductSalesOverView.rejected, (state) => {
      state.isLoading = false;
      state.error = "Server Error";
    })
  },
});

export default productSlice.reducer;
