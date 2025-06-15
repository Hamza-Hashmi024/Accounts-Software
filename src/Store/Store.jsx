import { configureStore } from "@reduxjs/toolkit";
import SalesInvoiceSlice from "./Slices/SalesInvoiveSlice";
import CustomerSlice from "./Slices/CustomerSlice";
import ProductSlice from "./Slices/ProductSlice";
import TaxSlice from "./Slices/TaxSlices";
import ReceivableSlice from "./Slices/ReciveableSlice";

const store = configureStore({
  reducer: {
    SalesInvoice: SalesInvoiceSlice,
    Customer: CustomerSlice,
    Product: ProductSlice,
    Tax: TaxSlice,
    Receivable: ReceivableSlice,
  },
});

export { store };
