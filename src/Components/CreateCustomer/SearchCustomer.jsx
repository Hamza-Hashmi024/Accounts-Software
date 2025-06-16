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
  Divider,
} from "@mui/material";
import {
  GetCustomersIdOrName,
  UpdateCustomer,
  DeleteCustomerById,
} from "../../thunks/Api";
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
    dispatch(DeleteCustomerById(customer.id));
  };

  return (
    <>
      <Paper
        elevation={0}
        sx={{
          backgroundColor: colors.SOLUTYICS_GRAY,
          p: 2,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,

            color: colors.WHITE_COLOR,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}
        >
          Search Customer
        </Typography>
      </Paper>

      <Box >
        <Box component="form" onSubmit={handleSearch} noValidate sx={{ mb: 4 , mt: 2 }}>
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
        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}

        {customers && customers.length > 0 && (
          <Box mt={4}>
            <Typography
              variant="h6"
              sx={{ color: colors.SOLUTYICS_PURPLE, mb: 2 }}
            >
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
                              sx={{
                                mr: 1,
                                backgroundColor: colors.SKY_BLUE_COLOR,
                              }}
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
                              sx={{
                                mr: 1,
                                backgroundColor: colors.SKY_BLUE_COLOR,
                              }}
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
    </>
  );
};

export default SearchCustomer;
