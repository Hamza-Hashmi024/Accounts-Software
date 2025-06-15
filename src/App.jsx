// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./Layout/MainLayout";
import SalesInvoice from "./Pages/SalesInvoice";
import Customer from "./Components/CreateCustomer/Customer";
import ProductPage from "./Pages/ProductPage";
import SalesDashboard from "./Pages/SalesDashboard";
import ReceivablesTable from "./Components/Reciveable/ReceivablesTable";

const Dashboard = () => <h1 className="text-3xl font-bold">Dashboard</h1>;
const Payable = () => <h1 className="text-3xl font-bold">Payable</h1>;


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout Route */}
        <Route path="/" element={<MainLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
           <Route path="product" element={<ProductPage />} />
          <Route path="sales" element={<SalesDashboard />} />
          <Route path="invoice" element={<SalesInvoice />} />
           <Route path="create/customer" element={<Customer />} />
          <Route path="payable" element={<Payable />} />
          <Route path="receivable" element={<ReceivablesTable />} />
          <Route path="*" element={<h1 className="text-3xl font-bold">404 Not Found</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
