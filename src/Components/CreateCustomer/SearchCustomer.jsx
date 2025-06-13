import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Typography,
  TextField,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { GetCustomersIdOrName, UpdateCustomer , DeleteCustomerById} from "../../thunks/Api";
import { colors } from "../../Globle/colors";
import SearchButton from "../../Button/SearchButton";


const SearchCustomer = () => {
  const dispatch = useDispatch();
  const { customers, loading, error } = useSelector((state) => state.Customer);

  const [searchParams, setSearchParams] = useState({ id: "", name: "" });
  const [editingCustomerId, setEditingCustomerId] = useState(null);
  const [editedCustomerData, setEditedCustomerData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const params = {};
    if (searchParams.id.trim()) params.id = searchParams.id.trim();
    if (searchParams.name.trim()) params.name = searchParams.name.trim();

    if (Object.keys(params).length === 0) {
      alert("Please enter ID or Name to search");
      return;
    }

    dispatch(GetCustomersIdOrName(params));
  };

  const handleEdit = (customer) => {
    setEditingCustomerId(customer.id);
    setEditedCustomerData({ ...customer });
  };

  const handleChangeEditField = (e) => {
    const { name, value } = e.target;
    setEditedCustomerData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    dispatch(UpdateCustomer(editedCustomerData));
    setEditingCustomerId(null);
    setEditedCustomerData({});
  };

  const handleCancel = () => {
    setEditingCustomerId(null);
    setEditedCustomerData({});
  };

  const handleDelete = (customer) => {
    // if (window.confirm(`Are you sure you want to delete customer with ID: ${customer.id}?`)) {
    //   alert(`Delete customer with ID: ${customer.id}`);
    // }

    dispatch(DeleteCustomerById(customer.id));
  };

  return (
    <Box>
      <Typography variant="h5" fontWeight="bold" sx={{ color: colors.SOLUTYICS_PURPLE, mb: 3 }}>
        Search Customers
      </Typography>

      <Box component="form" onSubmit={handleSearch} noValidate sx={{ mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Customer ID"
              name="id"
              value={searchParams.id}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Customer Name"
              name="name"
              value={searchParams.name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <SearchButton label="Search" />
          </Grid>
        </Grid>
      </Box>

      {loading && <Typography sx={{ mt: 2 }}>Loading...</Typography>}
      {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}

      {customers && customers.length > 0 && (
        <Box mt={4}>
          <Typography variant="h6" sx={{ color: colors.SOLUTYICS_PURPLE, mb: 2 }}>
            Results:
          </Typography>

          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Billing Address</TableCell>
                  <TableCell>Shipping Address</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {customers.map((customer) => (
                  <TableRow key={customer.id} hover>
                    <TableCell>{customer.id}</TableCell>

                    <TableCell>
                      {editingCustomerId === customer.id ? (
                        <TextField
                          name="name"
                          value={editedCustomerData.name || ""}
                          onChange={handleChangeEditField}
                          size="small"
                        />
                      ) : (
                        customer.name
                      )}
                    </TableCell>

                    <TableCell>
                      {editingCustomerId === customer.id ? (
                        <TextField
                          name="email"
                          value={editedCustomerData.email || ""}
                          onChange={handleChangeEditField}
                          size="small"
                        />
                      ) : (
                        customer.email || "N/A"
                      )}
                    </TableCell>

                    <TableCell>
                      {editingCustomerId === customer.id ? (
                        <TextField
                          name="phone"
                          value={editedCustomerData.phone || ""}
                          onChange={handleChangeEditField}
                          size="small"
                        />
                      ) : (
                        customer.phone || "N/A"
                      )}
                    </TableCell>

                    <TableCell>
                      {editingCustomerId === customer.id ? (
                        <TextField
                          name="billing_address"
                          value={editedCustomerData.billing_address || ""}
                          onChange={handleChangeEditField}
                          size="small"
                        />
                      ) : (
                        customer.billing_address || "N/A"
                      )}
                    </TableCell>

                    <TableCell>
                      {editingCustomerId === customer.id ? (
                        <TextField
                          name="shipping_address"
                          value={editedCustomerData.shipping_address || ""}
                          onChange={handleChangeEditField}
                          size="small"
                        />
                      ) : (
                        customer.shipping_address || "N/A"
                      )}
                    </TableCell>

                    <TableCell>
                      {editingCustomerId === customer.id ? (
                        <>
                          <Button
                            variant="contained"
                            size="small"
                            sx={{ mr: 1, backgroundColor: colors.SKY_BLUE_COLOR }}
                            onClick={handleSave}
                          >
                            Save
                          </Button>
                          <Button
                            variant="outlined"
                            size="small"
                            sx={{ color: "black", borderColor: "black" }}
                            onClick={handleCancel}
                          >
                            Cancel
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            variant="contained"
                            size="small"
                            sx={{ mr: 1, backgroundColor: colors.SKY_BLUE_COLOR }}
                            onClick={() => handleEdit(customer)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="contained"
                            size="small"
                            sx={{ backgroundColor: colors.RED_COLOR }}
                            onClick={() => handleDelete(customer)}
                          >
                            Delete
                          </Button>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}

      {customers && customers.length === 0 && !loading && (
        <Typography sx={{ mt: 4, color: colors.INACTIVE_GRAY_COLOR }}>
          No customers found.
        </Typography>
      )}
    </Box>
  );
};

export default SearchCustomer;


// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { GetCustomersIdOrName } from "../../thunks/Api";
// import { colors } from "../../Globle/colors";
// import SearchButton from "../../Button/SearchButton";

// const SearchCustomer = () => {
//   const dispatch = useDispatch();
//   const { customers, loading, error } = useSelector((state) => state.Customer);

//   const [searchParams, setSearchParams] = useState({ id: "", name: "" });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setSearchParams((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     const params = {};
//     if (searchParams.id.trim()) params.id = searchParams.id.trim();
//     if (searchParams.name.trim()) params.name = searchParams.name.trim();

//     if (Object.keys(params).length === 0) {
//       alert("Please enter ID or Name to search");
//       return;
//     }

//     dispatch(GetCustomersIdOrName(params));
//   };

//   // Placeholder handlers for Edit and Delete
//   const handleEdit = (customer) => {
//     alert(`Edit customer with ID: ${customer.id}`);
//   };

//   const handleDelete = (customer) => {
//     if (
//       window.confirm(
//         `Are you sure you want to delete customer with ID: ${customer.id}?`
//       )
//     ) {
//       alert(`Delete customer with ID: ${customer.id}`);
//       // Dispatch delete action here
//     }
//   };

//   return (
//     <div>
//       <h2
//         className="text-2xl font-bold mb-4"
//         style={{ color: colors.SOLUTYICS_PURPLE }}
//       >
//         Search Customers
//       </h2>

//       <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div>
//           <label
//             className="block mb-1 font-medium"
//             style={{ color: colors.SOLUTYICS_GRAY }}
//           >
//             Customer ID
//           </label>
//           <input
//             type="text"
//             name="id"
//             value={searchParams.id}
//             onChange={handleChange}
//             className="w-full border rounded px-3 py-2"
//             placeholder="Enter customer ID"
//           />
//         </div>

//         <div>
//           <label
//             className="block mb-1 font-medium"
//             style={{ color: colors.SOLUTYICS_GRAY }}
//           >
//             Customer Name
//           </label>
//           <input
//             type="text"
//             name="name"
//             value={searchParams.name}
//             onChange={handleChange}
//             className="w-full border rounded px-3 py-2"
//             placeholder="Enter customer name"
//           />
//         </div>

//     <SearchButton label="Search"/>
//       </form>

//       {loading && <p className="mt-4">Loading...</p>}
//       {error && <p className="mt-4 text-red-600">{error}</p>}

//       {customers && customers.length > 0 && (
//         <div className="mt-6 overflow-x-auto">
//           <h3
//             className="text-xl font-semibold mb-2"
//             style={{ color: colors.SOLUTYICS_PURPLE }}
//           >
//             Results:
//           </h3>
//           <table className="min-w-full border border-gray-300 rounded">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="border px-4 py-2 text-left">ID</th>
//                 <th className="border px-4 py-2 text-left">Name</th>
//                 <th className="border px-4 py-2 text-left">Email</th>
//                 <th className="border px-4 py-2 text-left">Phone</th>
//                 <th className="border px-4 py-2 text-left">Billing Address</th>
//                 <th className="border px-4 py-2 text-left">Shipping Address</th>
//                 <th className="border px-4 py-2 text-left">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {customers.map((customer) => (
//                 <tr key={customer.id} className="hover:bg-gray-50">
//                   <td className="border px-4 py-2">{customer.id}</td>
//                   <td className="border px-4 py-2">{customer.name}</td>
//                   <td className="border px-4 py-2">
//                     {customer.email || "N/A"}
//                   </td>
//                   <td className="border px-4 py-2">
//                     {customer.phone || "N/A"}
//                   </td>
//                   <td className="border px-4 py-2">
//                     {customer.billing_address || "N/A"}
//                   </td>
//                   <td className="border px-4 py-2">
//                     {customer.shipping_address || "N/A"}
//                   </td>
//                   <td className="flex gap-2">
//                     <button
//                       onClick={() => handleEdit(customer)}
//                       style={{
//                         backgroundColor: colors.SKY_BLUE_COLOR,
//                         color: colors.WHITE_COLOR,
//                       }}
//                       className="px-3 py-1 rounded hover:brightness-90"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleDelete(customer)}
//                       style={{
//                         backgroundColor: colors.RED_COLOR,
//                         color: colors.WHITE_COLOR,
//                       }}
//                       className="px-3 py-1 rounded hover:brightness-90"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {customers && customers.length === 0 && !loading && (
//         <p className="mt-4" style={{ color: colors.INACTIVE_GRAY_COLOR }}>
//           No customers found.
//         </p>
//       )}
//     </div>
//   );
// };

// export default SearchCustomer;
